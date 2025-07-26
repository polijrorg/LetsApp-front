import * as S from './styles';
import Button from '@components/Button';
import EventTitle from '@components/EventTitle';
import ToggleOnlineButton from '@components/ToggleOnlineButton';
import useAuth from '@hooks/useAuth';
import useInvite from '@hooks/useInvite';
import CalendarServices from '@services/CalendarServices';
import { theme } from '@styles/default.theme';
import { buildDateTime, validateFormInputs } from '@utils/date/eventDate';
import { createURL } from 'expo-linking';
import moment from 'moment-timezone';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const IconArrow = require('../../assets/ArrowBackWhite.png');
const Office = require('../../assets/Office.png');
// const Edition = require('../../assets/Edition.png');

const CreateEvent = ({ navigation }) => {
  const {
    selectedSchedule,
    mandatoryContactSelected,
    contactSelected,
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
  } = useInvite();

  const [description, setDescrition] = useState('');
  const [online, setOnline] = useState(false);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  async function createEvent() {
    setIsLoading(true);

    const beginSearch = buildDateTime(dateStart, timeStart);
    const endSearch = buildDateTime(dateEnd, timeEnd);
    const isValid = validateFormInputs({
        title,
        online,
        address,
        setTitleError,
        setAddressError,
    });
    if (!isValid) {
      setIsLoading(false);
      return;
    }

    const eventPayload = {
      prefix: createURL('/lest-app'),
      name: title,
      phone: user?.phone,
      begin: selectedSchedule.start,
      end: selectedSchedule.end,
      address: online ? '' : address,
      description,
      createMeetLink: online,
      attendees: mandatoryContactSelected.map((c) => c.email || c.phone),
      optionalAttendees: contactSelected.map((c) => c.email || c.phone),
      beginSearch,
      endSearch,
    };

    try {
      const isGoogle = user.type === 'GOOGLE';

      if (isGoogle) {
        await CalendarServices.createGoogleEvent(eventPayload);
      } else {
        await CalendarServices.createOutlookEvent(eventPayload);
      }

      navigation.navigate('MainScreen');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <>
      {isLoading && (
        <S.SpinnerWrapper>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </S.SpinnerWrapper>
      )}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <S.Body>
          <S.Back source={Office} >
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
    </>
  );
};

export default CreateEvent;
