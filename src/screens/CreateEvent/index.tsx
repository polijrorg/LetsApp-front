import * as S from './styles';
import Button from '@components/Button';
import useAuth from '@hooks/useAuth';
import UserServices from '@services/UserServices';
import { api } from '@services/api';
// import format from 'date-fns/format';
import { createURL } from 'expo-linking';
import React, { useState } from 'react';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

// import useProfile from 'src/contexts/useProfile';

const IconArrow = require('../../assets/ArrowBackBlue.png');
const Office = require('../../assets/Office.png');
// const Edition = require('../../assets/Edition.png');

const CreateEvent = ({ navigation, route }) => {
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

  const { selectedSchedule, mandatoryContactSelected, contactSelected } =
    route.params;
  const [eventP, setEventP] = useState('');
  const [eventO, setEventO] = useState('');
  const [description, setDescrition] = useState('');

  const [selectedOption, setSelectedOption] = useState('presencial'); // Inicialmente seleciona o botão de eventos
  const [isOnline, setIsOnline] = useState(false);

  // const {
  //   dateStart,
  //   dateEnd,
  //   timeStart,
  //   timeEnd,
  //   duration,
  //   timeSelectedStart,
  //   timeSelectedEnd,
  // } = useProfile();

  const { user } = useAuth();

  // const emailsArray = contactSelected.map((guest) => guest.email);

  const handleOnlinePress = () => {
    setSelectedOption('online');
    setIsOnline(true);
  };

  const handlePresencialPress = () => {
    setSelectedOption('presencial');
    setIsOnline(false);
  };

  const handleLinkNotification = async (link: string, pseudoUserId: string) => {
    try {
      const reponse = await UserServices.sendSignUpLink({
        link,
        pseudoUserId,
      });

      console.log('link notification response: ', reponse);
    } catch (error) {
      console.log(error.message);
    }
  };

  async function createEvent() {
    try {
      console.log({
        name: isOnline ? eventO : eventP,
        phone: user.phone,
        begin: selectedSchedule.start1,
        attendees: mandatoryContactSelected.map((contact) => contact.email),
        end: selectedSchedule.end1,
        adress: eventO,
        description: description,
        createMeetLink: isOnline,
        optionalAttendees: contactSelected.map((contact) => contact.email),
      });
      const { data } = await api.post('/createGoogleEvent', {
        name: isOnline ? eventO : eventP,
        phone: user.phone,
        begin: selectedSchedule.start1,
        attendees: mandatoryContactSelected.map((contact) => contact.email),
        end: selectedSchedule.end1,
        adress: eventO,
        description: description,
        createMeetLink: isOnline,
        optionalAttendees: contactSelected.map((contact) => contact.email),
      });

      console.log(data);

      data.pseudoGuests.map((pseudoGuest) => {
        const prefix = createURL('lets-app');
        const link = `${prefix}/authentication/${pseudoGuest.pseudoUserId}`;

        handleLinkNotification(link, pseudoGuest.pseudoUserId);
      });
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const { data } = await api.post('/invites/create', {
    //     name: isOnline ? eventO : eventP,
    //     date: dateStart,
    //     phone: user.phone,
    //     beginHour: timeSelectedStart,
    //     guests: emailsArray,
    //     endHour: timeSelectedEnd,
    //     adress: eventO,
    //     description: description,
    //     link: 'www.xpto.com',
    //   });

    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <S.Wrapper behavior="position">
        <S.Body>
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
                    value={description}
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
