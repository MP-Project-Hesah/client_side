import React, { createContext, useState, useContext, useEffect, useMemo, lazy } from 'react'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken';

//api here is an axios instance which has the baseURL set according to the env.
import api from '../utils/api';
//Lazy loading is the technique used in optimizing my app
//lazy load ? تقسم الكود وتجيب البيانات الي انا طلبتها بعدين تجيب الباقي^^
const Login = lazy(() => import('../pages/Login')); // import Login compent and lazy load 
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    // set states
    const [user, setUser] = useState(null);
    const [subItems, setsubItems] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        function loadUserFromCookies() {
            setLoading(true);
            const token = Cookies.get('token') /////// Import token from cookies ///////
            if (token) {
                const user = jwt.decode(token); // decode token and check the token validation
                api.defaults.headers['authorization'] = `Bearer ${token}`; // set authorization token
                if (user) setUser(user); // set logged in user
            }
            setLoading(false); // set user loading;
        }
        loadUserFromCookies();
    }, [])

    const login = async ({ token }) => {
        if (token) {
            Cookies.set('token', token, { expires: 60 * 60 }); // set token at cookies and also tell expiration time
            api.defaults.headers['authorization'] = `Bearer ${token}`; // set authorization token
            const user = jwt.decode(token); // decode token and check the token validation
            setUser(user); // set logged in user
        }
    }

    const clearStorage = () => {
        Cookies.remove('token'); // remove token from cookies
        delete api.defaults.headers['authorization'] // un set token authorization
        setUser(null); // set user null 
        setLoading(false); // set loading false
    }

    const logout = () => {
        Cookies.remove('token');// remove token from cookies 
        delete api.defaults.headers['authorization'] // un set token authorization
        setUser(null); // set user null 
        setLoading(false); // set loading false
    }
    const SubScribeList = () => {
        // call subscrition api globaly
        api.get(`/subscribe/list`).then(({ data }) => {
            setsubItems(data); // set subscription list
        }).catch(error => {
            // check error and alert message.
            if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 404)) {
                alert(error.response.data)
            } else if (error && error.response && error.response.status === 500) {
                alert(error.response.data)
            } else if (error && error.response && error.response.status === 401) {
                alert(error.response.data)
                logout();
            } else {
                alert('Network Error!')
            }
        })
    }
    // set context hook
    const contextValue = useMemo(() => {
        return { isAuthenticated: !!user, user, login, loading, logout, SubScribeList, subItems };
    }, [user, subItems, loading]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);



// set root protection for user
export const ProtectedRoute = (Component) => {

    const { isAuthenticated, user } = useAuthContext();
    if (isAuthenticated && user && user.role === 'user') {
        return Component
    } else {
        return Login
    }
}
// set root protection for admin
export const AdminProtectedRoute = (Component) => {

    const { isAuthenticated, user } = useAuthContext();
    if (isAuthenticated && user && user.role === 'admin') {
        return Component
    } else {
        return Login
    }
}