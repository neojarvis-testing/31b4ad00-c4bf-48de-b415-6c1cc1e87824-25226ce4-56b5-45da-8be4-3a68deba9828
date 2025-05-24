package com.examly.springapploan.model;

import java.time.LocalDateTime;

import com.examly.springapploan.model.Loan;
import com.examly.springapploan.model.LoanApplication;
import com.examly.springapploan.model.LoanDisbursement;
import com.examly.springapploan.model.User;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long notificationId;
    private String message;
    private boolean isRead;
    private LocalDateTime createdAt;

    // TODO: Add User class
    // @ManyToMany
    // private User user;

    @ManyToOne
    private Loan loan;

    @ManyToOne
    private LoanApplication loanApplication;

    @ManyToOne
    private LoanDisbursement loanDisbursement;
}
