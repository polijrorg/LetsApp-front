import { theme } from '@styles/default.theme';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  image: boolean;
}

export const Body = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${theme.colors.background};
  display: flex;
`;

export const ProfileContainer = styled(TouchableOpacity)`
  width: 120px;
  height: 120px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 18%;
`;

export const Icon = styled(Image)<Props>`
  width: 112px;
  height: 112px;
  border-radius: 78px;
  border: 6px solid
    ${({ image }) =>
      image ? theme.colors.primary.main : theme.colors.lightGrey};
`;

export const IconBack = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 22%;
`;

export const PencilIcon = styled.Image``;

export const PencilIconCircle = styled.View`
  height: 32px;
  width: 32px;
  border-radius: 16px;
  background-color: ${theme.colors.primary.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 24px;
  right: 0px;
`;

export const IconBackContainer = styled.View`
  position: absolute;
  top: 40px;
  left: 32px;
`;

export const ContainerInput = styled.View`
  justify-content: center;
  align-items: flex-start;
`;

export const InputAndXContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FlexibleInputContainer = styled.View`
  flex: 1;
`;

export const EditInput = styled(TouchableOpacity)`
  width: 100%;
`;

export const InvisibleNotEditableIcon = styled.View`
  height: 24px;
  width: 24px;
  margin: 4px;
`;

export const NotEditableIcon = styled.Image`
  height: 24px;
  width: 24px;
  margin: 4px;
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
  border-bottom-color: ${theme.colors.divider};
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
  margin-top: 12%;
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
  top: -103px;
  right: 280px;
  background-color: ${theme.colors.primary.main};
  shadow-color: '#000';
  shadow-offset: 3px 5px;
  shadow-opacity: 0.2;
  elevation: 2;
`;

export const SmallTop = styled.View`
  width: 104px;
  height: 104px;
  border-radius: 30000px;
  position: absolute;
  top: -54px;
  right: 240px;
  background-color: ${theme.colors.primary.light};
  shadow-color: '#000';
  shadow-offset: 3px 5px;
  shadow-opacity: 0.2;
  elevation: 2;
`;

export const SmallBottom = styled.View`
  width: 104px;
  height: 104px;
  border-radius: 30000px;
  position: absolute;
  bottom: -76px;
  left: 320px;
  background-color: ${theme.colors.primary.light};
  shadow-color: '#000';
  shadow-offset: 3px 5px;
  shadow-opacity: 0.2;
  elevation: 2;
`;

export const Gap = styled.View`
  width: 100%;
  height: 32px;
`;
