package com.examly.springapploan.controller;

import java.util.List;

import com.examly.springapploan.model.LoanDisbursement;
import com.examly.springapploan.service.LoanDisbursementService;

import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import lombok.*;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/loandisbursements")
@RequiredArgsConstructor
public class LoanDisbursementController {

    private final LoanDisbursementService loanDisbursementStatus;

    @GetMapping
    @PreAuthorize("hasAnyRole('LOAN MANAGER', 'BRANCH MANAGER')")
    public ResponseEntity<?> getAllDisbursements() {
        List<LoanDisbursement> loandisbursements = loanDisbursementStatus.getAllLoanDisbursements();
        if (loandisbursements == null) {
            return ResponseEntity.status(500).body("unable to fetch loan disbursement details");
        }
        return ResponseEntity
                .status(200)
                .body(loandisbursements);
    }

    @GetMapping("/{loanDisbursementId}")
    @PreAuthorize("hasAnyRole('LOAN MANAGER', 'BRANCH MANAGER')")
    public ResponseEntity<?> getLoanDisbursementDetails(@PathVariable Long loanDisbursementId) {
        LoanDisbursement loandisbursement = loanDisbursementStatus
                .getLoanDisbursementsWithId(loanDisbursementId);
        if (loandisbursement == null) {
            return ResponseEntity.status(500)
                    .body("unable to fetch loan disbursement details with given id: " + loanDisbursementId);
        }
        return ResponseEntity
                .status(200)
                .body(loandisbursement);
    }

    @PostMapping
    @PreAuthorize("hasRole('LOAN MANAGER')")
    public ResponseEntity<String> addNewLoanDisbursement(@Valid @RequestBody LoanDisbursement loanDisbursement) {
        LoanDisbursement savedLoanDisbursement = loanDisbursementStatus.saveNewLoanDisbursement(loanDisbursement);
        if (savedLoanDisbursement == null) {
            return ResponseEntity.status(500).body("unable to create new loan disbursement at this moment");
        }
        return ResponseEntity
                .status(201)
                .body("loan disbursement details created successfully");
    }

    @PutMapping("/{loanDisbursementId}")
    @PreAuthorize("hasAnyRole('LOAN MANAGER', 'BRANCH MANAGER')")
    public ResponseEntity<String> updateLoanDisbursementDetails(@PathVariable Long loanDisbursementId,
            @Valid @RequestBody LoanDisbursement loanDisbursement) {
        LoanDisbursement updatedLoandisbursement = loanDisbursementStatus.updateLoanDisbursementsWithId(loanDisbursementId,
                loanDisbursement);

        if (updatedLoandisbursement == null) {
            return ResponseEntity.status(500).body("unable to update loan disbursement details at this moment");
        }
        return ResponseEntity
                .status(200)
                .body("loan disbursement details updated successfully with id: " + loanDisbursementId);
    }

    @DeleteMapping("/{loanDisbursementId}")
    @PreAuthorize("hasRole('LOAN MANAGER')")
    public ResponseEntity<String> deleteLoanDisbursementDetails(@PathVariable Long loanDisbursementId) {
        boolean isLoanDeleted = loanDisbursementStatus.deleteLoanDisbursementsWithId(loanDisbursementId);

        if (isLoanDeleted) {
            return ResponseEntity.status(500).body("unable to delete loan disbursement details at this moment");
        }
        return ResponseEntity
                .status(200)
                .body("loan disbursement details deleted successfully with id: " + loanDisbursementId);
    }

}
