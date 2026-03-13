package com.budgetwise.backend.controller;

import com.budgetwise.backend.entity.SavingsGoal;
import com.budgetwise.backend.service.SavingsGoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/savings")
@CrossOrigin(origins = "*")
public class SavingsGoalController {

    @Autowired
    private SavingsGoalService savingsGoalService;

    @PostMapping
    public SavingsGoal createGoal(@RequestBody SavingsGoal goal) {
        return savingsGoalService.createGoal(goal);
    }

    @GetMapping
    public List<SavingsGoal> getAllGoals() {
        return savingsGoalService.getAllGoals();
    }

    @GetMapping("/{id}")
    public SavingsGoal getGoalById(@PathVariable Long id) {
        return savingsGoalService.getGoalById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteGoal(@PathVariable Long id) {
        savingsGoalService.deleteGoal(id);
    }
}