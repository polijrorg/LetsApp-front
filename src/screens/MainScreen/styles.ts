import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '@styles/default.theme';
import styled from 'styled-components/native';

type OptionProps = {
  Option: string;
};

export const Body = styled.View`
  background-color: ${theme.colors.background};
  display: flex;
  flex: 1;
  margin-top: 32px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const Icon = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;

export const Name = styled.Text`
  font-size: 26px;
`;

export const ContainerOptions = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 24px;
`;

export const OptionInvite = styled.TouchableOpacity<OptionProps>`
  width: 40%;
  border-bottom-width: 2px;
  border-bottom-color: ${(props) =>
    props.Option === 'invite' ? '#727FF6' : '#949494'};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const OptionEvents = styled.TouchableOpacity<OptionProps>`
  width: 40%;
  border-bottom-width: 2px;
  border-bottom-color: ${(props) =>
    props.Option === 'events' ? '#727FF6' : '#949494'};
  align-items: center;
`;

export const Events = styled.Text<OptionProps>`
  font-size: 20px;
  color: ${(props) => (props.Option === 'events' ? '#727FF6' : '#949494')};
  font-family: 'RobotoMedium';
  /* border: 2px solid red; */
`;

export const Invite = styled.Text<OptionProps>`
  font-size: 20px;
  color: ${(props) => (props.Option === 'invite' ? '#727FF6' : '#949494')};
  font-family: 'RobotoMedium';
  /* margin-right: 4px; */
`;

export const NumberInvites = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 32px;
  background-color: ${theme.colors.primary.dark};
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

export const Number = styled.Text`
  font-size: 12px;
  font-family: 'Roboto';
  color: ${theme.colors.white};
`;

export const ContainerScroll = styled.View`
  height: 100%;
`;

export const ScrollView = styled.ScrollView`
  height: 100%;
`;

export const ContainerInvite = styled.View`
  display: flex;
  flex-direction: column-reverse;
`;

export const ContainerEvent = styled.View`
  display: flex;
  flex-direction: column-reverse;
`;

export const IconMore = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  position: absolute;
  bottom: 56px;
  right: 12px;
`;

export const More = styled.Image`
  width: 48px;
  height: 48px;
`;

type Props = {
  today: boolean;
};

export const Container = styled.View`
  flex: 1;
  padding: 12px 24px;
  padding-top: 60px;
  background-color: ${theme.colors.background};
`;

export const EventButton = styled.TouchableOpacity`
  flex-direction: row;
  width: 130px;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.primary.main};
  border-radius: 8px;
  height: 40px;
  padding: 12px;
`;

export const ButtonText = styled.Text`
  height: 16px;
  color: ${theme.colors.background};
  font-size: 12px;
  text-transform: uppercase;
  font-family: 'Roboto';
`;

export const Divider = styled.View`
  margin-top: 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.primary.light};
`;

export const CalendarButton = styled.TouchableOpacity``;

export const CalendarIcon = styled(Ionicons)`
  size: 24px;
  color: ${theme.colors.primary.dark};
`;

export const DayContainer = styled.View<Props>`
  height: 64px;
  width: 40px;

  align-items: center;
  justify-content: space-between;

  ${({ today }) =>
    today &&
    `
      background-color: ${theme.colors.primary.main};
      border-radius: 16px;

    `}
`;

export const DayText = styled.Text`
  font-size: 12px;
  line-height: 20px;
  font-family: 'Roboto';
`;

export const Border = styled.View`
  width: 0;
  height: 40px;
  border-width: 2px;
  border-color: ${theme.colors.highEmphasis};
`;

export const CalendarImg = styled(MaterialCommunityIcons)`
  size: 14px;
  color: ${theme.colors.primary.dark};
`;

export const ContentContainer = styled.View`
  flex: 1;
  padding: 0 16px;
`;

export const ContentHeader = styled.View`
  align-self: flex-end;
  flex-direction: row;
`;

export const ChevronButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary.light};
  width: 40px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

export const ChevronIcon = styled(MaterialCommunityIcons)`
  size: 24px;
  color: ${theme.colors.white};
`;

export const DateTitle = styled.Text`
  font-size: 16px;
  font-weight: 70px;
  line-height: 19px;
  padding: 6px 0;
  font-family: 'Roboto';
`;

export const MarginBottom12px = styled.View`
  margin-bottom: 12px;
`;

export const MarginBottom24px = styled.View`
  margin-bottom: 18px;
`;

export const CompleteCalendarContainer = styled.View`
  width: 100%;
  padding-top: 12px;
  height: 316px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.primary.main};
`;

export const Month = styled.View`
  flex: 1;
`;

export const Week = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const MarginBottom6px = styled.View`
  margin-bottom: 6px;
`;

export const MarginTop6px = styled.View`
  margin-top: 6px;
`;

export const Calendar = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
