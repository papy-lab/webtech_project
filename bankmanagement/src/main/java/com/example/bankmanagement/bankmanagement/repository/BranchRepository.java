package com.example.bankmanagement.bankmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bankmanagement.bankmanagement.entity.Branch;

public interface BranchRepository extends JpaRepository<Branch, Integer> {
}