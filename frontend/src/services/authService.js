import axios from "axios";

const API_URL = "http://localhost:8080/api/profile";

export const getProfile = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};