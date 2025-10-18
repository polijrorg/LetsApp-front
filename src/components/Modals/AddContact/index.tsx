import * as S from './styles';
import FixedInput from '@components/FixedInput';
import CalendarServices from '@services/CalendarServices';
import { theme } from '@styles/default.theme';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  userPhone?: string;
}

const AddContact: React.FC<Props> = ({ setOpen, userPhone }) => {
  const [selected, setSelected] = useState('Telefone');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleNumberFormat = (input: string) => {
    const unsignedPhoneNumber = input.replace(/[\s()-]/g, '');
    let formattedPhoneNumber: string;
    if (unsignedPhoneNumber.length > 2 && unsignedPhoneNumber.length < 11) {
      formattedPhoneNumber = `(${unsignedPhoneNumber.slice(
        0,
        2
      )}) ${unsignedPhoneNumber.slice(2)}`;
    } else if (unsignedPhoneNumber.length >= 11) {
      formattedPhoneNumber = `(${unsignedPhoneNumber.slice(
        0,
        2
      )}) ${unsignedPhoneNumber.slice(2, 7)}-${unsignedPhoneNumber.slice(7)}`;
    }

    setPhone(formattedPhoneNumber);
  };

  const handleAddContact = async () => {
    const unsignedPhoneNumber = phone.replace(/[\s()-]/g, '');
    const formattedPhoneNumber = `+55${unsignedPhoneNumber.slice(
      unsignedPhoneNumber.length - 11
    )}`;
    try {
      await CalendarServices.addContact({
        email: selected === 'Email' ? email : null,
        name,
        phone: selected === 'Telefone' ? formattedPhoneNumber : null,
        userPhone: userPhone,
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback>
      <S.Body>
        <S.ModalView>
          <S.TopWrapper>
            <S.BackButton
              onPress={() => {
                setOpen(false);
              }}
            >
              <S.IconBack
                source={require('../../../assets/ArrowBackBlue.png')}
              />
            </S.BackButton>
            <S.Title>Adicionar novo contato</S.Title>
          </S.TopWrapper>
          <FixedInput
            height="40px"
            width="100%"
            placeholder="Nome"
            value={name}
            setValue={setName}
          />
          <View
            style={{
              borderColor: theme.colors.primary.dark,
              borderWidth: 1,
              borderRadius: 8,
              height: 40,
              justifyContent: 'center',
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            <Picker
              selectedValue={selected}
              onValueChange={(itemValue) => setSelected(itemValue)}
              style={{
                height: 40,
                color: theme.colors.highEmphasis,
              }}
            >
              <Picker.Item label="Telefone" value="Telefone" />
              <Picker.Item label="Email" value="Email" />
            </Picker>
          </View>
          {selected === 'Telefone' ? (
            <FixedInput
              height="40px"
              width="100%"
              placeholder="Insira o telefone"
              value={phone}
              setValue={handleNumberFormat}
            />
          ) : (
            <FixedInput
              height="40px"
              width="100%"
              placeholder="Insira o email"
              value={email}
              setValue={setEmail}
            />
          )}

          <S.ConfirmButton onPress={handleAddContact}>
            <Icon name="check" size={30} color="#3446E4" />
          </S.ConfirmButton>
        </S.ModalView>
      </S.Body>
    </TouchableWithoutFeedback>
  );
};

export default AddContact;
