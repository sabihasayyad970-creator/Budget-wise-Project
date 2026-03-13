package com.budgetwise.backend.repository;

import com.budgetwise.backend.entity.SavingsGoal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavingsGoalRepository extends JpaRepository<SavingsGoal, Long> {
}