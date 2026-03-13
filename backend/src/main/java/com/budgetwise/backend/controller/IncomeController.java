package com.budgetwise.backend.controller;

import com.budgetwise.backend.entity.Income;
import com.budgetwise.backend.repository.IncomeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/income")
@CrossOrigin(origins = "*")
public class IncomeController {

    @Autowired
    private IncomeRepository incomeRepository;

    // ADD INCOME
    @PostMapping("/add")
    public ResponseEntity<Income> addIncome(@RequestBody Income income) {

        if (income.getAmount() == null ||
            income.getSource() == null ||
            income.getDate() == null ||
            income.getUserId() == null) {

            return ResponseEntity.badRequest().build();
        }

        Income savedIncome = incomeRepository.save(income);
        return ResponseEntity.ok(savedIncome);
    }

    // GET ALL INCOME BY USER
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Income>> getIncomeByUser(@PathVariable Long userId) {

        List<Income> incomes = incomeRepository.findByUserId(userId);
        return ResponseEntity.ok(incomes);
    }

    // GET INCOME BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Income> getIncomeById(@PathVariable Long id) {

        return incomeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE INCOME
    @PutMapping("/update/{id}")
    public ResponseEntity<Income> updateIncome(@PathVariable Long id, @RequestBody Income incomeDetails) {

        if (!incomeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        incomeDetails.setId(id);
        Income updatedIncome = incomeRepository.save(incomeDetails);

        return ResponseEntity.ok(updatedIncome);
    }

    // DELETE INCOME
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteIncome(@PathVariable Long id) {

        if (!incomeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        incomeRepository.deleteById(id);

        return ResponseEntity.ok("Income deleted successfully");
    }
}