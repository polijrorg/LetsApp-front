import User from '@interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '@services/UserServices';
import React, { useContext, useState, createContext, useEffect } from 'react';

interface IRegisterRequest {
  phone: string;
}

interface AuthContextData {
  user: User;
  phone: string;
  register: (data: IRegisterRequest) => Promise<void>;
  deleteUser: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{
  children?: React.ReactNode | undefined;
}> = ({ children }) => {
  const [user, setUser] = useState({} as User);
  const [phone, setPhone] = useState<string>();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getUserData = async () => {
  //     const { '@letsApp:userId': userId } = parseCookies();
  //     const response = await UserService.getUserById(userId);
  //     setUser(response);
  //   };
  //   getUserData();
  // }, []);

  const register = async (data: IRegisterRequest) => {
    try {
      console.log('entrou aqui');
      const response = await UserService.register(data);

      setUser(response);
      setPhone(response.phone);

      await AsyncStorage.setItem('letsApp:phone', response.phone);
      await AsyncStorage.setItem('letsApp:user', JSON.stringify(response));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const deleteUser = async () => {
    const response = await UserService.deleteUser(data);
    await AsyncStorage.clear();

    setUser(null);
    setPhone(null);
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getUser = async () => {
      const userStorage = JSON.parse(
        await AsyncStorage.getItem('letsApp:user')
      );
      const phoneStorage = await AsyncStorage.getItem('letsApp:phone');

      if (userStorage) setUser(userStorage);
      if (phoneStorage) setPhone(phoneStorage);

      setLoading(false);
    };

    if (!user || !phone) getUser();
    else setLoading(false);
  });

  return (
    <AuthContext.Provider
      value={{ user, phone, register, deleteUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default () => useContext(AuthContext);
