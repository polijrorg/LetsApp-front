import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import moment from 'moment';
import 'moment/locale/pt-br';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

export type CardsInviteProps = {
  event: 'online' | 'presencial';
  navigation: any;
  route: any;
};

const IconArrow = require('../../assets/ArrowBackBlue.png');
const Office = require('../../assets/OfficeII.png');
const online = require('../../assets/OnlineEvent.png');
const presencial = require('../../assets/PresencialEvent.png');
const calendar = require('../../assets/CalendarIcon.png');
const Participants = require('../../assets/Participants.png');

const ScreenEvent: React.FC<CardsInviteProps> = ({ route, navigation }) => {
  const {
    nameEvent,
    event,
    adress,
    date,
    invites,
    confirmed,
    beginHour,
    endHour,
    description,
  } = route.params;

  // const [numberGuests] = useState(invites.length);
  const ajustDate = moment(date).format('DD/MM/YYYY');
  const formattedDate = moment(ajustDate, 'DD/MM/YYYY')
    .locale('pt-br')
    .format('ddd');
  console.log;
  console.log(ajustDate);

  return (
    <S.Body>
      <StatusBar hidden={true} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MainScreen');
        }}
      >
        <S.IconBack source={IconArrow} />
      </TouchableOpacity>
      <S.ContainerImage>
        <S.Image source={Office} />
      </S.ContainerImage>
      <S.Header>
        <S.Name>{nameEvent}</S.Name>
        <S.ContainerContent>
          <S.Column>
            <S.Row>
              <S.ContainerIcon>
                <S.IconAdress
                  source={event === 'online' ? online : presencial}
                />
              </S.ContainerIcon>
              <S.Adjust>
                <S.LocalandDate>São Paulo - SP</S.LocalandDate>
                <S.Adress>{adress}</S.Adress>
              </S.Adjust>
            </S.Row>
            <S.Row>
              <S.ContainerIcon>
                <S.IconDate source={calendar} />
              </S.ContainerIcon>
              <S.Adjust>
                <S.LocalandDate>
                  {' '}
                  {formattedDate.replace(/^\w/, (c) => c.toUpperCase())} -{' '}
                  {ajustDate.substring(0, 5)}
                </S.LocalandDate>
                <S.Date>
                  {/* {beginHour.substring(0, 5)}h - {endHour.substring(0, 5)}h */}
                </S.Date>
              </S.Adjust>
            </S.Row>
            <S.Row>
              <S.ContainerIcon>
                <S.IconDate source={Participants} />
              </S.ContainerIcon>
              <S.Adjust>
                <S.LocalandDate>{} Convidados</S.LocalandDate>
                <S.Confirmed>{confirmed}: Sim</S.Confirmed>
              </S.Adjust>
            </S.Row>
          </S.Column>
        </S.ContainerContent>
        <S.Line />
        <S.Scroll>
          <S.Content>{description}</S.Content>
        </S.Scroll>
      </S.Header>
    </S.Body>
  );
};

export default ScreenEvent;
