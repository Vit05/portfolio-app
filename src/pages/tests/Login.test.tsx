import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {AuthProvider} from '../../context/AuthContext.tsx';
import {Login} from '../Login.tsx';
import {MemoryRouter} from "react-router-dom";


describe("Login Form tests", () => {
    it('renders login form', () => {
        render(
            <AuthProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthProvider>
        );

        expect(screen.getByText("Username")).toBeInTheDocument();
        expect(screen.getByText("Password")).toBeInTheDocument();
    });

    it('allows the user to enter a username and password', async () => {

        render(
            <AuthProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthProvider>
        );

        const usernameInput = screen.getByLabelText(/Username/i);
        const passwordInput = screen.getByLabelText(/Password/i);

        // Simulate entering text into the input fields
        fireEvent.change(usernameInput, { target: { value: 'user1' } });
        fireEvent.change(passwordInput, { target: { value: 'password1' } });

        expect(usernameInput).toHaveValue('user1');
        expect(passwordInput).toHaveValue('password1');
    });


    it('displays error message for invalid credentials', async () => {
        render(
            <AuthProvider>
                <MemoryRouter>
                     <Login />
                </MemoryRouter>
            </AuthProvider>
        );

        const usernameInput = screen.getByLabelText(/Username/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const loginButton = screen.getByRole('button', { name: /Login/i });

        fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
        fireEvent.click(loginButton);

        expect(await screen.findByText("Invalid username or password")).toBeInTheDocument();
    });
})