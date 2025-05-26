package com.examly.springapploan.controller;

import com.examly.springapploan.service.LoanService;
import com.examly.springapploan.model.Loan;
import org.springframework.web.bind.annotation.*;


import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import lombok.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
@RequiredArgsConstructor
public class LoanController {

    private final LoanService loanService;

    @GetMapping
    @PreAuthorize("hasAnyRole('CUSTOMER', 'LOAN MANAGER', 'BRANCH MANAGER')")
    public ResponseEntity<?> getAllLoans() {
        List<Loan> loans = loanService.fetchAllLoans();

        if(loans == null) {
            return ResponseEntity.status(500).body("unable to fetch loans at this moment");
        }
        return ResponseEntity.status(200)
                .body(loans);
    }

    @PostMapping
    @PreAuthorize("hasRole('LOAN MANAGER')")
    public ResponseEntity<String> addNewLoan(@Valid @RequestBody Loan loan) {
        Loan savedLoan = loanService.createNewLoanRequest(loan);
        if(savedLoan  == null) {
            return ResponseEntity.status(500).body("unable to create loan at this moment");
        }
        return ResponseEntity
                .status(201)
                .body("loan created successfully");
    }

    @GetMapping("/{loanId}")
    @PreAuthorize("hasRole('LOAN MANAGER')")
    public ResponseEntity<?> getLoanDetailsById(@PathVariable Long loanId) {
        Loan requestedLoanDetails = loanService.fetchLoanDetailsByLoanId(loanId);
        if(requestedLoanDetails == null) {
            return ResponseEntity.status(500).body("unable to fetch loan details for loan id: " +loanId + " at this moment");
        }
        return ResponseEntity
                .status(200)
                .body(requestedLoanDetails);
    }

    @PutMapping("/{loanId}")
    @PreAuthorize("hasAnyRole('BRANCH MANAGER', 'LOAN MANAGER')")
    public ResponseEntity<String> updateLoanDetailsByLoanId(@PathVariable("loanId") Long loanId,
            @Valid @RequestBody Loan loan) {
        Loan updatedLoanDetails = loanService.updateLoanDetails(loanId, loan);

        if(updatedLoanDetails == null) {
            return ResponseEntity.status(500).body("unable to update loan details for loan id: " + loanId);
        }
        return ResponseEntity
                .status(200)
                .body("loan details updated successfully");
    }

    @DeleteMapping("/{loanId}")
    @PreAuthorize("hasRole('LOAN MANAGER')")
    public ResponseEntity<String> deleteLoanDetailsById(@PathVariable Long loanId) {
        Loan loan = loanService.deleteLoanDetailsByLoanId(loanId);
        if(loan == null) {
            return ResponseEntity.status(500).body("unable to delete loan details for loan id: " +loanId + " at this moment");
        }
        return ResponseEntity
                .status(200)
                .body("loan details deleted successfully");
    }

}
