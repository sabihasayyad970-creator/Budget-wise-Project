package com.budgetwise.backend.service;

import com.budgetwise.backend.dto.DashboardResponse;
import com.budgetwise.backend.entity.Profile;
import com.budgetwise.backend.repository.ProfileRepository;
import com.budgetwise.backend.repository.IncomeRepository;
import com.budgetwise.backend.repository.ExpenseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private ProfileRepository profileRepository;

    public DashboardResponse getDashboardData(Long userId) {

        // Total Income
        Double totalIncome = incomeRepository
                .findByUserId(userId)
                .stream()
                .mapToDouble(i -> i.getAmount() != null ? i.getAmount() : 0.0)
                .sum();

        // Total Expense
        Double totalExpense = expenseRepository
                .findByUserId(userId)
                .stream()
                .mapToDouble(e -> e.getAmount() != null ? e.getAmount() : 0.0)
                .sum();

        // Profile Data
        Profile profile = profileRepository
                .findByUser_Id(userId)
                .orElse(null);

        Double savingsGoal = 0.0;
        Double targetExpense = 0.0;

        if (profile != null) {
            savingsGoal = profile.getSavingsGoal() != null
                    ? profile.getSavingsGoal()
                    : 0.0;

            targetExpense = profile.getTargetExpense() != null
                    ? profile.getTargetExpense()
                    : 0.0;
        }

        return new DashboardResponse(
                totalIncome,
                totalExpense,
                savingsGoal,
                targetExpense
        );
    }
}