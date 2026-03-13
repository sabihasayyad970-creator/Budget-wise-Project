package com.budgetwise.backend.service;

import com.budgetwise.backend.entity.SavingsGoal;
import com.budgetwise.backend.repository.SavingsGoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavingsGoalService {

    @Autowired
    private SavingsGoalRepository savingsGoalRepository;

    public SavingsGoal createGoal(SavingsGoal goal) {
        return savingsGoalRepository.save(goal);
    }

    public List<SavingsGoal> getAllGoals() {
        return savingsGoalRepository.findAll();
    }

    public SavingsGoal getGoalById(Long id) {
        return savingsGoalRepository.findById(id).orElse(null);
    }

    public void deleteGoal(Long id) {
        savingsGoalRepository.deleteById(id);
    }
}