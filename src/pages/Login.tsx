import React, {useEffect, useState} from 'react';
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isAuthenticated } = useAuth();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login(username, password);
    };

    useEffect(()=>{
        if (isAuthenticated){
            navigate('/');
        }
    }, [isAuthenticated]);

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900 ">Login</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <form className="p-4 max-w-md mx-auto">
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                id="username" name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password" name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border p-2 w-full"
                            />
                        </div>
                        <button type="button" onClick={handleLogin} className="bg-blue-500 text-white p-2 mt-4 w-full">
                            Login
                        </button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </form>
                </div>
            </main>
        </>
    );
};
