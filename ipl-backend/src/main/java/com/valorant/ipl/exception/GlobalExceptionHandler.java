package com.valorant.ipl.exception;

import com.valorant.ipl.model.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(TeamNotFoundException.class)
    public ResponseEntity<?> handleConstraintViolationException(TeamNotFoundException e, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(),e.getMessage() ,new Date());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
}
