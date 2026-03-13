package com.budgetwise.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.budgetwise.backend.entity.Profile;
import com.budgetwise.backend.entity.User;
import com.budgetwise.backend.repository.ProfileRepository;
import com.budgetwise.backend.repository.UserRepository;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    public Profile getProfile(Long userId) {

        if (userId == null) {
            return null;
        }

        return profileRepository
                .findByUser_Id(userId)
                .orElse(null);
    }

    public String saveOrUpdateProfile(Long userId, Profile profileData) {

        if (userId == null) {
            return "Invalid User ID";
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Profile> existingProfile =
                profileRepository.findByUser_Id(userId);

        Profile profile;

        if (existingProfile.isPresent()) {
            profile = existingProfile.get();
        } else {
            profile = new Profile();
            profile.setUser(user);
        }

        profile.setPhone(profileData.getPhone());
        profile.setPhoto(profileData.getPhoto());
        profile.setSavingsGoal(profileData.getSavingsGoal());
        profile.setTargetExpense(profileData.getTargetExpense());

        profileRepository.save(profile);

        return "Profile saved successfully!";
    }
}