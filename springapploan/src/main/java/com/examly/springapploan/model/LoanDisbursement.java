package com.examly.springapploan.model;

import java.time.LocalDateTime;

import com.examly.springapploan.model.LoanApplication;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoanDisbursement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long loanDisbursementId;

    private LocalDateTime disbursementDate;
    private double disbursementAmount;
    private String disbursementMethod;
    private String status;
    private String remarks;

    @ManyToOne
    private LoanApplication loanApplication;

}
