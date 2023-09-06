import { ModalCard } from '@components/Modal';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateEvent from '@screens/CreateEvent';
import DateAndSchedule from '@screens/DateAndSchedule';
import InvitedGuests from '@screens/InvitedGuests';
import MainScreen from '@screens/MainScreen';
import Profile from '@screens/Profile';
import ScreenEvent from '@screens/ScreenEvent';
import ScreenInvite from '@screens/ScreenInvite';
import SelectGuests from '@screens/SelectGuests';
import SuggestSchedule from '@screens/SuggestSchedule';
import React from 'react';

export type RootStackParamList = {
  CreateEvent: undefined;
  DateAndSchedule: undefined;
  MainScreen: undefined;
  Profile: undefined;
  ScreenEvent: undefined;
  ScreenInvite: undefined;
  SelectGuests: undefined;
  SuggestSchedule: undefined;
  ModalCard: undefined;
  InvitedGuests: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

function PrivateRoutes() {
  return (
    <Navigator
      initialRouteName="InvitedGuests"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="CreateEvent" component={CreateEvent} />
      <Screen name="DateAndSchedule" component={DateAndSchedule} />
      <Screen name="MainScreen" component={MainScreen} />
      <Screen name="Profile" component={Profile} />
      <Screen name="ScreenEvent" component={ScreenEvent} />
      <Screen name="ScreenInvite" component={ScreenInvite} />
      <Screen name="SelectGuests" component={SelectGuests} />
      <Screen name="SuggestSchedule" component={SuggestSchedule} />
      <Screen name="ModalCard" component={ModalCard} />
      <Screen name="InvitedGuests" component={InvitedGuests} />
    </Navigator>
  );
}

export default PrivateRoutes;
