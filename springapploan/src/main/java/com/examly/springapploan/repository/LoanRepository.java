package com.examly.springapploan.repository;

import org.springframework.stereotype.*;
import com.examly.springapploan.model.Loan;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {

    Optional<Loan> findByLoanId(Long loanId);
}
