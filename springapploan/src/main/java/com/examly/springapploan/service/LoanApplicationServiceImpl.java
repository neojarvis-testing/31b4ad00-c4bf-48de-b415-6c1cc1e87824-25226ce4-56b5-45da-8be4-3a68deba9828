package com.examly.springapploan.service;

import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;

import com.examly.springapploan.exception.LoanDetailsNotFoundException;
import com.examly.springapploan.exception.BadInputDataException;
import com.examly.springapploan.model.LoanApplication;
import com.examly.springapploan.repository.LoanApplicationRepository;

import org.springframework.stereotype.Service;
import jakarta.validation.Valid;

@Service
@RequiredArgsConstructor
public class LoanApplicationServiceImpl implements LoanApplicationService {

    private final LoanApplicationRepository loanApplicationRepository;

    public List<LoanApplication> fetchAllLoanApplications() {
        return loanApplicationRepository.findAll();
    }

    public LoanApplication createNewLoanApplication(@Valid LoanApplication loanApplication) {
        return loanApplicationRepository.save(loanApplication);
    }

    public List<LoanApplication> fetchLoanApplicationsForUser(Long userId) {
        return null;
    }

    public LoanApplication fetchLoanApplicationDetailsForLoanApplicationId(Long loanApplicationId) {
        return loanApplicationRepository.findByLoanApplicationId(loanApplicationId).orElseThrow(
                () -> new BadInputDataException(
                        "loan application details not exists with loan application :" + loanApplicationId));
    }

    public LoanApplication updateLoanApplicationDetailsWithLoanApplicationId(Long loanApplicationId,
            @Valid LoanApplication loanApplication) {
        loanApplicationRepository.findByLoanApplicationId(loanApplicationId).orElseThrow(
                () -> new LoanDetailsNotFoundException("unable to delete this loan application as it doesn't exists"));

        LoanApplication updateLoanApplication = LoanApplication
                .builder()
                .loanApplicationId(loanApplicationId)
                .loanAmount(loanApplication.getLoanAmount())
                .annualIncome(loanApplication.getAnnualIncome())
                .tenureMonths(loanApplication.getTenureMonths())
                .applicationStatus(loanApplication.getApplicationStatus())
                .employmentStatus(loanApplication.getEmploymentStatus())
                .remarks(loanApplication.getRemarks())
                .proof(loanApplication.getProof())
                .accountHolder(loanApplication.getAccountHolder())
                .accountNumber(loanApplication.getAccountNumber())
                .ifscCode(loanApplication.getIfscCode())
                .loan(loanApplication.getLoan())
                .build();

        return loanApplicationRepository.save(updateLoanApplication);

    }

    public LoanApplication deleteLoanApplicationById(Long loanApplicationId) {
        LoanApplication deletingLoanApplication = loanApplicationRepository.findByLoanApplicationId(loanApplicationId)
                .orElseThrow(
                        () -> new LoanDetailsNotFoundException(
                                "unable to delete this loan application as it doesn't exists"));
        loanApplicationRepository.delete(deletingLoanApplication);
        return deletingLoanApplication;
    }
}
