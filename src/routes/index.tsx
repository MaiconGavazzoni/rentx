import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StackRoutes} from './stack.rotes'

export function Routes(){
  return(
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}