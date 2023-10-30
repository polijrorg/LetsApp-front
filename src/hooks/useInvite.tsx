import Contacts from '@interfaces/Contacts';
import Schedule from '@interfaces/Schedule';
import React, { useContext, useState, createContext } from 'react';

interface InviteContextData {
  dateStart: Date;
  setDateStart: React.Dispatch<React.SetStateAction<Date>>;
  dateEnd: Date;
  setDateEnd: React.Dispatch<React.SetStateAction<Date>>;
  timeStart: Date;
  setTimeStart: React.Dispatch<React.SetStateAction<Date>>;
  timeEnd: Date;
  setTimeEnd: React.Dispatch<React.SetStateAction<Date>>;
  duration: string;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  contactSelected: Contacts[];
  setContactSelected: React.Dispatch<React.SetStateAction<Contacts[]>>;
  mandatoryContactSelected: Contacts[];
  setMandatoryContactSelected: React.Dispatch<React.SetStateAction<Contacts[]>>;
  selectedSchedule: Schedule;
  setSelectedSchedule: React.Dispatch<React.SetStateAction<Schedule>>;
}

const InviteContext = createContext<InviteContextData>({} as InviteContextData);

export const InviteProvider: React.FC<{
  children?: React.ReactNode | undefined;
}> = ({ children }) => {
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [timeStart, setTimeStart] = useState();
  const [timeEnd, setTimeEnd] = useState();
  const [duration, setDuration] = useState();
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>();
  const [contactSelected, setContactSelected] = useState<Contacts[]>([]);
  const [mandatoryContactSelected, setMandatoryContactSelected] = useState<
    Contacts[]
  >([]);

  return (
    <InviteContext.Provider
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
        contactSelected,
        setContactSelected,
        mandatoryContactSelected,
        setMandatoryContactSelected,
        selectedSchedule,
        setSelectedSchedule,
      }}
    >
      {children}
    </InviteContext.Provider>
  );
};

export default () => useContext(InviteContext);
