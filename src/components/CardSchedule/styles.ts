import styled from 'styled-components/native';

type ScheduleProps = {
  isSelected: boolean;
};

export const ContainerCard = styled.TouchableOpacity<ScheduleProps>`
  width: 72px;
  height: 80px;
  border-radius: 12px;
  background-color: ${(props) => (props.isSelected ? '#949494' : '#727FF6')};
  justify-content: center;
  align-items: center;
  margin: 0px 4px 40px 0px;
`;

export const Day = styled.Text`
  font-family: 'Roboto';
  font-size: 12px;
`;

export const Date = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  margin: 3px 0px 3px;
`;

export const Schedule = styled.Text`
  font-family: 'Roboto';
  font-size: 12px;
`;
