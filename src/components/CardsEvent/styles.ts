import { theme } from '@styles/default.theme';
import styled from 'styled-components/native';

export const ContainerCard = styled.TouchableOpacity`
  height: 90px;
  padding: 12px;
  margin: 0px;
  border-radius: 8px;
  border-top-width: 1px;
  border-top-color: ${theme.colors.divider};
  background-color: ${theme.colors.background};
  justify-content: center;
`;

export const ContainerContent = styled.View`
  flex-direction: row;
`;

export const AddressView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ContainerContentData = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 16px;
  padding: 4px 0px;
`;

export const Image = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background-color: ${theme.colors.primary.dark};
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 8px 0px;
`;

export const Month = styled.Text`
  font-size: 16px;
  font-family: 'Roboto';
  color: ${theme.colors.white};
`;

export const Day = styled.Text`
  font-size: 16px;
  font-family: 'RobotoBold';
  color: ${theme.colors.white};
`;

export const Name = styled.Text`
  font-size: 16px;
  font-family: 'Roboto';
`;

export const Adress = styled.Text`
  font-size: 12px;
  color: ${theme.colors.highEmphasis};
  font-family: 'Roboto';
  margin-left: 4px;
`;

export const Date = styled.Text`
  font-size: 12px;
  color: ${theme.colors.highEmphasis};
  font-family: 'Roboto';
`;

export const IconDate = styled.Image`
  width: 14px;
  height: 14px;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
`;

export const IconAdress = styled.Image`
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
`;
