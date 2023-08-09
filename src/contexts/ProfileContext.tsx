/* eslint-disable react/react-in-jsx-scope */
import { createContext, ReactNode, useEffect, useState } from 'react';

export type ProfileContextDataProps = {
  phoneUser: string;
  setPhoneUser: React.Dispatch<React.SetStateAction<string>>;
  nameUser: string;
  setNameUser: React.Dispatch<React.SetStateAction<string>>;
  imageOfUser: string;
  setImageOfUser: React.Dispatch<React.SetStateAction<string>>;
  dateStart: Date;
  setDateStart: React.Dispatch<React.SetStateAction<Date>>;
  dateEnd: Date;
  setDateEnd: React.Dispatch<React.SetStateAction<Date>>;
  timeStart: Date;
  setTimeStart: React.Dispatch<React.SetStateAction<Date>>;
  timeEnd: Date;
  setTimeEnd: React.Dispatch<React.SetStateAction<Date>>;
  duration: String;
  setDuration: React.Dispatch<React.SetStateAction<String>>;
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
  const [dateStart, setDateStart] = useState<Date>(null);
  const [dateEnd, setDateEnd] = useState<Date>(null);
  const [timeStart, setTimeStart] = useState<Date>(null);
  const [timeEnd, setTimeEnd] = useState<Date>(null);
  const [duration, setDuration] = useState<String>(null);

  useEffect(() => {
    console.log('UP', phoneUser, nameUser);
  }, [
    phoneUser,
    nameUser,
    imageOfUser,
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    duration,
  ]);

  return (
    <ProfileContext.Provider
      value={{
        nameUser,
        setNameUser,
        phoneUser,
        setPhoneUser,
        imageOfUser,
        setImageOfUser,
        dateStart,
        setDateStart,
        dateEnd,
        setDateEnd,
        timeStart,
        setTimeStart,
        timeEnd,
        setTimeEnd,
        duration,
        setDuration,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
