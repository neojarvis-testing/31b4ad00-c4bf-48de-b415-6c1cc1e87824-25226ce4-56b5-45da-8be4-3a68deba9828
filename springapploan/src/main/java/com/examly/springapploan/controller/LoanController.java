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
    public ResponseEntity<List<Loan>> getAllLoans() {
        List<Loan> loans = loanService.fetchAllLoans();
        return ResponseEntity.status(200)
                .body(loans);
    }

    @PostMapping
    @PreAuthorize("hasRole('LOAN MANAGER')")
    public ResponseEntity<Loan> addNewLoan(@Valid @RequestBody Loan loan) {
        Loan savedLoan = loanService.createNewLoanRequest(loan);
        return ResponseEntity
                .status(201)
                .body(savedLoan);
    }


    @GetMapping("/{loanId}")
    @PreAuthorize("hasRole('LOAN MANAGER')")
    public ResponseEntity<Loan> getLoanDetailsById(@PathVariable Long loanId) {
        Loan requestedLoanDetails = loanService.fetchLoanDetailsByLoanId(loanId);
        return ResponseEntity
                .status(200)
                .body(requestedLoanDetails);
    }

    @PutMapping("/{loanId}")
    @PreAuthorize("hasAnyRole('BRANCH MANAGER', 'LOAN MANAGER')")
    public ResponseEntity<Loan> updateLoanDetailsByLoanId(@PathVariable("loanId") Long loanId, @Valid @RequestBody Loan loan) {
        Loan updatedLoanDetails = loanService.updateLoanDetails(loanId, loan);
        return ResponseEntity
        .status(200)
        .body(updatedLoanDetails);
    }

    @DeleteMapping("/{loanId}")
    @PreAuthorize("hasRole('LOAN MANAGER')")
    public ResponseEntity<String> deleteLoanDetailsById(@PathVariable Long loanId) {
        loanService.deleteLoanDetailsByLoanId(loanId);

        return ResponseEntity
        .status(200)
        .body("loan details deleted successfully");
    }




}
