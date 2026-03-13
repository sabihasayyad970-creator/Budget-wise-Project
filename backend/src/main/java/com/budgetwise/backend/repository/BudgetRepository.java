package com.budgetwise.backend.repository;

import com.budgetwise.backend.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
}