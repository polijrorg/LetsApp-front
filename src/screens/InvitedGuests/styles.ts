import { theme } from '@styles/default.theme';
import { SafeAreaView, View } from 'react-native';
import styled from 'styled-components/native';

export const MainWrapper = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background};
  display: flex;
`;

export const Body = styled(View)`
  flex: 1;
  padding: 16px 20px 0px 20px;
  background-color: ${theme.colors.background};
  display: flex;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  width: 100%;
  padding-right: 56px;
  text-align: center;
  color: ${theme.colors.primary.main};
  font-family: 'Roboto';
`;

export const IconBack = styled.Image`
  width: 28px;
  height: 28px;
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
  font-family: 'Roboto';
`;

export const ContainerEmail = styled.View`
  height: 40px;
  margin-top: 8px;
  padding: 4px 8px 4px 4px;
  /* border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.lowEmphasis}; */
  border-radius: 8px;
  border-width: 1px;
  border-color: ${theme.colors.lowEmphasis};
  background-color: ${theme.colors.background};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const IconEmail = styled.Image`
  width: 20px;
  height: 20px;
`;

export const IconSend = styled.Image`
  width: 16px;
  height: 16px;
`;

export const Email = styled.View`
  align-items: center;
  justify-content: center;
`;

export const AddContact = styled.Text`
  font-size: 16px;
  font-family: 'Roboto';
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
  font-family: 'Roboto';
`;

export const EmptyText = styled.Text`
  font-size: 12px;
  letter-spacing: 0.5px;
  color: ${theme.colors.lowEmphasis};
  font-family: 'RobotoLight';
  padding: 12px 4px;
`;

export const Mandatory = styled.Text`
  font-size: 10px;
  color: ${theme.colors.highEmphasis};
  font-family: 'Roboto';
`;

export const IconCheck = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  position: absolute;
  top: 90%;
  right: 10%;
`;

export const Check = styled.Image`
  width: 48px;
  height: 48px;
`;
