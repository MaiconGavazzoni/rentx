import React from 'react';
import { Feather} from '@expo/vector-icons';
import { useTheme} from 'styled-components';

import { Calendar as CustomCalendar, LocaleConfig} from 'react-native-calendars';
import {generateInterval} from './generateInterval';
import { ptBR} from './localeConfig';
import {
  Container
} from './styles';
//import { DayProps } from 'react-native-calendars/src/calendar/day';


LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps {
  [date : string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableToucheEvent?: boolean;
  }
}

interface DayProps{
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface CalendarProps{
  markedDates: MarkedDateProps;
  onDayPress: () => DayProps ;
}

function Calendar({markedDates, onDayPress}: CalendarProps){
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
      markingType='period'
      markedDates={markedDates}
      onDayPress={onDayPress}
      />
    </Container>
  );
}

export { Calendar, MarkedDateProps, DayProps, generateInterval};