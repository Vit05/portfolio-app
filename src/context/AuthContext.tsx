import {createContext, ReactNode, useContext, useState} from 'react';
import {validUsers} from '../data/users';
import {clearCredentials, getCredentials, setCredentials} from '../utils/localStorage';

interface AuthContextProps {
    isAuthenticated: boolean;
    userName: string | null;
    login: (username: string, password: string) => void;
    logout: () => void;
    error: string | null;
}

interface AuthProviderProps {
    children: ReactNode;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getCredentials());
    const [userName, setUserName] = useState<string | null>(getCredentials()?.username);
    const [error, setError] = useState<string | null>(null);

    const login = (username: string, password: string) => {
        const user = validUsers.find(u => u.userName === username && u.password === password);

        if (user) {
            setCredentials(username, password);
            setUserName(username);
            setIsAuthenticated(true);
            setError(null);
        } else {
            setError('Invalid username or password');
        }
    };

    const logout = () => {
        clearCredentials();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userName, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
