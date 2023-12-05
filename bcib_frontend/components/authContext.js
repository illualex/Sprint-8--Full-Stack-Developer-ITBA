// authContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [clientName, setClientNameInternal] = useState('');

    const setClientName = (name) => {
        setClientNameInternal(name);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, clientName, setClientName }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
