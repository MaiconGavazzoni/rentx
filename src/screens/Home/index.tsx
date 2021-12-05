import { useNavigation, CommonActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Alert, Button } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { api } from '../../services/api';

import { CarDTO } from '../../dtos/CarDTO';
import { LoadAnimation } from '../../components/LoadAnimation';
import { useNetInfo } from '@react-native-community/netinfo';
import { Car as ModelCar } from '../../database/model/Car';

import { synchronize} from '@nozbe/watermelondb/sync';
import { database} from '../../database';


import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';

export function Home() {

  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const navigation = useNavigation();

  function handleCarDetails(car: CarDTO) {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'CarDetails',
        params: { car }
      })
    )
  }


  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async({ lastPulledAt })=>{
        const response = await api
          .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

          const { changes, latestVersion } = response.data;

          console.log('BACKEND PARA APP');
          console.log(changes);
          return { changes, timestamp: latestVersion }
      },
      pushChanges: async({ changes }) =>{
        console.log('APP PARA BACKEND');
        console.log(changes);
        const user = changes.users;
        if (user.updated.length > 0) {
          await api.post('/users/sync', user);
        }
       
      },
      
    });
  }
 

  useEffect(() => {
    let isMounted = true;
    async function fetchCars() {
      try {
        //const response = await api.get('/cars');
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();
        console.log("CARROS LOCAL ####:",carCollection, cars)
        if(isMounted) {
          setCars(cars);
        }        
      } catch (error) {
        console.log(error);
      } finally {
        if(isMounted) {
          setLoading(false);
        }      
      }
    }
    fetchCars();
    return () =>{
      isMounted = false;
    };
  }, []);

useEffect(() => {
  if(netInfo.isConnected === true){
    offlineSynchronize();
  }
},[netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          {
            !loading &&
             <TotalCars>
             Total de {cars.length} carros
           </TotalCars >
          }
         
        </HeaderContent>
      </Header>

          <Button title="Sincronizar" onPress={offlineSynchronize}/>

      {loading ? <LoadAnimation /> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <Car data={item}
              onPress={() => handleCarDetails(item)}
            />
          }

        />
      }
   
    </Container>
  );
}

