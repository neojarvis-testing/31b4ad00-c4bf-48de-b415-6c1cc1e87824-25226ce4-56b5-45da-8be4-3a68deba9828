package com.examly.springappuser.model;

import javax.annotation.processing.Generated;

import jakarta.persistence.*;
import lombok.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int userId;
    private String emailId;
    private String password;
    private String userName;
    private String mobileNumber;
    private String userRole;
    
    public User(){

    }

    public User(int userId, String emailId, String password, String userName, String mobileNumber, String userRole){
        this.userId=userId;
        this.emailId=emailId;
        this.password=password;
        this.mobileNumber=mobileNumber;
        this.userName=userName;
        this.userRole=userRole;
    }

    public int getUserId(){
        return userId;
    }

    public void setUserId(int userId){
        this.userId=userId;
    }
    
    public String getEmailId(){
        return emailId;
    }

    public void setEmailId(String emailId){
        this.emailId=emailId;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password=password;
    }

    public String getUserName(){
        return userName;
    }

    public void setUserName(String userName){
        this.userName=userName;
    }

    public String getMobileNumber(){
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber){
        this.mobileNumber=mobileNumber;
    }

    public String getUserRole(){
        return userRole;
    }

    public void setUserRole(String userRole){
        this.userRole=userRole;
    }
}
