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
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    // Auto-refresh on 401
    instance.interceptors.response.use(
      res => res,
      async (error) => {
        if (error.response?.status === 401) {
          const refreshToken = localStorage.getItem('blx_admin_refresh');
          if (refreshToken) {
            try {
              const res = await axios.post(`${API}/api/admin/refresh`, { refresh_token: refreshToken });
              const newToken = res.data.token;
              localStorage.setItem('blx_admin_token', newToken);
              setToken(newToken);
              // Retry the original request
              error.config.headers.Authorization = `Bearer ${newToken}`;
              return axios(error.config);
            } catch {
              logout();
            }
          } else {
            logout();
          }
        }
        return Promise.reject(error);
      }
    );
    return instance;
  }, [token]);

  // Schedule token refresh (refresh 15min before expiry)
  const scheduleRefresh = useCallback((expiresIn) => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    const refreshIn = Math.max((expiresIn - 900) * 1000, 60000); // 15min before expiry, min 1min
    refreshTimerRef.current = setTimeout(async () => {
      const refreshToken = localStorage.getItem('blx_admin_refresh');
      if (refreshToken) {
        try {
          const res = await axios.post(`${API}/api/admin/refresh`, { refresh_token: refreshToken });
          localStorage.setItem('blx_admin_token', res.data.token);
          setToken(res.data.token);
          scheduleRefresh(res.data.expires_in);
        } catch {
          logout();
        }
      }
    }, refreshIn);
  }, []);

  useEffect(() => {
    if (token) {
      api().get('/api/admin/me')
        .then(res => { setAdmin(res.data); setLoading(false); })
        .catch(() => { logout(); setLoading(false); });
    } else {
      setLoading(false);
    }
  }, [token, api]);

  // Cleanup timer
  useEffect(() => {
    return () => { if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current); };
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${API}/api/admin/login`, { email, password });
    localStorage.setItem('blx_admin_token', res.data.token);
    localStorage.setItem('blx_admin_refresh', res.data.refresh_token);
    setToken(res.data.token);
    setAdmin(res.data.admin);
    scheduleRefresh(res.data.expires_in);
    return res.data;
  };

  const logout = () => {
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
