import React from 'react';
import { BackButton } from '../../components/BackButton';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';


import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';


import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImage,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer

} from './styles';
import { useNavigation, CommonActions } from '@react-navigation/native';



export function CarDetails() {

  const navigation = useNavigation();

  function handleHome() {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Home',
      })
    )
  }

  function handleConfirmRental() {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Scheduling',
      })
    )
  }

 
  return (
    <Container>
      <Header>
        <BackButton onPress={handleHome} />
      </Header>

      <CarImage>
        <ImageSlider imagesUrl={['https://www.pngkit.com/png/full/237-2375888_porsche-panamera-s.png']} />
      </CarImage>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 450</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory  name={"380Km/h"} icon={speedSvg}/>
          <Accessory  name={"3.2s"} icon={accelerationSvg}/>
          <Accessory  name={"800 HP"} icon={forceSvg}/>
          <Accessory  name={"Gasolina"} icon={gasolineSvg}/>
          <Accessory  name={"Auto"} icon={exchangeSvg}/>
          <Accessory  name={"2 pessoas"} icon={peopleSvg}/>
        </Accessories>
        <About>
          Este é automovel despotivo. Surgiu do lendário
          touro de lide indultado na praça Real Maestranza de Sevilla.
          É um belíssimo carro para qum gosta de acelerar.
        </About>
      </Content>
       <Footer>
        <Button title='Escolher período do aluguel' onPress={handleConfirmRental}/>
      </Footer> 
    </Container>
  );
}