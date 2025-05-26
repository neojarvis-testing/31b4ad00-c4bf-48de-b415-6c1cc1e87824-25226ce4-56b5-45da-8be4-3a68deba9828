package com.examly.springapploan.repository;

import com.examly.springapploan.model.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.*;


import java.util.List;
import java.util.Optional;

@Repository
public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long>{
    Optional<LoanApplication> findByLoanApplicationId(Long loanApplicationId);

}
