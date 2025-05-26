package com.examly.springapploan.service;

import java.util.List;

import com.examly.springapploan.model.LoanDisbursement;
import com.examly.springapploan.service.LoanDisbursementService;
import com.examly.springapploan.repository.LoanDisbursementRepository;


import com.examly.springapploan.exception.BadInputDataException;
import com.examly.springapploan.exception.LoanDetailsNotFoundException;

import org.springframework.stereotype.Service;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoanDisbursementServiceImpl implements LoanDisbursementService {

    private final LoanDisbursementRepository loanDisbursementRepository;

    @Override
    public List<LoanDisbursement> getAllLoanDisbursements() {
        return loanDisbursementRepository.findAll();
    }

    @Override
    public LoanDisbursement getLoanDisbursementsWithId(Long loanDisbursementId) {
        return
        loanDisbursementRepository.findByLoanDisbursementId(loanDisbursementId).orElseThrow(
        () -> new BadInputDataException("loan disbursement details not found with id: " + loanDisbursementId));

    }

    @Override
    public LoanDisbursement saveNewLoanDisbursement(@Valid LoanDisbursement loanDisbursement) {
        log.info("add loan disbursement request received");
        return loanDisbursementRepository.save(loanDisbursement);
    }

    @Override
    public LoanDisbursement updateLoanDisbursementsWithId(Long loanDisbursementId, @Valid LoanDisbursement loanDisbursement) {
        loanDisbursementRepository.findByLoanDisbursementId(loanDisbursementId).orElseThrow(
                () -> new BadInputDataException("loan disbursement details not found with id: " + loanDisbursementId));

        LoanDisbursement updateLoandisbursement = LoanDisbursement
                .builder()
                .loanDisbursementId(loanDisbursementId)
                .disbursementAmount(loanDisbursement.getDisbursementAmount())
                .disbursementMethod(loanDisbursement.getDisbursementMethod())
                .status(loanDisbursement.getStatus())
                .remarks(loanDisbursement.getRemarks())
                .loanApplication(loanDisbursement.getLoanApplication())
                .build();

        return loanDisbursementRepository.save(updateLoandisbursement);
    }

    @Override
    public boolean deleteLoanDisbursementsWithId(Long loanDisbursementId) {
        LoanDisbursement loanDisbursement = loanDisbursementRepository.findByLoanDisbursementId(loanDisbursementId).orElseThrow(
            () -> new BadInputDataException("loan disbursement details not found with id: " + loanDisbursementId));
        loanDisbursementRepository.delete(loanDisbursement);
        return (loanDisbursement == null);
    }
}
