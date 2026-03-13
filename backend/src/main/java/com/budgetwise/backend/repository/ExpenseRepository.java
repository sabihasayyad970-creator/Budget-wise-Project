package com.budgetwise.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.budgetwise.backend.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUserId(Long userId);

}