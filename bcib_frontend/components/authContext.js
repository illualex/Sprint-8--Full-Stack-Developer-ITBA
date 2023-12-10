import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [client, setClient] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [isEmployee, setIsEmployee] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, client, setClient, authToken, setAuthToken, isEmployee, setIsEmployee }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
