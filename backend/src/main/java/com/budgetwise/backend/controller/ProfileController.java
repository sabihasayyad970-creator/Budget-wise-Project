package com.budgetwise.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.budgetwise.backend.entity.Profile;
import com.budgetwise.backend.service.ProfileService;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    // ✅ GET Profile
    @GetMapping("/{userId}")
    public Profile getProfile(@PathVariable Long userId) {
        return profileService.getProfile(userId);
    }

    // ✅ CREATE / UPDATE Profile
    @PutMapping("/{userId}")
    public String saveProfile(@PathVariable Long userId,
                              @RequestBody Profile profile) {
        return profileService.saveOrUpdateProfile(userId, profile);
    }
}