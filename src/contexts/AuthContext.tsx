
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Define user roles
export type UserRole = 'user' | 'hr' | 'leader' | 'co-leader' | 'admin';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  teamId?: string;
  avatar?: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: false,
  isAuthenticated: false,
});

// Mock users for demo
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@nhileteam.com',
    password: 'password',
    role: 'admin' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  },
  {
    id: '2',
    name: 'HR Manager',
    email: 'hr@nhileteam.com',
    password: 'password',
    role: 'hr' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hr',
  },
  {
    id: '3',
    name: 'Team Leader',
    email: 'leader@nhileteam.com',
    password: 'password',
    role: 'leader' as UserRole,
    teamId: '1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=leader',
  },
  {
    id: '4',
    name: 'Co-Leader',
    email: 'coleader@nhileteam.com',
    password: 'password',
    role: 'co-leader' as UserRole,
    teamId: '1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=coleader',
  },
  {
    id: '5',
    name: 'Regular User',
    email: 'user@nhileteam.com',
    password: 'password',
    role: 'user' as UserRole,
    teamId: '1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
  },
];

// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('nlt-user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('nlt-user');
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(user => user.email === email && user.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('nlt-user', JSON.stringify(userWithoutPassword));
      toast({
        title: 'Login successful',
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
      throw new Error('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('nlt-user');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
