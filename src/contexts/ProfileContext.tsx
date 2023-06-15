/* eslint-disable react/react-in-jsx-scope */
import { createContext, ReactNode, useEffect, useState } from 'react';

export type ProfileContextDataProps = {
  phoneUser: string;
  setPhoneUser: React.Dispatch<React.SetStateAction<string>>;
  nameUser: string;
  setNameUser: React.Dispatch<React.SetStateAction<string>>;
  imageOfUser: string;
  setImageOfUser: React.Dispatch<React.SetStateAction<string>>;
};

type ProfileContextProviderProps = {
  children: ReactNode;
};

export const ProfileContext = createContext<ProfileContextDataProps>(
  {} as ProfileContextDataProps
);

export function ProfileContextProvider({
  children,
}: ProfileContextProviderProps) {
  const [phoneUser, setPhoneUser] = useState<string>(null);
  const [nameUser, setNameUser] = useState<string>(null);
  const [imageOfUser, setImageOfUser] = useState<string>(null);

  useEffect(() => {
    console.log('UP', phoneUser, nameUser);
  }, [phoneUser, nameUser, imageOfUser]);

  return (
    <ProfileContext.Provider
      value={{
        nameUser,
        setNameUser,
        phoneUser,
        setPhoneUser,
        imageOfUser,
        setImageOfUser,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
