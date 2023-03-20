import { theme } from '@styles/default.theme';
import styled from 'styled-components/native';

export const Body = styled.View`
  flex: 1;
  padding: 24px;
  background-color: ${theme.colors.background};
  align-items: center;
`;

export const Logo = styled.Image`
  width: 121px;
  height: 119px;
  margin-top: 40%;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: ${theme.colors.primary.main};
`;

export const Descrition = styled.Text`
  text-align: center;
  font-size: 16px;
  color: ${theme.colors.highEmphasis};
  margin-top: 16px;
  margin-bottom: 32px;
`;

export const Gallery = styled.Image`
  width: 90px;
  height: 90px;
  margin-bottom: 16px;
`;

export const Empty = styled.View`
  width: 0px;
  height: 0px;
  margin-bottom: 24px;
`;

export const SmallCircleLeft = styled.View`
  width: 208px;
  height: 208px;
  border-radius: 30000px;
  position: absolute;
  bottom: -104px;
  left: -104px;
  background-color: ${theme.colors.primary.main};
`;

export const SmallCircleRight = styled.View`
  width: 208px;
  height: 208px;
  border-radius: 30000px;
  position: absolute;
  top: -104px;
  right: -104px;
  background-color: ${theme.colors.primary.main};
`;

export const SmallTop = styled.View`
  width: 104px;
  height: 104px;
  border-radius: 30000px;
  position: absolute;
  top: -54px;
  right: 72px;
  background-color: ${theme.colors.primary.light};
`;
