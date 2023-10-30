import React, { createContext, useState } from 'react';

type UserContextType = {
  userId?: string;
  setUserId?: (userId: string) => void;
  photo?: string | undefined;
  setPhoto?: (photo: string) => void;
};

export const UserContext = createContext<UserContextType>({
  userId: '',
  setUserId: () => {},
  photo: '',
  setPhoto: () => {},
});

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({
  children,
}: UserProviderProps): React.ReactElement => {
  const [userId, setUserId] = useState('');
  const [photo, setPhoto] = useState<string | undefined>();

  return (
    <UserContext.Provider value={{ userId, setUserId, photo, setPhoto }}>
      {children}
    </UserContext.Provider>
  );
};
