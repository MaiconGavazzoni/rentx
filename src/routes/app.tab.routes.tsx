import React from 'react';
import { Platform } from 'react-native';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { Profile } from '../screens/Profile';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

import { AppStackRoutes } from './app.stack.routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';


const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarLabelPosition: 'beside-icon',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary
        }
      }}
    >

      <Screen
        name='Pilha'
        component={AppStackRoutes}
        options={{
          tabBarIcon: (({ color }) => (
            <HomeSvg
              width={24}
              height={24}
              fill={color}
            />
          ))
        }}
      />

      <Screen
        name='MyCars'
        component={MyCars}
        options={{
          tabBarIcon: (({ color }) => (
            <CarSvg
              width={24}
              height={24}
              fill={color}
            />
          ))
        }}
      />

      <Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: (({ color }) => (
            <PeopleSvg
              width={24}
              height={24}
              fill={color}
            />
          ))
        }}
      />



    </Navigator>
  )
}