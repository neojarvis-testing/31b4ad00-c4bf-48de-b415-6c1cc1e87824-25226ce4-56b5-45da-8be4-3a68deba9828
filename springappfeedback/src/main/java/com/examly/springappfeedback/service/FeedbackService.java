package com.examly.springappfeedback.service;
import java.util.List;

import com.examly.springappfeedback.model.Feedback;
public interface FeedbackService {
    List<Feedback> getAllFeedbacks();
    Feedback addFeedback(Long userId, String feedbackText) throws Exception;
    List<Feedback> getFeedbackByUserId(Long userId) throws Exception;
    void deleteFeedback(Long feedbackId, Long userId) throws Exception;


}
