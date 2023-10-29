import { theme } from '@styles/default.theme';
import { View } from 'react-native';
import styled from 'styled-components/native';

type ContactProps = {
  isSelected: boolean;
};

export const ContainerContact = styled.TouchableOpacity<ContactProps>`
  width: 100%;
  height: 60px;
  padding: 0px 16px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.divider};
  background-color: ${(props) => (props.isSelected ? '#f0f0f0' : '#FAFAFA')};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContainerIcon = styled(View)`
  align-items: center;
  margin-right: 12px;
`;

export const Icon = styled.Image`
  width: 48px;
  height: 48px;
  margin-right: 12px;
`;

export const Data = styled(View)`
  display: flex;
  justify-content: space-between;
  padding: 2px 0px;
`;

export const Name = styled.Text`
  font-size: 16px;
  font-family: 'Roboto';
  color: ${theme.colors.highEmphasis};
`;

export const PhoneOrEmail = styled.Text`
  color: ${theme.colors.lowEmphasis};
  font-size: 12px;
  font-family: 'RobotoLight';
  line-height: 20px;
  letter-spacing: 0.25px;
`;

export const ContentWrapper = styled(View)`
  flex-direction: row;
`;
