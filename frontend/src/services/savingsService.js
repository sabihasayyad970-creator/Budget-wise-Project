import axios from "axios";

const API_URL = "http://localhost:8080/api/savings";

/* GET ALL SAVINGS / GOALS */
export const getSavings = () => {
  return axios.get(API_URL);
};

/* SAME FUNCTION USED BY SavingsGoal.jsx */
export const getGoals = () => {
  return axios.get(API_URL);
};

/* CREATE GOAL */
export const createGoal = (goal) => {
  return axios.post(API_URL, goal);
};

/* DELETE GOAL */
export const deleteGoal = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};