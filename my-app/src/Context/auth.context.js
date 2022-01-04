import React, { createContext, useState, useContext, useEffect, useMemo, lazy } from 'react'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken';

//api here is an axios instance which has the baseURL set according to the env.
import api from '../utils/api';

const Login = lazy(() => import('../pages/Login'));

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        function loadUserFromCookies() {
            setLoading(true);
            const token = Cookies.get('token')
            if (token) {
                const user = jwt.decode(token);
                api.defaults.headers['authorization'] = `Bearer ${token}`;
                if (user) setUser(user);
            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])

    const login = async ({ token }) => {
        console.log(token);
        if (token) {
            Cookies.set('token', token, { expires: 7 });
            api.defaults.headers['authorization'] = `Bearer ${token}`;
            const user = jwt.decode(token);
            setUser(user);
        }
    }

    const clearStorage = () => {
        Cookies.remove('token');
        delete api.defaults.headers['authorization']
        setUser(null);
        setLoading(false);
    }

    const logout = () => {
        Cookies.remove('token');
        delete api.defaults.headers['authorization']
        setUser(null);
        setLoading(false);
    }
    const contextValue = useMemo(() => {
        return { isAuthenticated: !!user, user, login, loading, logout };
    }, [user, loading]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);

export const ProtectedRoute = (Component) => {

    const { isAuthenticated } = useAuthContext();
    if (isAuthenticated) {
        return Component
    } else {
        return Login
    }

}