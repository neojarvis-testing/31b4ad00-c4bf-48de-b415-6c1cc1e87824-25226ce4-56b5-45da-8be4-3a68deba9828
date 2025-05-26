package com.examly.springapploan.service;

import java.util.List;

import com.examly.springapploan.model.LoanDisbursement;

public interface LoanDisbursementService {
    public List<LoanDisbursement> getAllLoanDisbursements();
    public LoanDisbursement getLoanDisbursementsWithId(Long loanDisbursementId);
    public LoanDisbursement saveNewLoanDisbursement(LoanDisbursement loanDisbursement);
    public LoanDisbursement updateLoanDisbursementsWithId(Long loanDisbursementId, LoanDisbursement loanDisbursement);
    public boolean deleteLoanDisbursementsWithId(Long loanDisbursementId);
}

