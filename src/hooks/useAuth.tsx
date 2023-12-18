import User from '@interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserServices from '@services/UserServices';
import UserService, { IDeleteUserRequest } from '@services/UserServices';
import { api } from '@services/api';
import React, { useContext, useState, createContext, useEffect } from 'react';

interface IRegisterRequest {
  phone: string;
}

interface AuthContextData {
  user: User;
  phone: string;
  register: (data: IRegisterRequest) => Promise<void>;
  updateUser: () => Promise<void>;
  deleteUser: (data: IDeleteUserRequest) => Promise<void>;
  deleteAsyncStorage: () => Promise<void>;
  loading: boolean;
  addNameAndImage: (data: FormData) => Promise<void>;
  initialUser: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{
  children?: React.ReactNode | undefined;
}> = ({ children }) => {
  const [initialUser, setInitialUser] = useState({} as User);
  const [user, setUser] = useState<User | null>(null);
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
      const response = await UserService.register(data);

      setInitialUser(response);
      setPhone(response.phone);

      await AsyncStorage.setItem('letsApp:phone', response.phone);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const deleteUser = async (data: IDeleteUserRequest) => {
    await UserService.deleteUser(data);
    await AsyncStorage.clear();

    setUser(null);
    setPhone(null);
    setLoading(false);
  };

  const updateUser = async () => {
    try {
      const response = await api.get(`GetUserByPhone/${user?.phone}`);
      setUser(response.data.user);
      await AsyncStorage.setItem(
        'letsApp:user',
        JSON.stringify(response.data.user)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addNameAndImage = async (data: FormData) => {
    const response = await UserServices.addNameAndImage(data);

    setUser(response);
    await AsyncStorage.setItem('letsApp:user', JSON.stringify(response));
  };

  const deleteAsyncStorage = async () => {
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
      value={{
        user,
        phone,
        register,
        deleteUser,
        updateUser,
        loading,
        initialUser,
        addNameAndImage,
        deleteAsyncStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default () => useContext(AuthContext);
