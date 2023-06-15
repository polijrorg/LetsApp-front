import * as S from './styles';
import Button from '@components/Button';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const IconArrow = require('../../assets/ArrowBackBlue.png');
const Office = require('../../assets/Office.png');
const Edition = require('../../assets/Edition.png');

const CreateEvent: React.FC = ({ navigation }) => {
  const [nameEvent, setNameEvent] = useState('Nome do Evento');
  const [isEditing, setIsEditing] = useState(false);

  const handleIconClick = () => {
    setIsEditing(true);
  };

  const handleNameEventBlur = () => {
    setIsEditing(false);
    if (nameEvent === '') {
      setNameEvent('Nome do Evento');
    }
  };

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
                {/* <S.NameEvent>Nome do Evento</S.NameEvent>
              <S.Icon source={Edition} onClick={handleIconClick} /> */}
                {isEditing ? (
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
                )}
              </S.ContainerEvent>
              <S.ContainerContent>
                <S.Scroll vertical={true}>
                  <S.Content placeholder="Descrição" multiline={true} />
                </S.Scroll>
              </S.ContainerContent>
              <S.ContainerLink>
                <S.Content placeholder="Link/Endereço" />
              </S.ContainerLink>
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
                <TouchableOpacity>
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
