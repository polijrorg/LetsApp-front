import User from '@interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserServices from '@services/UserServices';
import UserService, { IDeleteUserRequest } from '@services/UserServices';
import { api } from '@services/api';
import { AxiosResponse } from 'axios';
import React, { useContext, useState, createContext, useEffect } from 'react';

export interface IRegisterRequest {
  phone: string;
}

interface AuthContextData {
  user: User | null;
  phone: string | null;
  register: (data: IRegisterRequest) => Promise<void>;
  updateUser: () => Promise<void>;
  deleteUser: (data: IDeleteUserRequest) => Promise<void>;
  deleteAsyncStorage: () => Promise<void>;
  loading: boolean;
  addNameAndImage: (data: FormData) => Promise<void>;
  initialUser: User | null;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{
  children?: React.ReactNode | undefined;
}> = ({ children }) => {
  const [initialUser, setInitialUser] = useState<User | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user data on mount
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const [userStorage, phoneStorage] = await Promise.all([
          AsyncStorage.getItem('letsApp:user'),
          AsyncStorage.getItem('letsApp:phone'),
        ]);

        if (userStorage) {
          const parsedUser = JSON.parse(userStorage);
          setUser(parsedUser);
        }

        if (phoneStorage) {
          setPhone(phoneStorage);
        }
      } catch (error) {
        console.error('Error loading stored data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredData();
  }, []); // Run only once on mount

  const register = async (data: IRegisterRequest): Promise<void> => {
    try {
      console.log("*** register chamado ***", data);
      const response = await UserService.register(data);

      if (!response) {
        throw new Error('No response from server');
      }

      // Store the initial user data and phone
      setInitialUser(response);
      setPhone(response.phone);

      await AsyncStorage.setItem('letsApp:phone', response.phone);
      // Do not return anything to match Promise<void>
    } catch (error) {
      console.error('Register error:', error);
      throw new Error((error as Error).message);
    }
  };

  const deleteUser = async (data: IDeleteUserRequest) => {
    try {
      await UserService.deleteUser(data);
      await AsyncStorage.multiRemove(['letsApp:user', 'letsApp:phone']);

      setUser(null);
      setPhone(null);
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  };

  const updateUser = async () => {
    try {
      if (!user?.phone && !phone) {
        throw new Error('No phone number available');
      }

      const phoneToUse = user?.phone || phone;
      console.log(phoneToUse)
      const response = await api.get(`GetUserByPhone/${phoneToUse}`);

      if (response.data && response.data.id) {
        // The API returns user data directly in response.data
        setUser(response.data);
        await AsyncStorage.setItem(
          'letsApp:user',
          JSON.stringify(response.data)
        );
      } else {
        throw new Error('No user data received');
      }
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  const addNameAndImage = async (data: FormData): Promise<void> => {
    try {
      const response = await UserServices.addNameAndImage(data);

      // Validate response before storing
      if (!response) {
        throw new Error('No response from server');
      }

      console.log('addNameAndImage response:', response);

      // Create updated user object
      const updatedUser = {
        ...user,
        ...response,
        // Ensure we keep the phone if it's not in the response
        phone: response.phone || user?.phone || phone,
      };

      setUser(updatedUser);
      
      // Only store if we have valid data
      if (updatedUser && Object.keys(updatedUser).length > 0) {
        await AsyncStorage.setItem('letsApp:user', JSON.stringify(updatedUser));
      }

      // Do not return anything to match Promise<void>
    } catch (error) {
      console.error('addNameAndImage error:', error);
      throw error;
    }
  };

  const deleteAsyncStorage = async () => {
    try {
      await AsyncStorage.multiRemove(['letsApp:user', 'letsApp:phone']);
      setUser(null);
      setPhone(null);
    } catch (error) {
      console.error('Clear storage error:', error);
      throw error;
    }
  };

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