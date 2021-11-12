import React from 'react';
import { Feather} from '@expo/vector-icons';
import { useTheme} from 'styled-components';

import { Calendar as CustomCalendar, LocaleConfig } from 'react-native-calendars';

import {
  Container
} from './styles';


LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort:['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames:['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort:['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
  today: 'Hoje'
}

LocaleConfig.defaultLocale = 'pt-br';

export function Calendar(){
  const theme = useTheme();
  return(
    <Container>
      <CustomCalendar 
      current={'2021-11-11'}
      renderArrow={( direction) =>
        <Feather 
          size={24}
          color={theme.colors.text}
          name={direction == 'left'? 'chevron-left' : 'chevron-right'}
        />
      }

      headerStyle={{ 
        backgroundColor: theme.colors.background_primary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10
      }}

      theme={{ 
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayFontSize: 13,
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle:{
          marginHorizontal: -15
        }
      }}

      firstDay={1}
      minDate={new Date()}
      />
    </Container>
  );
}