package com.budgetwise.backend.controller;

import com.budgetwise.backend.dto.DashboardResponse;
import com.budgetwise.backend.service.DashboardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/{userId}")
    public DashboardResponse getDashboard(@PathVariable Long userId) {
        return dashboardService.getDashboardData(userId);
    }
}