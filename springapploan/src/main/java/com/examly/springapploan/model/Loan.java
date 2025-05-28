package com.examly.springapploan.model;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanId;

    @NotNull(message = "loan type cannot be null")
    @NotBlank(message = "loan type cannot be blank")
    private String loanType;

    @NotNull(message = "please enter the interest rate")
    private BigDecimal interestRate;

    @NotNull(message = "please enter the maximum amount")
    private BigDecimal maxAmount;

    @NotNull(message = "please enter the minimum amount")
    private BigDecimal minAmount;

    @NotNull(message = "please enter the minimum tenure months")
    private Integer minTenureMonths;

    @NotNull(message = "please enter the maximum tenure months")
    private Integer maxTenureMonths;

    @NotNull(message = "description cannot be null")
    @NotBlank(message = "description cannot be blank")
    private String description;

    @NotNull(message = "status cannot be null")
    @NotBlank(message = "status cannot be blank")
    private String status;

    @NotNull(message = "please enter the processing fee")
    private Double processingFee;

    @NotNull(message = "please enter the penalty amount")
    private BigDecimal prepaymentPenalty;

    @NotNull(message = "please enter the grace period")
    private Integer gracePeriodMonths;

    @NotNull(message = "please enter the late payment fee")
    private BigDecimal latePaymentFee;


    /* Added below extra */
    // @OneToMany(mappedBy = "loan")
    // private List<LoanApplication> loanApplications;

    // @OneToMany(mappedBy="loan")
    // private List<Notification> notifications;
}
