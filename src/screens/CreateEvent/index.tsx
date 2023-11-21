import * as S from './styles';
import Button from '@components/Button';
import EventTitle from '@components/EventTitle';
import ToggleOnlineButton from '@components/ToggleOnlineButton';
import useAuth from '@hooks/useAuth';
import useInvite from '@hooks/useInvite';
import CalendarServices from '@services/CalendarServices';
import { theme } from '@styles/default.theme';
import { createURL } from 'expo-linking';
import moment from 'moment-timezone';
import React, { useState } from 'react';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const IconArrow = require('../../assets/ArrowBackWhite.png');
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

  const {
    selectedSchedule,
    mandatoryContactSelected,
    contactSelected,
    dateStart,
    dateEnd,
    // timeStart,
    // timeEnd,
  } = useInvite();

  const [description, setDescrition] = useState('');
  const [online, setOnline] = useState(false);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const { user } = useAuth();

  async function createEvent() {
    // const beginSearch = moment(timeStart, 'HH:mm:ss').format();

    // const date = moment(dateEnd.toString()).get('date');
    // const month = moment(dateEnd.toString()).get('month');
    // const year = moment(dateEnd.toString()).get('year');

    // const endSearch = moment(timeEnd.toString(), 'HH:mm:ss')
    //   .set({ date, month, year })
    //   .format();

    //RESOLVER DEPOIS

    if (title === '') {
      setTitleError(true);
      return;
    }

    setTitleError(false);

    if (!online && address === '') {
      setAddressError(true);
      return;
    }
    setAddressError(false);
    const prefix = createURL('/lest-app');

    try {
      if (user.type === 'GOOGLE') {
        await CalendarServices.createGoogleEvent({
          prefix,
          name: title,
          phone: user.phone,
          begin: selectedSchedule.start,
          attendees: mandatoryContactSelected.map(
            (contact) => contact.email || contact.phone
          ),
          end: selectedSchedule.end,
          address: online ? '' : address,
          description: description,
          createMeetLink: online,
          optionalAttendees: contactSelected.map((contact) => {
            if (contact.email) return contact.email;
            if (contact.phone.length === 9) {
              return `+55${user.phone.slice(3, 5)}${contact.phone.replace(
                /[\s()-]/g,
                ''
              )}`;
            } else {
              `+55${contact.phone
                .replace(/[\s()-]/g, '')
                .slice(contact.phone.length - 11)}`;
            }
          }),
          beginSearch: moment(dateStart)
            .tz('America/Sao_Paulo')
            .startOf('day')
            .format(),
          endSearch: moment(dateEnd)
            .tz('America/Sao_Paulo')
            .startOf('day')
            .format(),
        });
      } else {
        await CalendarServices.createOutlookEvent({
          prefix,
          name: title,
          phone: user.phone,
          begin: selectedSchedule.start,
          attendees: mandatoryContactSelected.map(
            (contact) => contact.email || contact.phone
          ),
          end: selectedSchedule.end,
          address: online ? '' : address,
          description: description,
          createMeetLink: online,
          optionalAttendees: contactSelected.map((contact) => {
            if (contact.email) return contact.email;
            if (contact.phone.length === 9) {
              return `+55${user.phone.slice(3, 5)}${contact.phone.replace(
                /[\s()-]/g,
                ''
              )}`;
            } else {
              `+55${contact.phone
                .replace(/[\s()-]/g, '')
                .slice(contact.phone.length - 11)}`;
            }
          }),
          beginSearch: moment(dateStart)
            .tz('America/Sao_Paulo')
            .startOf('day')
            .format(),
          endSearch: moment(dateEnd)
            .tz('America/Sao_Paulo')
            .startOf('day')
            .format(),
        });
      }
      navigation.navigate('MainScreen');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <S.Body>
        <S.Back source={Office}>
          <S.GradientTop colors={['black', 'transparent']} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SuggestSchedule');
            }}
          >
            <S.IconBack source={IconArrow} />
          </TouchableOpacity>
          <S.GradientBottom colors={['transparent', 'black']} />
          {/* <KeyboardAvoidingView behavior="position"> */}
          <S.Header>
            <S.InputsWrapper>
              <EventTitle title={title} setTitle={setTitle} />
              {titleError && (
                <S.ErrorTitle>Escolha um nome para o evento</S.ErrorTitle>
              )}
              <ToggleOnlineButton online={online} setOnline={setOnline} />
              <S.ContainerContent>
                <S.Content
                  placeholder="Descrição"
                  multiline={true}
                  value={description}
                  onChangeText={(text) => setDescrition(text)}
                  placeholderTextColor={theme.colors.lowEmphasis}
                />
              </S.ContainerContent>
              {!online && (
                <S.ContainerLink>
                  <S.Content
                    placeholder="Digite o endereço da reunião"
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                    placeholderTextColor={theme.colors.lowEmphasis}
                  />
                </S.ContainerLink>
              )}
              {addressError && (
                <S.ErrorText>Por favor, selecione um endereço</S.ErrorText>
              )}
            </S.InputsWrapper>
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
          {/* </KeyboardAvoidingView> */}
        </S.Back>
      </S.Body>
    </TouchableWithoutFeedback>
  );
};

export default CreateEvent;
