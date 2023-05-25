import * as S from './styles';
import Button from '@components/Button';
import { StatusBar } from 'expo-status-bar';
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
  const { name, image, adress, event } = route.params;

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
                  <S.LocalandDate> Seg - 01/02</S.LocalandDate>
                  <S.Date>16h00 - 18h00</S.Date>
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
            <S.Content>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sem
              arcu, malesuada vel orci et, mattis tincidunt enim. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed sem arcu,
              malesuada vel orci et, mattis tincidunt enim. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed sem arcu, malesuada vel
              orci et, mattis tincidunt enim. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed sem arcu, malesuada vel orci et,
              mattis tincidunt enim. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed sem arcu, malesuada vel orci et, mattis
              tincidunt enim. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Sed sem arcu, malesuada vel orci et, mattis tincidunt enim.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sem
              arcu, malesuada vel orci et, mattis tincidunt enim.
            </S.Content>
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
