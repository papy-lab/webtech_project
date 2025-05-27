package com.example.bankmanagement.bankmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bankmanagement.bankmanagement.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}