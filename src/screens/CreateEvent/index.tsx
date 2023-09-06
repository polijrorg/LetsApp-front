import * as S from './styles';
import Button from '@components/Button';
import { api } from '@services/api';
import format from 'date-fns/format';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { ProfileContext } from 'src/contexts/useProfile';

const IconArrow = require('../../assets/ArrowBackBlue.png');
const Office = require('../../assets/Office.png');
// const Edition = require('../../assets/Edition.png');

const CreateEvent = ({ navigation }) => {
  // const [nameEvent, setNameEvent] = useState('Nome do Evento');
  // const [isEditing, setIsEditing] = useState(false);

  // const handleIconClick = () => {
  //   setIsEditing(true);
  // };

  // const handleNameEventBlur = () => {
  //   setIsEditing(false);
  //   if (nameEvent === '') {
  //     setNameEvent('Nome do Evento');
  //   }
  // };
  const [eventP, setEventP] = useState('');
  const [eventO, setEventO] = useState('');
  const [descrition, setDescrition] = useState('');

  const [selectedOption, setSelectedOption] = useState('presencial'); // Inicialmente seleciona o botão de eventos
  const [isOnline, setIsOnline] = useState(false);

  const {
    phoneUser,
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    duration,
    timeSelectedStart,
    timeSelectedEnd,
    contactSelected,
  } = useContext(ProfileContext);

  const emailsArray = contactSelected.map((guest) => guest.email);

  const handleOnlinePress = () => {
    setSelectedOption('online');
    setIsOnline(true);
  };

  const handlePresencialPress = () => {
    setSelectedOption('presencial');
    setIsOnline(false);
  };

  async function createEvent() {
    try {
      console.log('Telefone do usuário', phoneUser);
      console.log('Data de Inicio:', dateStart);
      console.log('Data de Termino:', dateEnd);
      console.log(
        'Inicio do intervalo formatado:',
        format(timeStart, 'HH:mm:ss')
      );
      console.log('Final do intervalo formatado:', format(timeEnd, 'HH:mm:ss'));
      console.log('Duração:', duration);
      const { data } = await api.post('/createEvent', {
        name: isOnline ? eventO : eventP,
        phone: phoneUser,
        begin: timeSelectedStart,
        attendees: 'caiogiro10@gmail.com',
        end: timeSelectedEnd,
        adress: eventO,
        description: descrition,
        createMeetLink: isOnline,
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
    try {
      const { data } = await api.post('/invites/create', {
        name: isOnline ? eventO : eventP,
        date: dateStart,
        phone: phoneUser,
        beginHour: timeSelectedStart,
        guests: emailsArray,
        endHour: timeSelectedEnd,
        adress: eventO,
        description: descrition,
        link: 'www.xpto.com',
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <S.Wrapper behavior="position">
        <S.Body>
          <StatusBar hidden={true} />
          <S.Back source={Office}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SuggestSchedule');
              }}
            >
              <S.IconBack source={IconArrow} />
            </TouchableOpacity>
            <S.Header>
              <S.ContainerEvent>
                <TouchableOpacity onPress={handlePresencialPress}>
                  <S.ContainerNameTypeP selectedOption={selectedOption}>
                    <S.NameTypeP selectedOption={selectedOption}>
                      Presencial{' '}
                    </S.NameTypeP>
                  </S.ContainerNameTypeP>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOnlinePress}>
                  <S.ContainerNameTypeO selectedOption={selectedOption}>
                    <S.NameTypeO selectedOption={selectedOption}>
                      {' '}
                      Online
                    </S.NameTypeO>
                  </S.ContainerNameTypeO>
                </TouchableOpacity>
                {/* {isEditing ? (
                  <S.ChangeName
                    value={nameEvent}
                    onChangeText={(text) => setNameEvent(text)}
                    onBlur={handleNameEventBlur}
                  />
                ) : (
                  <>
                    <S.NameEvent>{nameEvent}</S.NameEvent>
                    <TouchableOpacity onPress={handleIconClick}>
                      <S.Icon source={Edition} />
                    </TouchableOpacity>
                  </>
                )} */}
              </S.ContainerEvent>
              <S.ContainerContent>
                <S.Scroll vertical={true}>
                  <S.Content
                    placeholder="Descrição"
                    multiline={true}
                    value={descrition}
                    onChangeText={(text) => setDescrition(text)}
                  />
                </S.Scroll>
              </S.ContainerContent>
              {selectedOption === 'presencial' ? (
                <S.ContainerLink>
                  <S.Content
                    placeholder="Nome do Evento"
                    value={eventP}
                    onChangeText={(text) => setEventP(text)}
                  />
                </S.ContainerLink>
              ) : (
                <S.ContainerLink>
                  <S.Content
                    placeholder="Nome da Reunião"
                    value={eventO}
                    onChangeText={(text) => setEventO(text)}
                  />
                </S.ContainerLink>
              )}
              <S.Buttons>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SuggestSchedule');
                  }}
                >
                  <Button
                    width="136px"
                    backgroundColor="#FAFAFA"
                    borderColor="#949494"
                    hasIcon={false}
                    icon={Office}
                    title="Voltar"
                    titleColor="#949494"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    createEvent();
                    navigation.navigate('MainScreen');
                  }}
                >
                  <Button
                    width="136px"
                    backgroundColor="#3446E4"
                    borderColor="transparent"
                    hasIcon={false}
                    icon={Office}
                    title="Criar"
                    titleColor="#FAFAFA"
                  />
                </TouchableOpacity>
              </S.Buttons>
            </S.Header>
          </S.Back>
        </S.Body>
      </S.Wrapper>
    </TouchableWithoutFeedback>
  );
};

export default CreateEvent;
