package com.examly.springappfeedback.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
@Entity
@Table(name= "feedback")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;
    private String feedbackText;
    private LocalDateTime date;
    
    @ManyToOne
    @JoinColumn(name= "user_id")
    private User user;
    public Feedback(){}
    public Feedback(String feedbackText,LocalDateTime date,User user){
        this.feedbackText= feedbackText;
        this.date= date;
        this.user= user;
    }

    public Long getFeedbackId(){
        return feedbackId;

    }
    public void  setFeedbackId(Long feedbackId) {
        this.feedbackId=feedbackId;
 
    }
    public String getFeedbackText(){
        return feedbackText;

    }
    public void setFeedbackText(String feedbackText){
        this.feedbackText= feedbackText;
    }
    public LocalDateTime getDate(){
        return date;

    }
    public void  setDate(LocalDateTime date) {
        this.date=date;
 
    }
    public User getUser(){
        return user;
    }
    public void setUser(User user){
    this.user= user;
    }
 
}  