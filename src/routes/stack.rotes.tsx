import React from 'react';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';

import { createStackNavigator } from '@react-navigation/stack';
import header from 'react-native-calendars/src/calendar/header';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false,
    }}
    >
      <Screen
        name='Home'
        component={Home}
      />

      <Screen
        name='CarDetails'
        component={CarDetails}
      />

      <Screen
        name='Scheduling'
        component={Scheduling}
      />

      <Screen
        name='SchedulingDetails'
        component={SchedulingDetails}
      />

      <Screen
        name='SchedulingComplete'
        component={SchedulingComplete}
      />

    </Navigator>
  )
}