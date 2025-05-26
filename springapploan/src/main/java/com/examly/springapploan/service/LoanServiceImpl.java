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
import com.examly.springapploan.exception.LoanDetailsNotFoundException;

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
        Optional<Loan> loanDetails = loanRepository.findByLoanId(loanId);
        if (loanDetails.isEmpty()) {
            throw new BadInputDataException("Loan details not exists for loan id: " + loanId);
        }
        return loanDetails.get();
    }

    @Override
    public Loan updateLoanDetails(Long loanId, @Valid Loan loan) {
        loanRepository.findByLoanId(loanId)
                .orElseThrow(
                        () -> new BadInputDataException(
                                "Loan details cannot be updated as the loan id not found" + loanId));
        Loan loanDetails = Loan.builder().description(loan.getDescription()).loanType(loan.getLoanType())
                .interestRate(loan.getInterestRate()).maxAmount(loan.getMaxAmount()).minAmount(loan.getMinAmount())
                .minTenureMonths(loan.getMinTenureMonths()).maxTenureMonths(loan.getMaxTenureMonths())
                .status(loan.getStatus()).processingFee(loan.getProcessingFee())
                .prepaymentPenalty(loan.getPrepaymentPenalty()).gracePeriodMonths(loan.getGracePeriodMonths())
                .latePaymentFee(loan.getLatePaymentFee())
                .loanId(loanId)
                .build();
        return loanRepository.save(loanDetails);
    }

    @Override
    public Loan deleteLoanDetailsByLoanId(Long loanId) {
        Loan loanDetails = loanRepository.findByLoanId(loanId)
                .orElseThrow(
                        () -> new LoanDetailsNotFoundException(
                                "Loan details cannot be deleted as the loan id not found" + loanId));
        loanRepository.delete(loanDetails);
        return loanDetails;
    }


    
}
