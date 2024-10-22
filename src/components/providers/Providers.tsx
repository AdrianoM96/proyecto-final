'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { registerUser, login, verifyToken, logOut } from '@/actions';
import { User } from '@/interfaces/user';
import Cookies from 'js-cookie';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  signUp: (user: User) => Promise<void>;
  signIn: (user: User) => Promise<void>;
  logout: () => void;
  errorsProvider: string | null;
  setErrors: (error: string | null) => void;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Error en context Auth');
  }
  return context;
};

export const Providers = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errorsProvider, setErrors] = useState<string | null>(null);

  const signUp = async (user: User) => {
    try {
      const resp = await registerUser(user);
      
      if (!resp.ok) {
        setErrors(resp.message);
        return;
      }
      Cookies.set('token', resp.registerRequest.token);
      setUser(resp.registerRequest.user);
      setIsAuthenticated(true);
      setErrors(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors(error.message);
      } else {
        setErrors('Ocurrió un error inesperado');
      }
      setIsAuthenticated(false);
    }
  };

  const signIn = async (user: User) => {
    try { 
      const resp = await login(user);
      
      if (!resp.ok) {
        setErrors(resp.message);
        return;
      }
      Cookies.set('token', resp.loginRequest.token);
      setUser(resp.loginRequest.user);
      setIsAuthenticated(true);
      setErrors(null);
    } catch (error) {
      console.error(error);
      setErrors('Ocurrió un error al iniciar sesión');
      setIsAuthenticated(false);
    }
  };
  
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
    setErrors(null);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await verifyToken(token);
        if (!res) {
          setIsAuthenticated(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.verifyTokenRequest.user);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <PayPalScriptProvider options={{ 
      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
      intent: 'capture',
      currency: 'USD',
    }}>
      <AuthContext.Provider value={{ 
        signUp,
        signIn,
        logout, 
        user,
        setUser,
        setIsAuthenticated, 
        isAuthenticated,
        errorsProvider,
        setErrors,
      }}>
        {children}
      </AuthContext.Provider>
    </PayPalScriptProvider>
  );
};