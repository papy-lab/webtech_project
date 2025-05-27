package com.example.bankmanagement.bankmanagement.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import jakarta.validation.Valid;

import com.example.bankmanagement.bankmanagement.dto.AuthResponse;
import com.example.bankmanagement.bankmanagement.dto.LoginRequest;
import com.example.bankmanagement.bankmanagement.dto.SignupRequest;
import com.example.bankmanagement.bankmanagement.entity.Customer;
import com.example.bankmanagement.bankmanagement.security.JwtUtil;
import com.example.bankmanagement.bankmanagement.service.CustomerService;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtil.generateToken(loginRequest.getEmail());

            Customer customer = customerService.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Error: Customer not found."));

            return ResponseEntity.ok(new AuthResponse(jwt, customer));
        } catch (BadCredentialsException e) {
            logger.error("Invalid email/password combination");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Invalid email or password"));
        } catch (Exception e) {
            logger.error("Error during authentication: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Error during authentication"));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            logger.info("Processing signup request for email: {}", signupRequest.getEmail());
            
            if (customerService.existsByEmail(signupRequest.getEmail())) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Email is already in use"));
            }

            // Create new customer
            Customer customer = new Customer();
            customer.setName(signupRequest.getName());
            customer.setEmail(signupRequest.getEmail());
            customer.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
            customer.setPhone(signupRequest.getPhone());
            customer.setDateOfBirth(signupRequest.getDateOfBirth());

            customerService.saveCustomer(customer);
            logger.info("Successfully registered user with email: {}", signupRequest.getEmail());

            return ResponseEntity.ok(new SuccessResponse("User registered successfully"));
        } catch (Exception e) {
            logger.error("Error during registration: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Error during registration: " + e.getMessage()));
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, Object> response = new HashMap<>();
        Map<String, String> errors = new HashMap<>();
        
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            String fieldName = error.getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        response.put("status", "error");
        response.put("message", "Validation failed");
        response.put("errors", errors);
        
        logger.error("Validation error: {}", errors);
        return ResponseEntity.badRequest().body(response);
    }

    @Data
    @AllArgsConstructor
    private static class ErrorResponse {
        private String error;
    }

    @Data
    @AllArgsConstructor
    private static class SuccessResponse {
        private String message;
    }
} 