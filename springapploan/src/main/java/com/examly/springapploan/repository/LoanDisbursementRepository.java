package com.examly.springapploan.repository;

import com.examly.springapploan.model.LoanDisbursement;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanDisbursementRepository extends JpaRepository<LoanDisbursement, Long>{
    Optional<LoanDisbursement> findByLoanDisbursementId(Long loanDisbursementId);

    
    
}
