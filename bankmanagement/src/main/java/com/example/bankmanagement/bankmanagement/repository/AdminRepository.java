package com.example.bankmanagement.bankmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bankmanagement.bankmanagement.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
}