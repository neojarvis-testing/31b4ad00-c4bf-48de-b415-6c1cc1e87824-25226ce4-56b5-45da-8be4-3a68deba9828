package com.examly.springapploan.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

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
public class LoanApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanApplicationId;

    @CreationTimestamp
    private LocalDateTime applicationDate;

    @NotNull(message = "please enter the loan amount")
    private BigDecimal loanAmount;

    @NotNull(message = "please enter the tenure you want")
    private Integer tenureMonths;

    // @NotBlank(message = "please enter application status")
    private String applicationStatus;

    @NotBlank(message = "please enter the employment status")
    private String employmentStatus;

    @NotNull(message = "please enter your annual income")
    private BigDecimal annualIncome;

    private String remarks;

    private String proof;

    @NotNull(message = "please enter account holder details")
    private String accountHolder;

    @NotNull(message = "please enter account number")
    private String accountNumber;

    @NotNull(message = "please enter ifsc code")
    private String ifscCode;


    

    @ManyToOne 
    @JoinColumn(name="loan_id")
    // Need to replace with one to one
    private Loan loan;

    @OneToOne(mappedBy="loanApplication")
    private LoanDisbursement loanDisbursement;

    @OneToMany(mappedBy="loanApplication")
    private List<Notification> notifications;
}
