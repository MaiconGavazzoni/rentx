import React from 'react';
import { useWindowDimensions } from 'react-native';
import { StatusBar} from 'react-native';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {ConfirmButton } from '../../components/ConfirmButton';

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';
import { useNavigation, CommonActions } from '@react-navigation/native';

export function SchedulingComplete(){

  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  function handleConfirm() {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Home',
      })
    )
  }

  return(
    <Container>
     <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />

      <Content>
        <LogoSvg width={width}/>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir{'\n'}
          até a concessionária da RENTS {'\n'}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title='OK' onPress={handleConfirm}/>
      </Footer>

    </Container>
  );
}