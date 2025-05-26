package com.examly.springapploan.exception;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.*;
import org.springframework.http.*;
import org.springframework.validation.FieldError;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.http.converter.HttpMessageNotReadableException;

import java.net.ResponseCache;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.examly.springapploan.exception.BadInputDataException;
import com.examly.springapploan.exception.LoanDetailsNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadInputDataException.class)
    public ResponseEntity<String> getBadInputExceptionDetails(BadInputDataException exception) {
        return ResponseEntity
                .status(400)
                .body(exception.getMessage());
    }

    @ExceptionHandler(LoanDetailsNotFoundException.class)
    public ResponseEntity<String> getLoanNotFoundExceptionDetails(LoanDetailsNotFoundException exception) {
        return ResponseEntity
                .status(404)
                .body(exception.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<Object, Object>> getExceptionDetails(MethodArgumentNotValidException exception) {

        List<FieldError> fieldErrors = exception.getBindingResult().getFieldErrors();

        Map<Object, Object> errors = new HashMap<>();

        fieldErrors.forEach((error) -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });
        return ResponseEntity
                .status(400)
                .body(errors);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<String> getPermissionErrorDetails(AccessDeniedException accessDeniedException) {
        return ResponseEntity
                .status(403)
                .body("you dont have access to perform this action");
    }

    // @ExceptionHandler(HttpMessageNotReadableException.class)
    // public ResponseEntity<String>
    // getDataExceptionDetails(HttpMessageNotReadableException exception) {
    // return ResponseEntity.status(400)
    // .body("please enter valid data. data type mis match issue");
    // }
}
