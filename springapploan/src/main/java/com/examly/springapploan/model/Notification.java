package com.examly.springapploan.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long notificationId;

    @NotNull(message =" please enter the notification message")
    private String message;

    
    private boolean isRead = false;

    @CreationTimestamp
    private LocalDateTime createdAt;


    private Long userId;

    @ManyToOne
    @JoinColumn(name="loan_id")
    private Loan loan;

    @ManyToOne
    @JoinColumn(name="loan_application_id")
    private LoanApplication loanApplication;

    @ManyToOne
    @JoinColumn(name="loan_disbursement_id")
    private LoanDisbursement loanDisbursement;
}
