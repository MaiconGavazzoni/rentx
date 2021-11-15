import React from 'react';
import { BackButton } from '../../components/BackButton';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';


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
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer

} from './styles';

export function SchedulingDetails() {

  const theme = useTheme();

  function handleTeste() {
    console.log("Ok Click");
  }
  return (
    <Container>
      <Header>
        <BackButton onPress={handleTeste} />
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
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name={"380Km/h"} icon={speedSvg} />
          <Accessory name={"3.2s"} icon={accelerationSvg} />
          <Accessory name={"800 HP"} icon={forceSvg} />
          <Accessory name={"Gasolina"} icon={gasolineSvg} />
          <Accessory name={"Auto"} icon={exchangeSvg} />
          <Accessory name={"2 pessoas"} icon={peopleSvg} />
        </Accessories>
        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>

          <Feather
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>

      </Content>
      <Footer>
        <Button title='ALugar agora' color={theme.colors.success} />
      </Footer>
    </Container>
  );
}