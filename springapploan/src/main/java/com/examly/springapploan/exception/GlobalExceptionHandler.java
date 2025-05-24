package com.examly.springapploan.exception;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.*;
import org.springframework.http.*;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.examly.springapploan.exception.BadInputDataException;
import com.examly.springapploan.exception.LoanDetailsNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadInputDataException.class)
    public ResponseEntity<Map<Object, Object>> getBadInputExceptionDetails(BadInputDataException exception) {
        return ResponseEntity
                .status(400)
                .body(Map.of("exception", exception.getMessage()));
    }


    @ExceptionHandler(LoanDetailsNotFoundException.class)
    public ResponseEntity<Map<Object, Object>> getLoanNotFoundExceptionDetails(LoanDetailsNotFoundException exception) {
        return ResponseEntity
                .status(404)
                .body(Map.of("exception", exception.getMessage()));
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
}
