import styled from 'styled-components/native';

type ButtonProps = {
  width: string;
  backgroundColor: string;
  borderColor: string;
  titleColor: string;
  hasIcon: boolean;
};

export const ContainerButton = styled.View<ButtonProps>`
  width: ${(props) => props.width};
  height: 32px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${(props) => props.borderColor};
  background-color: ${(props) => props.backgroundColor};
  justify-content: center;
  align-items: center;
`;

export const ContainerAll = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text<ButtonProps>`
  color: ${(props) => props.titleColor};
  font-size: 16px;
  letter-spacing: 1.25px;
  text-transform: uppercase;
`;

export const ContainerIcon = styled.View<ButtonProps>`
  display: ${(props) => (props.hasIcon ? 'flex' : 'none')};
  margin-right: 16px;
  width: 16px;
  height: 16px;
`;

export const Icon = styled.Image`
  width: 16px;
  height: 16px;
`;
