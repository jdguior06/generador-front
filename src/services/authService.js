import axios from 'axios';

// const API_URL = 'http://localhost:3001/api/auth';
const API_URL = 'https://generador-back-production.up.railway.app/api/auth';

export const registerUser = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
};
