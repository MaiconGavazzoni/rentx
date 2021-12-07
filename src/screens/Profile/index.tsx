import React, { useState, useEffect } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Alert } from 'react-native';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { PasswordInput } from '../../components/PasswordInput';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section
} from './styles';

import { useAuth } from '../../hooks/auth';
import { useNetInfo } from '@react-native-community/netinfo';

export function Profile() {
  const { user, signOut, updateUser } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);


  const netInfo = useNetInfo();
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {
    Alert.alert(
      'Tem certeza?',
      'Se você sair, irá precisar de internet para conectar-se novamente.',
      [
        {
          text: 'Cancelar',
          onPress: () => { },
          style: 'cancel'
        },
        {
          text: 'Sair',
          onPress: () => signOut(),
          style: 'default'
        }
      ]
    );
   
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    if(netInfo.isConnected === false && optionSelected === 'passwordEdit') {
      Alert.alert('Você está Offline','Para mudar a senha conecte=se a internet');
    }else{
      setOption(optionSelected);
    }
    
  }

  async function handleAvatarSelect() {
    console.log("Buscou");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
          .required('CNH é obrigatória'),
        name: Yup.string().required('Nome é obrigatório.')
      });

      const data = { name, driverLicense };
      await schema.validate(data);
      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token
      });
      Alert.alert('Perfil atualizado.')

    } catch (error) {
      console.log(error);
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Não foi possível atualizar o perfil.')
      }

    }
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos de permissões de rolo da câmera para fazer este trabalho!');
        }
      }
    })();
  }, []);
  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton onPress={handleBack} color={theme.colors.shape} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name='power' size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} />}
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather name='camera' size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option active={option === 'dataEdit'}>
                <OptionTitle active={option === 'dataEdit'} onPress={() => handleOptionChange('dataEdit')}>
                  Dados
                </OptionTitle>
              </Option>
              <Option active={option === 'passwordEdit'} onPress={() => handleOptionChange('passwordEdit')}>
                <OptionTitle active={option === 'passwordEdit'} >
                  Tocar senha
                </OptionTitle>
              </Option>
            </Options>

            {option === 'dataEdit' ?
              <Section >
                <Input
                  iconName='user'
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName='mail'
                  editable={false}
                  autoCorrect={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName='credit-card'
                  placeholder="CNH"
                  keyboardType='numeric'
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
              :
              <Section >
                <PasswordInput
                  iconName='lock'
                  placeholder="Senha atual"
                />
                <PasswordInput
                  iconName='lock'
                  placeholder="Nova senha"
                />
                <PasswordInput
                  iconName='lock'
                  placeholder="Repetir Senha"
                />
              </Section>
            }

            <Button
              title='Salvar alterações'
              onPress={handleProfileUpdate}
            />
          </Content>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}