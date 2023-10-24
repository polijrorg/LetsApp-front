import React, { createContext, useContext, useEffect, useState } from 'react';

export type ProfileContextData = {
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
  mandatoryContactSelected: ContactInfo[];
  setMandatoryContactSelected: React.Dispatch<
    React.SetStateAction<ContactInfo[]>
  >;
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
  const [dateStart, setDateStart] = useState<Date>(null);
  const [dateEnd, setDateEnd] = useState<Date>(null);
  const [timeStart, setTimeStart] = useState<Date>(null);
  const [timeEnd, setTimeEnd] = useState<Date>(null);
  const [duration, setDuration] = useState<String>(null);
  const [timeSelectedStart, setTimeSelectedStart] = useState<string>(null);
  const [timeSelectedEnd, setTimeSelectedEnd] = useState<string>(null);
  const [contactSelected, setContactSelected] = useState<ContactInfo[]>([]);
  const [mandatoryContactSelected, setMandatoryContactSelected] = useState<
    ContactInfo[]
  >([]);

  useEffect(() => {}, [
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
        mandatoryContactSelected,
        setMandatoryContactSelected,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default () => useContext(ProfileContext);
