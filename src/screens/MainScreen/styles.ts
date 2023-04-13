import { theme } from '@styles/default.theme';
import styled from 'styled-components/native';

type OptionProps = {
  Option: string;
};

export const Body = styled.View`
  flex: 1;
  padding: 24px;
  background-color: ${theme.colors.background};
  display: flex;
`;

export const Header = styled.View`
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
`;

export const Icon = styled.Image`
  width: 48px;
  height: 48px;
`;

export const Name = styled.Text`
  font-size: 36px;
`;

export const ContainerOptions = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 5%;
`;

export const OptionInvite = styled.TouchableOpacity<OptionProps>`
  width: 30%;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.Option === 'invite' ? '#727FF6' : '#949494'};
  align-items: center;
`;

export const OptionEvents = styled.TouchableOpacity<OptionProps>`
  width: 30%;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.Option === 'events' ? '#727FF6' : '#949494'};
  align-items: center;
`;

export const Events = styled.Text<OptionProps>`
  font-size: 20px;
  color: ${(props) => (props.Option === 'events' ? '#727FF6' : '#949494')};
`;

export const Invite = styled.Text<OptionProps>`
  font-size: 20px;
  color: ${(props) => (props.Option === 'invite' ? '#727FF6' : '#949494')};
`;

export const ContainerScroll = styled.ScrollView`
  height: 60%;
`;

export const ScrollView = styled.ScrollView`
  height: 60%;
`;

export const ContainerInvite = styled.View`
  display: flex;
`;

export const ContainerEvent = styled.View`
  display: flex;
`;

export const IconMore = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const More = styled.Image`
  width: 48px;
  height: 48px;
`;
