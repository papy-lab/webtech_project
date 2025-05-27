package com.example.bankmanagement.bankmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bankmanagement.bankmanagement.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
}