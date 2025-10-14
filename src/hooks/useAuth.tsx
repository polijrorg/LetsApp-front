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

      console.log("*** register response ***", JSON.stringify(response, null, 2));

      if (!response) {
        throw new Error('No response from server');
      }

      // Use the phone from the request data if response doesn't have it
      const phoneToStore = response.phone || data.phone;
      
      if (!phoneToStore) {
        throw new Error('No phone number available in response or request');
      }

      // Store the initial user data and phone
      setInitialUser(response);
      setPhone(phoneToStore);

      await AsyncStorage.setItem('letsApp:phone', phoneToStore);
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
      console.log('📞 Fetching user with phone:', phoneToUse);
      
      const response = await api.get(`GetUserByPhone/${phoneToUse}`);
      
      console.log('📦 API Response:', JSON.stringify(response.data, null, 2));

      // Handle different response structures
      let userData = null;
      
      if (response.data?.user) {
        // Response has nested user object
        userData = response.data.user;
      } else if (response.data?.id) {
        // Response is the user object directly
        userData = response.data;
      } else if (response.data) {
        // Fallback: try to use response.data as-is
        console.log('⚠️ Unexpected response structure');
        userData = response.data;
      }

      if (userData && (userData.id || userData.phone)) {
        setUser(userData);
        await AsyncStorage.setItem(
          'letsApp:user',
          JSON.stringify(userData)
        );
        console.log('✅ User updated successfully');
      } else {
        console.error('❌ Invalid user data structure:', response.data);
        throw new Error('No user data received');
      }
    } catch (error) {
      console.error('Update user error:', error);
      
      // Provide more specific error information
      if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        throw new Error('Network connection failed. Please check your internet connection.');
      } else if (error.response?.status === 404) {
        throw new Error('User not found. Please try logging in again.');
      } else if (error.response?.status >= 500) {
        throw new Error('Server error. Please try again later.');
      } else {
        throw error;
      }
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