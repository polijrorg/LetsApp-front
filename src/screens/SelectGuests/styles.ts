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
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${theme.colors.primary.main};
`;

export const IconBack = styled.Image`
  width: 28px;
  height: 28px;
  margin-right: 24%;
  color: ${theme.colors.highEmphasis};
`;

export const ContainerSearch = styled.View`
  height: 48px;
  margin-top: 20px;
  padding: 4px 8px 4px 4px;
  background-color: #f0f0f0;
  border-radius: 8px;
  flex-direction: row;
`;

export const ContainerIcon = styled.View`
  align-items: center;
  justify-content: center;
  margin: 0px 8px 0px 8px;
`;

export const IconSearch = styled.Image`
  width: 16px;
  height: 16px;
`;

export const InputSearch = styled.TextInput`
  font-size: 16px;
  flex: 1;
`;

export const ContainerEmail = styled.View`
  height: 40px;
  margin-top: 8px;
  padding: 4px 8px 4px 4px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.lowEmphasis};
  background-color: ${theme.colors.background};
  flex-direction: row;
`;

export const IconEmail = styled.Image`
  width: 20px;
  height: 20px;
`;

export const IconSend = styled.Image`
  width: 16px;
  height: 16px;
`;

export const InputEmail = styled.TextInput`
  font-size: 16px;
  flex: 1;
`;

export const Scroll = styled.ScrollView`
  margin-top: 8px;
  height: 80%;
`;

export const ContainerSubtitle = styled.View`
  /* flex: 1; */
  height: 40px;
  padding-right: 8%;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.divider};
  align-items: center;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: ${theme.colors.lowEmphasis};
`;

export const Mandatory = styled.Text`
  font-size: 10px;
  color: ${theme.colors.highEmphasis};
`;