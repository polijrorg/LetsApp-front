import { User } from '@interfaces/User';
import UserService from '@services/UserServices';
import { api } from '@services/api';
import { destroyCookie, parseCookies } from 'nookies';
import React, { useContext, useState, createContext, useEffect } from 'react';

interface IRegisterRequest {
  phone: string;
}

interface AuthContextData {
  user: User;
  register: (data: IRegisterRequest) => void;
  logout: () => void;
  setUser: (data: User) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({} as User);
  useEffect(() => {
    const getUserData = async () => {
      const { '@letsApp:userId': userId } = parseCookies();
      const response = await UserService.getUserById(userId);
      setUser(response);
    };
    getUserData();
  }, []);

  const register = async (data: IRegisterRequest) => {
    try {
      const response = await UserService.register(data);

      (api.defaults.headers as any).Authorization = `Bearer ${response.token}`;

      setUser(response.user);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const logout = () => {
    destroyCookie(undefined, '@letsApp:token');
    destroyCookie(undefined, '@letsApp:userId');
  };

  return (
    <AuthContext.Provider value={{ user, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default () => useContext(AuthContext);
