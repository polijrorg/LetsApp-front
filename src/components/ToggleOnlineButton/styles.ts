import { theme } from '@styles/default.theme';
import { View } from 'react-native';
import styled from 'styled-components/native';

type InviteProps = {
  online: boolean;
};

export const ContainerEvent = styled(View)`
  flex-direction: row;
  margin-top: 42px;
`;

export const ContainerNameTypeP = styled(View)<InviteProps>`
  background-color: ${({ online }) =>
    online ? theme.colors.white : theme.colors.primary.main};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  min-width: 104px;
  padding: 4px 8px;
`;

export const NameTypeP = styled.Text<InviteProps>`
  font-size: 16px;
  font-family: 'RobotoMedium';
  color: ${(props) =>
    props.online ? theme.colors.lowEmphasis : theme.colors.background};
`;

export const ContainerNameTypeO = styled.View<InviteProps>`
  background-color: ${({ online }) =>
    online ? theme.colors.primary.main : theme.colors.white};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  min-width: 104px;
  margin-left: 12px;
`;

export const NameTypeO = styled.Text<InviteProps>`
  font-size: 16px;
  font-family: 'RobotoMedium';
  padding: 4px 8px;
  color: ${(props) =>
    props.online ? theme.colors.background : theme.colors.lowEmphasis};
`;
