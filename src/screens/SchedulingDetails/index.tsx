import React from 'react';
import { BackButton } from '../../components/BackButton';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';

import {getAccessoryIcon} from '../../utils/getAccessoryIcon';



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
import { useNavigation, CommonActions, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';

interface Params {
  car: CarDTO;
}

export function SchedulingDetails() {

  //const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>();

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'SchedulingComplete',
      })
    )
  }


  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImage>
        <ImageSlider imagesUrl={car.photos} />
      </CarImage>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          { 
            car.accessories.map(accessory =>(
              <Accessory
              key={accessory.type}
              name={accessory.name} 
              icon={getAccessoryIcon(accessory.type)}/>
            ))
          
          }
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
            <DateValue>{dates}</DateValue>
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
        <Button title='Alugar agora' color={theme.colors.success} onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
}