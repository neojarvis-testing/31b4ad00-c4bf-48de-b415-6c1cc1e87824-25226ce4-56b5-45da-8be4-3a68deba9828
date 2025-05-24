package com.examly.springapploan.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapploan.model.Loan;
import com.examly.springapploan.service.LoanService;

import com.examly.springapploan.repository.LoanRepository;

import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import com.examly.springapploan.exception.BadInputDataException;
import jakarta.validation.Valid;

@RequiredArgsConstructor
@Service
public class LoanServiceImpl implements LoanService {


    
    private final LoanRepository loanRepository;
    
    @Override
    public List<Loan> fetchAllLoans() {
        return loanRepository.findAll();
    }
    
    @Override
    public Loan createNewLoanRequest(@Valid Loan loan) {
        return loanRepository.save(loan);
    }
    
    @Override
    public Loan fetchLoanDetailsByLoanId(Long loanId) {
        Optional<Loan> loanDetails =  loanRepository.findByLoanId(loanId);
        if(loanDetails.isEmpty()) {
            throw new BadInputDataException("Loan details not exists for loan id: " + loanId);
        }
        return loanDetails.get();
    }
}
