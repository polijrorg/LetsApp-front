import { theme } from '@styles/default.theme';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const ContainerCard = styled(TouchableOpacity)`
  height: 90px;
  padding: 0px 12px;
  margin: 0px;
  border-radius: 8px;
  border-top-width: 1px;
  border-top-color: ${theme.colors.divider};
  background-color: ${theme.colors.background};
  align-items: center;
  flex-direction: row;
`;

export const ContainerContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ContainerContentData = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 16px;
`;

export const InfoWrapper = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
  padding: 12px 0px 12px 24px;
  height: 100%;
`;

export const Image = styled.Image`
  width: 52px;
  height: 52px;
`;

export const Name = styled.Text`
  font-size: 16px;
  font-family: 'Roboto';
`;

export const Adress = styled.Text`
  font-size: 12px;
  color: ${theme.colors.mediumEmphasis};
  font-family: 'Roboto';
`;

export const Date = styled.Text`
  font-size: 12px;
  color: ${theme.colors.mediumEmphasis};
  font-family: 'Roboto';
`;

export const IconDate = styled.Image`
  width: 14px;
  height: 14px;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.Image`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
`;
