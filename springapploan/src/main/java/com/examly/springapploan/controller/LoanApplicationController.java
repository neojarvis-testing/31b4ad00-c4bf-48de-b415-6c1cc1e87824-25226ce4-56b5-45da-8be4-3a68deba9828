package com.examly.springapploan.controller;

import java.util.List;

import com.examly.springapploan.model.LoanApplication;
import com.examly.springapploan.service.LoanApplicationService;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import lombok.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/api/loanapplications")
public class LoanApplicationController {

    private final LoanApplicationService loanApplicationService;

    public LoanApplicationController(LoanApplicationService loanApplicationService) {
        this.loanApplicationService = loanApplicationService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('BRANCH MANAGER', 'LOAN MANAGER')")
    public ResponseEntity<?> getAllLoanApplications() {
        List<LoanApplication> loanApplications = loanApplicationService.fetchAllLoanApplications();

        if(loanApplications == null) {
            return ResponseEntity.status(500).body("unable to fetch loan applications at this moment");
        }
        return ResponseEntity
                .status(200)
                .body(loanApplications);
    }

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<String> addNewLoanApplication(@RequestBody @Valid LoanApplication loanApplication) {
        LoanApplication savedLoanApplication = loanApplicationService.createNewLoanApplication(loanApplication);

        if (savedLoanApplication == null) {
            return ResponseEntity.status(500).body("unable to submit you loan application at this moment");
        }
        return ResponseEntity
                .status(201)
                .body("loan application created successfully");
    }

    /* Customer - 200, 500 */
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> fetchUserLoanApplications(@PathVariable Long userId) {
        List<LoanApplication> userLoanApplicaions = loanApplicationService.fetchLoanApplicationsForUser(userId);

        if(userLoanApplicaions == null) {
            return ResponseEntity.status(500).body("unable to fetch user loan applications at this moment");
        }
        return ResponseEntity
                .status(200)
                .body(userLoanApplicaions);
    }

    @GetMapping("/{loanApplicationId}")
    @PreAuthorize("hasAnyRole('BRANCH MANAGER', 'LOAN MANAGER','CUSTOMER')")
    public ResponseEntity<?> fetchLoanApplicationDetailsById(@PathVariable Long loanApplicationId) {
        LoanApplication loanApplicationDetails = loanApplicationService
                .fetchLoanApplicationDetailsForLoanApplicationId(loanApplicationId);

        if(loanApplicationDetails == null) {
            return ResponseEntity.status(500).body("unable to fetch your loan applications at this moment");
        }
        return ResponseEntity
                .status(200)
                .body(loanApplicationDetails);
    }

    @PutMapping("/{loanApplicationId}")
    @PreAuthorize("hasAnyRole('BRANCH MANAGER', 'LOAN MANAGER','CUSTOMER')")
    public ResponseEntity<String> updateLoanApplicationDetails(@PathVariable Long loanApplicationId,
            @RequestBody @Valid LoanApplication loanApplication) {
        LoanApplication loanApplicationDetails = loanApplicationService
                .updateLoanApplicationDetailsWithLoanApplicationId(loanApplicationId, loanApplication);
        if (loanApplicationDetails == null) {
            return ResponseEntity.status(500)
                    .body("unable to update your location due to data issue " + loanApplicationId);
        }
        return ResponseEntity
                .status(200)
                .body("loan application details updated successfully");
    }

    @DeleteMapping("/{loanApplicationId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<String> deleteLoanApplication(@PathVariable Long loanApplicationId) {
        LoanApplication loanApplication = loanApplicationService.deleteLoanApplicationById(loanApplicationId);

        if(loanApplication == null) {
            return ResponseEntity.status(500).body("unable to delete loan application details for loan application id: " +loanApplicationId + " at this moment");
        }
        return ResponseEntity
                .status(200)
                .body("your loan application deleted successfully");
    }

}
