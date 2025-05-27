package com.example.bankmanagement.bankmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bankmanagement.bankmanagement.entity.Loan;

public interface LoanRepository extends JpaRepository<Loan, Integer> {
}