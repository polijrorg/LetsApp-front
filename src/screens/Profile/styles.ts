import { theme } from '@styles/default.theme';
import styled from 'styled-components/native';

export const Body = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${theme.colors.background};
  display: flex;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6%;
`;

export const Icon = styled.Image`
  width: 124px;
  height: 112px;
`;

export const IconBack = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 22%;
`;

export const ContainerInput = styled.View`
  justify-content: center;
  align-items: flex-start;
`;

export const NameInput = styled.Text`
  font-size: 14px;
  color: ${theme.colors.lowEmphasis};
  text-transform: uppercase;
  font-weight: 700;
  margin-top: 2%;
  margin-bottom: 2%;
  font-family: 'Roboto';
`;

export const ContainerAdd = styled.View`
  flex-direction: row;
  width: 90%;
  align-items: center;
  justify-content: center;
  margin-bottom: 4%;
`;

export const Line = styled.View`
  width: 100%;
  height: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.lowEmphasis};
  margin-bottom: 8px;
`;

export const IconAdd = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

export const TextAdd = styled.Text`
  font-size: 14px;
  /* font-weight: 700; */
  color: ${theme.colors.highEmphasis};
  text-transform: uppercase;
  font-family: 'RobotoBold';
`;

export const ContainerDelete = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 8%;
  margin-bottom: 4%;
`;

export const Delete = styled.Text`
  font-size: 14px;
  color: #f10e0e;
  margin-right: 8px;
  text-transform: uppercase;
  font-family: 'Roboto';
`;

export const IconDelete = styled.Image`
  width: 24px;
  height: 24px;
`;

export const SmallCircleRight = styled.View`
  width: 208px;
  height: 208px;
  border-radius: 30000px;
  position: absolute;
  top: -104px;
  right: 280px;
  background-color: ${theme.colors.primary.main};
`;

export const SmallTop = styled.View`
  width: 104px;
  height: 104px;
  border-radius: 30000px;
  position: absolute;
  top: -54px;
  right: 240px;
  background-color: ${theme.colors.primary.light};
`;
