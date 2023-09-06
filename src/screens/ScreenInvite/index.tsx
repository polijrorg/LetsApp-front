import * as S from './styles';
import Button from '@components/Button';
import { StatusBar } from 'expo-status-bar';
import moment from 'moment';
import 'moment/locale/pt-br';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export type CardsInviteProps = {
  event: 'online' | 'presencial';
  navigation: any;
  route: any;
};

const IconArrow = require('../../assets/ArrowBackBlue.png');
const Office = require('../../assets/Office.png');
const online = require('../../assets/OnlineEvent.png');
const presencial = require('../../assets/PresencialEvent.png');
const calendar = require('../../assets/CalendarIcon.png');

const ScreenInvite: React.FC<CardsInviteProps> = ({ route, navigation }) => {
  const { name, image, adress, date, event, descrition, beginHour, endHour } =
    route.params;

  const formattedDate = moment(date, 'DD/MM/YYYY')
    .locale('pt-br')
    .format('ddd');

  return (
    <S.Body>
      <StatusBar hidden={true} />
      <S.Back source={Office}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MainScreen');
          }}
        >
          <S.IconBack source={IconArrow} />
        </TouchableOpacity>
        <S.Header>
          <S.ContainerContent>
            <S.Image source={image} />
            <S.Name>Convidado por {name}</S.Name>
          </S.ContainerContent>
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
                    {formattedDate.replace(/^\w/, (c) =>
                      c.toUpperCase()
                    )} - {date.substring(0, 5)}
                  </S.LocalandDate>
                  <S.Date>
                    {/* {beginHour.substring(0, 5)}h - {endHour.substring(0, 5)}h */}
                  </S.Date>
                </S.Adjust>
              </S.Row>
            </S.Column>
            <S.Schedule>Sugerir um novo horário</S.Schedule>
          </S.ContainerContent>
          <S.Line />
          <S.ContainerDescrition>
            <S.Descrition>Descrição</S.Descrition>
          </S.ContainerDescrition>
          <S.Scroll>
            <S.Content>{descrition}</S.Content>
          </S.Scroll>
          <S.Buttons>
            <Button
              width="136px"
              backgroundColor="#FAFAFA"
              borderColor="#949494"
              hasIcon={false}
              icon={Office}
              title="Recusar"
              titleColor="#949494"
            />
            <Button
              width="136px"
              backgroundColor="#3446E4"
              borderColor="transparent"
              hasIcon={false}
              icon={Office}
              title="Aceitar"
              titleColor="#FAFAFA"
            />
          </S.Buttons>
        </S.Header>
      </S.Back>
    </S.Body>
  );
};

export default ScreenInvite;
