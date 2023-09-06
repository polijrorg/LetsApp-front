import React, { createContext, useContext, useEffect, useState } from 'react';

export type ProfileContextData = {
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
  timeSelectedStart: string;
  setTimeSelectedStart: React.Dispatch<React.SetStateAction<string>>;
  timeSelectedEnd: string;
  setTimeSelectedEnd: React.Dispatch<React.SetStateAction<string>>;
  contactSelected: ContactInfo[];
  setContactSelected: React.Dispatch<React.SetStateAction<ContactInfo[]>>;
};

export type ContactInfo = {
  email: string;
  name: string;
  phoneNumber: string;
};

const ProfileContext = createContext<ProfileContextData>(
  {} as ProfileContextData
);

export const ProfileContextProvider: React.FC<{
  children?: React.ReactNode | undefined;
}> = ({ children }) => {
  const [phoneUser, setPhoneUser] = useState<string>(null);
  const [nameUser, setNameUser] = useState<string>(null);
  const [imageOfUser, setImageOfUser] = useState<string>(null);
  const [dateStart, setDateStart] = useState<Date>(null);
  const [dateEnd, setDateEnd] = useState<Date>(null);
  const [timeStart, setTimeStart] = useState<Date>(null);
  const [timeEnd, setTimeEnd] = useState<Date>(null);
  const [duration, setDuration] = useState<String>(null);
  const [timeSelectedStart, setTimeSelectedStart] = useState<string>(null);
  const [timeSelectedEnd, setTimeSelectedEnd] = useState<string>(null);
  const [contactSelected, setContactSelected] = useState<ContactInfo[]>([]);

  useEffect(() => {}, [
    phoneUser,
    nameUser,
    imageOfUser,
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    duration,
    timeSelectedStart,
    timeSelectedEnd,
    contactSelected,
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
        timeSelectedStart,
        setTimeSelectedStart,
        timeSelectedEnd,
        setTimeSelectedEnd,
        contactSelected,
        setContactSelected,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default () => useContext(ProfileContext);
