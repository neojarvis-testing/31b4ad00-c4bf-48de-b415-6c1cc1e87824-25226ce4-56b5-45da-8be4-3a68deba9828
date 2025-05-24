package com.examly.springapploan.exception;

public class LoanDetailsNotFoundException extends RuntimeException {
    public LoanDetailsNotFoundException(String message) {
        super(message);
    }
}
