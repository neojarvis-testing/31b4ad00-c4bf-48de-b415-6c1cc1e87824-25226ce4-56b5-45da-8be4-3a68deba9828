package com.examly.springapploan.model;

import java.time.LocalDateTime;

import com.examly.springapploan.model.LoanApplication;

import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoanDisbursement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long loanDisbursementId;

    @CreationTimestamp
    private LocalDateTime disbursementDate;

    @NotNull(message = "please enter the disbursement amount")
    private Double disbursementAmount;

    @NotNull(message = "please choose the disbursement method")
    private String disbursementMethod;

    @NotNull(message = "please enter the disbursement status")
    private String status;

    
    private String remarks;

    @OneToOne
    @JoinColumn(name="loan_application_id")
    private LoanApplication loanApplication;

    @OneToMany(mappedBy="loanDisbursement")
    private List<Notification> notifications;

}
