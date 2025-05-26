package com.examly.springappfeedback.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springappfeedback.model.Feedback;
import com.examly.springappfeedback.model.User;
import com.examly.springappfeedback.repository.FeedbackRepository;
import com.examly.springappfeedback.repository.UserRepository;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepo;

    @Autowired
    private UserRepository userRepo;
    @Override
    public List<Feedback> getAllFeedbacks(){
        return feedbackRepo.findAll();
    }
    @Override
    public Feedback addFeedback(Long userId, String feedbackText) throws Exception{
        User user = userRepo.findById(userId).orElseThrow(() -> new Exception("User not found"));

        if(user.getUserRole() != User.Role.CUSTOMER){
            throw new Exception("Only customers can submit feedback");

        }
        Feedback feedback = new Feedback(feedbackText, LocalDateTime.now(), user);
        return feedbackRepo.save(feedback);
    }
    @Override
    public List<Feedback> getFeedbackByUserId(Long userId) throws Exception {
       User user = userRepo.findById(userId).orElseThrow(() -> new Exception("User not found"));
       return feedbackRepo.findByUser(user);
    }

    @Override
    public void deleteFeedback(Long feedbackId, Long userId) throws Exception {
        Feedback feedback = feedbackRepo.findById(feedbackId).orElseThrow(() -> new Exception("Feedback not found"));
        
        if (!feedback.getUser().getUserId().equals(userId)){
            throw new Exception("Unauthorized");
        }
    }
    
}
