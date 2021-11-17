import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';
import {Calendar} from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';


import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,

} from './styles';
import { useNavigation, CommonActions } from '@react-navigation/native';


export function Scheduling() {
  const theme = useTheme();

  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'SchedulingDetails',
      })
    )
  }

  return (
    <Container>
      <Header>
        <StatusBar 
          style="light"
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          onPress={() => { }}
          color={theme.colors.shape}
        />

        <Title>
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>18/06/2021</DateValue>
          </DateInfo>
          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>18/06/2021</DateValue>
          </DateInfo>


        </RentalPeriod>
      </Header>
      <Content>
        <Calendar />
      </Content>
      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental}/>
      </Footer>

    </Container>
  );
}