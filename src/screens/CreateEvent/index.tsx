import * as S from './styles';
import Button from '@components/Button';
import useAuth from '@hooks/useAuth';
import UserServices from '@services/UserServices';
// import format from 'date-fns/format';
import { createURL } from 'expo-linking';
import moment from 'moment-timezone';
import React, { useState } from 'react';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import useProfile from 'src/contexts/useProfile';

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
  const { dateEnd, timeStart, timeEnd } = useProfile();
  const [selectedOption, setSelectedOption] = useState('presencial'); // Inicialmente seleciona o botão de eventos
  const [isOnline, setIsOnline] = useState(false);

  const { user } = useAuth();

  const handleOnlinePress = () => {
    setSelectedOption('online');
    setIsOnline(true);
  };

  const handlePresencialPress = () => {
    setSelectedOption('presencial');
    setIsOnline(false);
  };

  const createOutlookEvent = UserServices.createOutlookEvent;
  const createGoogleEvent = UserServices.createGoogleEvent;

  async function createEvent() {
    const beginSearch = moment(timeStart.toString(), 'HH:mm:ss').format();

    const date = moment(dateEnd.toString()).get('date');
    const month = moment(dateEnd.toString()).get('month');
    const year = moment(dateEnd.toString()).get('year');

    const endSearch = moment(timeEnd.toString(), 'HH:mm:ss')
      .set({ date, month, year })
      .format();

    const prefix = createURL('lets-app');

    if (user.type === 'OUTLOOK') {
      await createOutlookEvent({
        prefix,
        phone: user.phone,
        begin: selectedSchedule.start,
        end: selectedSchedule.end,
        beginSearch: beginSearch,
        endSearch: endSearch,
        name: isOnline ? eventO : eventP,
        attendees: mandatoryContactSelected.map((contact) => contact.email),
        address: 'test',
        description,
        createMeetLink: isOnline,
        optionalAttendees: contactSelected.map((contact) => contact.email),
      });
    } else {
      await createGoogleEvent({
        prefix,
        phone: user.phone,
        begin: selectedSchedule.start,
        end: selectedSchedule.end,
        beginSearch: beginSearch,
        endSearch: endSearch,
        name: isOnline ? eventO : eventP,
        attendees: mandatoryContactSelected.map((contact) => contact.email),
        address: 'test',
        description,
        createMeetLink: isOnline,
        optionalAttendees: contactSelected.map((contact) => contact.email),
      });
    }
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
