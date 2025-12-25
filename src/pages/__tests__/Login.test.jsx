import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Login from '../Login';
import * as AuthContextModule from '../../context/AuthContext';
import { LanguageProvider } from '../../context/LanguageContext';

// Mock useNavigate
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Page', () => {
    // Mock the useAuth hook
    const loginMock = vi.fn();
    
    beforeEach(() => {
        vi.spyOn(AuthContextModule, 'useAuth').mockImplementation(() => ({
            login: loginMock,
            user: null,
            loading: false
        }));
        loginMock.mockClear();
        mockNavigate.mockClear();
    });

  it('renders login form correctly', () => {
    render(
      <BrowserRouter>
        <LanguageProvider>
            <Login />
        </LanguageProvider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', () => {
    render(
      <BrowserRouter>
        <LanguageProvider>
            <Login />
        </LanguageProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  it('calls login function with correct data on submit', async () => {
    loginMock.mockReturnValue({ success: true });

    render(
      <BrowserRouter>
        <LanguageProvider>
            <Login />
        </LanguageProvider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    
    // Check if values updated (optional, implicit by successful submission test)
    
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
        expect(loginMock).toHaveBeenCalledWith('user@example.com', 'password123');
    });
  });

  it('navigates to home/dashboard on successful login', async () => {
    loginMock.mockReturnValue({ success: true });

    render(
      <BrowserRouter>
        <LanguageProvider>
            <Login />
        </LanguageProvider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
        // Default "from" is likely '/', depending on mock implementation of useLocation in test or if it wasn't mocked.
        // In the mock above I didn't mock useLocation fully in the global scope for this file, 
        // relying on the component using the real one or a basic one.
        // Wait, I did mock react-router-dom but only return navigate. 
        // Real BrowserRouter provides location.
        expect(mockNavigate).toHaveBeenCalled(); 
    });
  });

  it('displays error message on failed login', async () => {
    loginMock.mockReturnValue({ success: false, error: 'Invalid credentials' });

    render(
      <BrowserRouter>
        <LanguageProvider>
            <Login />
        </LanguageProvider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
        expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });
});
