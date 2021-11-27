import React, { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';
import { useTheme} from 'styled-components';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';
import { useNavigation, CommonActions, useRoute } from '@react-navigation/native';

interface Params { 
  user:{ 
    name : string; 
    email: string; 
    driverLicense: string;
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const {user } = route.params as Params;
  console.log(user);

  function handleBack() {
    navigation.goBack();
  }

  function handleRegister(){
    if(!password || !passwordConfirm) {
      Alert.alert('Informe a senha e a confirmação.')
    }

    if(password != passwordConfirm) {
      Alert.alert('As senhas não são iguais.')
    }

    //Enviar e cadastrar

  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet  />
              <Bullet active/>
            </Steps>
          </Header>

          <Title>Crie sua{"\n"}consta</Title>
          <SubTitle>Faça seu cadastro de{"\n"}forma rápida e fácil</SubTitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput 
              iconName='lock' 
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
              />
            <PasswordInput 
              iconName='lock' 
              placeholder='Repetir senha'
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
           
          </Form>

          <Button title="Cadastrar" color={theme.colors.success} onPress={handleRegister} />

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}