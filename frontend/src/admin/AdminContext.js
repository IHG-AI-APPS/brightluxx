import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AdminContext = createContext(null);
const API = process.env.REACT_APP_BACKEND_URL || '';

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('blx_admin_token'));
  const [loading, setLoading] = useState(true);

  const api = useCallback(() => {
    return axios.create({
      baseURL: API,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }, [token]);

  useEffect(() => {
    if (token) {
      api().get('/api/admin/me')
        .then(res => { setAdmin(res.data); setLoading(false); })
        .catch(() => { logout(); setLoading(false); });
    } else {
      setLoading(false);
    }
  }, [token, api]);

  const login = async (email, password) => {
    const res = await axios.post(`${API}/api/admin/login`, { email, password });
    localStorage.setItem('blx_admin_token', res.data.token);
    setToken(res.data.token);
    setAdmin(res.data.admin);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('blx_admin_token');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, token, loading, login, logout, api }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
