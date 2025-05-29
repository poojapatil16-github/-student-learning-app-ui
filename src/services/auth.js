import axios from 'axios';

const API = 'http://localhost:5000/api/auth';

export const login = (email, password) =>
    axios.post(`${API}/login`, { email, password });

export const register = (username, email, password) =>
    axios.post(`${API}/register`, {username, email, password });
