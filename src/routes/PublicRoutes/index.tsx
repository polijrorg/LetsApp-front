import { ModalCard } from '@components/Modal';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Autentication from '@screens/Autentication';
import CreateEvent from '@screens/CreateEvent';
import DateAndSchedule from '@screens/DateAndSchedule';
import InitialData from '@screens/InitialData';
import MainScreen from '@screens/MainScreen';
import Profile from '@screens/Profile';
import ScreenEvent from '@screens/ScreenEvent';
import ScreenInvite from '@screens/ScreenInvite';
import SelectGuests from '@screens/SelectGuests';
import SuggestSchedule from '@screens/SuggestSchedule';
import VerificationCode from '@screens/VerificationCode';
import React from 'react';

export type RootStackParamList = {
  Autentication: undefined;
  VerificationCode: undefined;
  InitialData: undefined;
  ModalCard: undefined;
  MainScreen: undefined;
  Profile: undefined;
  ScreenInvite: undefined;
  SelectGuests: undefined;
  DateAndSchedule: undefined;
  SuggestSchedule: undefined;
  CreateEvent: undefined;
  ScreenEvent: undefined;
};
const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export type AppNavigatorRoutesProps =
  BottomTabNavigationProp<RootStackParamList>;

const PublicRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Autentication" component={Autentication} />
      <Screen name="VerificationCode" component={VerificationCode} />
      <Screen name="InitialData" component={InitialData} />
      <Screen name="ModalCard" component={ModalCard} />
      <Screen name="MainScreen" component={MainScreen} />
      <Screen name="Profile" component={Profile} />
      <Screen name="ScreenInvite" component={ScreenInvite} />
      <Screen name="SelectGuests" component={SelectGuests} />
      <Screen name="DateAndSchedule" component={DateAndSchedule} />
      <Screen name="SuggestSchedule" component={SuggestSchedule} />
      <Screen name="CreateEvent" component={CreateEvent} />
      <Screen name="ScreenEvent" component={ScreenEvent} />
    </Navigator>
  );
};
export default PublicRoutes;
