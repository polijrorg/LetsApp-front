import { theme } from '@styles/default.theme';
import { Modal } from 'react-native';
import styled from 'styled-components/native';

type TypeProps = {
  type: 'Number' | 'Account';
};

export const ModalContainer = styled(Modal)``;

export const ModalView = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(39, 39, 39, 0.8);
`;

export const ContentContainer = styled.View`
  width: 336px;
  border-radius: 24px;
  padding: 20px;
  background-color: ${theme.colors.White};
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text<TypeProps>`
  font-size: 20px;
  color: ${(props) => (props.type === 'Account' ? '#f10e0e' : '#727FF6')};
  font-weight: 700;
  margin-bottom: 5%;
`;

export const ContainerDescrition = styled.View<TypeProps>`
  display: ${(props) => (props.type === 'Number' ? 'none' : 'flex')};
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const ContainerInputs = styled.View`
  flex-direction: row;
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
  margin-top: 24px;
  width: 100%;
  justify-content: space-evenly;
`;

export const Descrtion = styled.Text`
  font-size: 16px;
`;
