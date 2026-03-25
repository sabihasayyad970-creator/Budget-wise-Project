package com.budgetwise.backend.controller;

import com.budgetwise.backend.entity.Income;
import com.budgetwise.backend.repository.IncomeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/income")
@CrossOrigin(origins = "*")
public class IncomeController {

    @Autowired
    private IncomeRepository incomeRepository;

    // ✅ 1. GET ALL INCOME
    @GetMapping
    public ResponseEntity<List<Income>> getAllIncome() {
        return ResponseEntity.ok(incomeRepository.findAll());
    }

    // ✅ 2. ADD INCOME
    @PostMapping
    public ResponseEntity<?> addIncome(@RequestBody Income income) {

        if (income.getAmount() == null ||
            income.getSource() == null ||
            income.getDate() == null ||
            income.getUserId() == null) {

            return ResponseEntity.badRequest().body("All fields are required");
        }

        Income savedIncome = incomeRepository.save(income);
        return ResponseEntity.ok(savedIncome);
    }

    // ✅ 3. GET INCOME BY USER
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Income>> getIncomeByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(incomeRepository.findByUserId(userId));
    }

    // ✅ 4. GET INCOME BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getIncomeById(@PathVariable Long id) {

        Optional<Income> income = incomeRepository.findById(id);

        if (income.isPresent()) {
            return ResponseEntity.ok(income.get());
        } else {
            return ResponseEntity.status(404).body("Income not found");
        }
    }

    // ✅ 5. UPDATE INCOME
    @PutMapping("/{id}")
    public ResponseEntity<?> updateIncome(@PathVariable Long id,
                                          @RequestBody Income newIncome) {

        Optional<Income> optionalIncome = incomeRepository.findById(id);

        if (optionalIncome.isPresent()) {

            Income income = optionalIncome.get();

            income.setAmount(newIncome.getAmount());
            income.setSource(newIncome.getSource());
            income.setDate(newIncome.getDate());
            income.setUserId(newIncome.getUserId());

            Income updatedIncome = incomeRepository.save(income);

            return ResponseEntity.ok(updatedIncome);

        } else {
            return ResponseEntity.status(404).body("Income not found");
        }
    }

    // ✅ 6. DELETE INCOME
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIncome(@PathVariable Long id) {

        try {
            if (!incomeRepository.existsById(id)) {
                return ResponseEntity.status(404).body("Income not found");
            }

            incomeRepository.deleteById(id);

            return ResponseEntity.ok("Income deleted successfully");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting: " + e.getMessage());
        }
    }
}