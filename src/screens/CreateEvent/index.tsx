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
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
    duration,
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
    
    // Validate time interval
    const startTime = new Date(selectedSchedule.start);
    const endTime = new Date(selectedSchedule.end);
    
    console.log('🕐 Time validation:');
    console.log('  selectedSchedule.start:', selectedSchedule.start);
    console.log('  selectedSchedule.end:', selectedSchedule.end);
    console.log('  startTime object:', startTime);
    console.log('  endTime object:', endTime);
    console.log('  beginSearch:', beginSearch);
    console.log('  endSearch:', endSearch);
    
    if (endTime <= startTime) {
      Alert.alert('Erro', 'Intervalo de tempo inválido: o horário de fim deve ser posterior ao horário de início.');
      setIsLoading(false);
      return;
    }
    
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
    
    console.log('🔵🔵eventPayload', JSON.stringify(eventPayload, null, 2));
    console.log('🔵🔵selectedSchedule', JSON.stringify(selectedSchedule, null, 2));
    console.log('🔵🔵duration from hook', duration);
    
    try {
      const isGoogle = user.type === 'GOOGLE';
      console.log('isGoogle', isGoogle);
      if (isGoogle) {
        await CalendarServices.createGoogleEvent(eventPayload);
      } else {
        await CalendarServices.createOutlookEvent(eventPayload);
      }

      navigation.navigate('MainScreen');
    } catch (error) {
      console.error('❌ Event creation error:', error);
      
      // Better error handling
      let errorMessage = 'Erro ao criar evento';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Erro', errorMessage);
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
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
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
                    style={{ color: theme.colors.highEmphasis }}
                  />
                </S.ContainerContent>
                {!online && (
                  <S.ContainerLink>
                    <S.Content
                      placeholder="Digite o endereço da reunião"
                      value={address}
                      onChangeText={(text) => setAddress(text)}
                      placeholderTextColor={theme.colors.lowEmphasis}
                      style={{ color: theme.colors.highEmphasis }}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default CreateEvent;
