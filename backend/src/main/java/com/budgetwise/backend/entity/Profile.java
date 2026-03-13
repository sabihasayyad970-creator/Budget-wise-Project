package com.budgetwise.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phone;
    private String photo;

    private Double savingsGoal;
    private Double targetExpense;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    // Getters & Setters
    public Long getId() { return id; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPhoto() { return photo; }
    public void setPhoto(String photo) { this.photo = photo; }

    public Double getSavingsGoal() { return savingsGoal; }
    public void setSavingsGoal(Double savingsGoal) { this.savingsGoal = savingsGoal; }

    public Double getTargetExpense() { return targetExpense; }
    public void setTargetExpense(Double targetExpense) { this.targetExpense = targetExpense; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}