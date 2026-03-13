package com.budgetwise.backend.dto;

public class DashboardResponse {

    private Double totalIncome;
    private Double totalExpense;
    private Double savingsGoal;
    private Double targetExpense;

    public DashboardResponse(Double totalIncome,
                             Double totalExpense,
                             Double savingsGoal,
                             Double targetExpense) {
        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
        this.savingsGoal = savingsGoal;
        this.targetExpense = targetExpense;
    }

    public Double getTotalIncome() {
        return totalIncome;
    }

    public Double getTotalExpense() {
        return totalExpense;
    }

    public Double getSavingsGoal() {
        return savingsGoal;
    }

    public Double getTargetExpense() {
        return targetExpense;
    }
}