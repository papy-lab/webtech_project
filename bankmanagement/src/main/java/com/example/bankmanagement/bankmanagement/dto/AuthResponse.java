package com.example.bankmanagement.bankmanagement.dto;

import com.example.bankmanagement.bankmanagement.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Customer user;
} 