package com.examly.springapploan.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.examly.springapploan.model.Loan;
import com.examly.springapploan.model.User;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class LoanApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanApplicationId;
    private LocalDateTime applicationDate;
    private BigDecimal loanAmount;
    private int tenureMonths;
    private String applicationStatus;
    private String employmentStatus;
    private BigDecimal annualIncome;
    private String remarks;
    private String proof;
    private String accountHolder;
    private String accountNumber;
    private String iFSCCode;

    // @ManyToOne
    // private User user;

    @OneToOne
    private Loan loan;    
}
