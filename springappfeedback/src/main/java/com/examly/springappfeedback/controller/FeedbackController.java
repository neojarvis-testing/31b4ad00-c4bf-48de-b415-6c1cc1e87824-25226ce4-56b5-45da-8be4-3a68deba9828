package com.examly.springappfeedback.controller;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springappfeedback.model.Feedback;
import com.examly.springappfeedback.service.FeedbackService;
@RestController
@RequestMapping("api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping
    public ResponseEntity<?> getAllFeedbacks(){

        try {
            return ResponseEntity.ok(feedbackService.getAllFeedbacks());

        } catch(Exception e){
            return ResponseEntity.internalServerError().body("Failed to fetch feedbacks");

        }
    }
    @PostMapping
    public ResponseEntity<?> addFeedback(@RequestBody Long userId, @RequestBody Map<String, String> request){

        try{
            String feedbackText = request.get("feedbackText");
            Feedback feedback = feedbackService.addFeedback(userId, feedbackText);
            return ResponseEntity.status(201).body("Feedback submitted succesfully");
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{userId}")
    public ResponseEntity<?> getFeedbackByUser(@PathVariable Long userId){
        try{
            return ResponseEntity.ok(feedbackService.getFeedbackByUserId(userId));
        }catch(Exception e){
            return ResponseEntity.internalServerError().body("Error retrieving feedback");
        }
    }
    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long feedbackId, @RequestParam Long userId){
        try{
            feedbackService.deleteFeedback(feedbackId, userId);
            return ResponseEntity.ok("feedback deleted successfully");
        }catch(Exception e){
            return ResponseEntity.status(404).body(e.getMessage());

        }

    }



    


}
