import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {AuthProvider, useAuth} from "./context/AuthContext";
import {Dashboard} from "./pages/Dashboard";
import {Login} from "./pages/Login";
import {MainLayout} from "./components/MainLayout.tsx";
import {Positions} from "./pages/Positions";
import {Historical} from "./pages/Historical";
import {NotFound} from "./pages/NotFound.tsx";

interface ProtectedRouteProps {
    children: React.ReactNode;
}
const ProtectedRoute = ({children}:ProtectedRouteProps) => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login"/>;
};

const publicRoutes = [
    {path: "/login", title: "Login", element: <Login/>},
    {path: "/*", title: "Not found", element: <NotFound/>},

];

const privateRoutes = [
    {path: "/", title: "Dashboard", element: <Dashboard/>},
    {path: "/positions", title: "Positions Table", element: <Positions/>},
    {path: "/historical", title: "Historical", element: <Historical/>},
];

export const App = () => (

    <Router>
        <AuthProvider>
            <MainLayout>
                <Routes>

                    {/* Map public routes */}
                    {publicRoutes.map((route) => (
                        <Route key={route.path} path={route.path} element={route.element}/>
                    ))}

                    {/* Map private routes */}
                    {privateRoutes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
                        />
                    ))}
                </Routes>
            </MainLayout>
        </AuthProvider>

    </Router>

);
