import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const AdminContext = createContext(null);
const API = process.env.REACT_APP_BACKEND_URL || '';

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('blx_admin_token'));
  const [loading, setLoading] = useState(true);
  const refreshTimerRef = useRef(null);

  const api = useCallback(() => {
    const instance = axios.create({
      baseURL: API,
      withCredentials: true,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    instance.interceptors.response.use(
      res => res,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            const refreshToken = localStorage.getItem('blx_admin_refresh');
            const res = await axios.post(`${API}/api/admin/refresh`,
              refreshToken ? { refresh_token: refreshToken } : {},
              { withCredentials: true }
            );
            const newToken = res.data.token;
            localStorage.setItem('blx_admin_token', newToken);
            setToken(newToken);
            error.config.headers.Authorization = `Bearer ${newToken}`;
            error.config.withCredentials = true;
            return axios(error.config);
          } catch {
            logout();
          }
        }
        return Promise.reject(error);
      }
    );
    return instance;
  }, [token]);

  const scheduleRefresh = useCallback((expiresIn) => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    const refreshIn = Math.max((expiresIn - 900) * 1000, 60000);
    refreshTimerRef.current = setTimeout(async () => {
      try {
        const refreshToken = localStorage.getItem('blx_admin_refresh');
        const res = await axios.post(`${API}/api/admin/refresh`,
          refreshToken ? { refresh_token: refreshToken } : {},
          { withCredentials: true }
        );
        localStorage.setItem('blx_admin_token', res.data.token);
        setToken(res.data.token);
        scheduleRefresh(res.data.expires_in);
      } catch {
        logout();
      }
    }, refreshIn);
  }, []);

  useEffect(() => {
    if (token) {
      api().get('/api/admin/me')
        .then(res => { setAdmin(res.data); setLoading(false); })
        .catch(() => { logout(); setLoading(false); });
    } else {
      // Try cookie-only auth (no localStorage token)
      axios.get(`${API}/api/admin/me`, { withCredentials: true })
        .then(res => { setAdmin(res.data); setLoading(false); })
        .catch(() => { setLoading(false); });
    }
  }, [token, api]);

  useEffect(() => {
    return () => { if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current); };
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${API}/api/admin/login`, { email, password }, { withCredentials: true });
    // Store in localStorage as fallback for header-based auth
    localStorage.setItem('blx_admin_token', res.data.token);
    localStorage.setItem('blx_admin_refresh', res.data.refresh_token);
    setToken(res.data.token);
    setAdmin(res.data.admin);
    scheduleRefresh(res.data.expires_in);
    return res.data;
  };

  const logout = () => {
    // Clear cookies via API + clear localStorage
    axios.post(`${API}/api/admin/logout`, {}, { withCredentials: true }).catch(() => {});
    localStorage.removeItem('blx_admin_token');
    localStorage.removeItem('blx_admin_refresh');
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
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
