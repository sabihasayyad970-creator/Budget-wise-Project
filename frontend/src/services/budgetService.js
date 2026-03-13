import axios from "axios";

const API_URL = "http://localhost:8080/api/budgets";

export const getBudgets = () => {
  return axios.get(API_URL);
};

export const createBudget = (budget) => {
  return axios.post(API_URL, budget);
};

export const deleteBudget = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};