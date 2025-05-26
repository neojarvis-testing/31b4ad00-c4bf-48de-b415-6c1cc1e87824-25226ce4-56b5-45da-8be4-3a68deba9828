package com.examly.springapploan.service;

import java.util.List;

import com.examly.springapploan.model.LoanApplication;

public interface LoanApplicationService {
    public List<LoanApplication> fetchAllLoanApplications();
    public LoanApplication createNewLoanApplication(LoanApplication loanApplication);
    public List<LoanApplication> fetchLoanApplicationsForUser(Long userId);

    public LoanApplication fetchLoanApplicationDetailsForLoanApplicationId(Long loanApplicationId);
    public LoanApplication updateLoanApplicationDetailsWithLoanApplicationId(Long loanApplicationId, LoanApplication loanApplication);
    public LoanApplication deleteLoanApplicationById(Long loanApplicationId);
}
