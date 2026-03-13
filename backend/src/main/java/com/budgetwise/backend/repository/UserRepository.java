package com.budgetwise.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.budgetwise.backend.entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}