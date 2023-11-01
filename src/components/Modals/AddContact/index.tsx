import * as S from './styles';
import FixedInput from '@components/FixedInput';
import CalendarServices from '@services/CalendarServices';
import { theme } from '@styles/default.theme';
import { Select, CheckIcon } from 'native-base';
import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  // name?: string;
  // setName: (name: string) => void;
  // email?: string;
  // phone?: string;
  // setPhone: (name: string) => void;
  // setEmail: (name: string) => void;
  userPhone?: string;
}

const AddContact: React.FC<Props> = ({
  setOpen,
  // name,
  // setName,
  // email,
  // setEmail,
  // phone,
  // setPhone,
  userPhone,
}) => {
  const [selected, setSelected] = useState('Telefone');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleAddContact = async () => {
    try {
      await CalendarServices.addContact({
        email: selected === 'Email' ? email : null,
        name,
        phone: selected === 'Telefone' ? phone : null,
        userPhone: userPhone,
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => setOpen(false)}>
      <S.Body>
        <S.ModalView>
          {/* <S.BackButton
          onPress={() => {
            setOpen(false);
          }}
        >
          <S.IconBack source={require('../../../assets/ArrowBackBlue.png')} />
        </S.BackButton> */}
          <S.Title>Adicionar novo contato</S.Title>
          <FixedInput
            height="40px"
            width="100%"
            placeholder="Nome"
            value={name}
            setValue={setName}
          />
          <Select
            selectedValue={selected}
            defaultValue="Telefone"
            width="100%"
            _selectedItem={{
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={(itemValue) => setSelected(itemValue)}
            borderColor={theme.colors.primary.dark}
            borderRadius={8}
            height="40px"
            fontSize="16px"
            color={theme.colors.highEmphasis}
            mt="4px"
            mb="4px"
          >
            <Select.Item label="Telefone" value="Telefone" />
            <Select.Item label="Email" value="Email" />
          </Select>
          {selected === 'Telefone' ? (
            <FixedInput
              height="40px"
              width="100%"
              placeholder="Insira o telefone"
              value={phone}
              setValue={setPhone}
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
