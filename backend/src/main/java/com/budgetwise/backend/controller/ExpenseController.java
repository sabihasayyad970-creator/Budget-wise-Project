package com.budgetwise.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.budgetwise.backend.entity.Expense;
import com.budgetwise.backend.repository.ExpenseRepository;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    private final ExpenseRepository expenseRepository;

    public ExpenseController(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // CREATE EXPENSE
    @PostMapping
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {

        Expense savedExpense = expenseRepository.save(expense);

        return ResponseEntity.ok(savedExpense);
    }

    // GET ALL EXPENSES
    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {

        List<Expense> expenses = expenseRepository.findAll();

        return ResponseEntity.ok(expenses);
    }

    // GET EXPENSE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getExpenseById(@PathVariable Long id) {

        Optional<Expense> expense = expenseRepository.findById(id);

        if (expense.isPresent()) {
            return ResponseEntity.ok(expense.get());
        } else {
            return ResponseEntity.status(404).body("Expense not found");
        }
    }

    // GET EXPENSES BY USER
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Expense>> getExpensesByUser(@PathVariable Long userId) {

        List<Expense> expenses = expenseRepository.findByUserId(userId);

        return ResponseEntity.ok(expenses);
    }

    // UPDATE EXPENSE
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateExpense(@PathVariable Long id,
                                                @RequestBody Expense newExpense) {

        Optional<Expense> optionalExpense = expenseRepository.findById(id);

        if (optionalExpense.isPresent()) {

            Expense expense = optionalExpense.get();

            expense.setTitle(newExpense.getTitle());
            expense.setCategory(newExpense.getCategory());
            expense.setAmount(newExpense.getAmount());
            expense.setDate(newExpense.getDate());
            expense.setUserId(newExpense.getUserId());

            Expense updatedExpense = expenseRepository.save(expense);

            return ResponseEntity.ok(updatedExpense);

        } else {

            return ResponseEntity.status(404).body("Expense not found");
        }
    }

    // DELETE EXPENSE
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteExpense(@PathVariable Long id) {

        if (!expenseRepository.existsById(id)) {

            return ResponseEntity.status(404).body("Expense not found");
        }

        expenseRepository.deleteById(id);

        return ResponseEntity.ok("Expense deleted successfully");
    }
}