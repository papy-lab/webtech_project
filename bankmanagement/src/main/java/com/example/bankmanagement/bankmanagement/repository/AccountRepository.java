package com.example.bankmanagement.bankmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bankmanagement.bankmanagement.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {
}