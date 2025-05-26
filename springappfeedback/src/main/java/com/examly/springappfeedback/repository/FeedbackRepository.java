package com.examly.springappfeedback.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springappfeedback.model.Feedback;
import com.examly.springappfeedback.model.User;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    List<Feedback> findByUser(User user);
    
} 
    
