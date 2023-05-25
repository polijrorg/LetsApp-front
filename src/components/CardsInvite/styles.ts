import { theme } from '@styles/default.theme';
import styled from 'styled-components/native';

export const ContainerCard = styled.View`
  height: 90px;
  padding: 12px;
  margin: 0px;
  border-radius: 8px;
  border-top-width: 1px;
  border-top-color: ${theme.colors.lowEmphasis};
  background-color: ${theme.colors.background};
  justify-content: center;
`;

export const ContainerContent = styled.View`
  flex-direction: row;
`;

export const ContainerContentData = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
`;

export const Image = styled.Image`
  width: 48px;
  height: 48px;
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

export const IconAdress = styled.Image`
  width: 14px;
  height: 14px;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
`;
