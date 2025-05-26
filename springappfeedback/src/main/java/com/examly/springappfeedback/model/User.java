package com.examly.springappfeedback.model;

import jakarta.persistence.*;

@Entity
@Table(name= "users")
public class User {

    public enum Role {
        CUSTOMER, LOAN_MANAGER, BRANCH_MANAGER
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String email;
    private String password;
    private String username;
    private String mobileNumber;

    @Enumerated(EnumType.STRING)
    private Role userRole;

    public User(){}
    
    public User(String email, String password, String username, String mobileNumber, Role userRole){
        this.email=email;
        this.password=password;
        this.username=username;
        this.mobileNumber=mobileNumber;
        this.userRole=userRole;
    }
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public Role getUserRole() {
        return userRole;
    }

    public void setUserRole(Role userRole) {
        this.userRole = userRole;
    }



}
