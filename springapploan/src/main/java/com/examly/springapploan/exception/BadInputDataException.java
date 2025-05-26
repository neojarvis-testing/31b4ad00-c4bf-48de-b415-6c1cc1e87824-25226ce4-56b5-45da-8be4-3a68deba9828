package com.examly.springapploan.exception;

public class BadInputDataException extends RuntimeException {
    public BadInputDataException(String message) {
        super(message);
    }
}