package com.examly.springapploan.service;

import java.util.List;

import com.examly.springapploan.model.Loan;

public interface LoanService {
    public List<Loan> fetchAllLoans();

    public Loan createNewLoanRequest(Loan loan);

    public Loan fetchLoanDetailsByLoanId(Long loanId);
}
