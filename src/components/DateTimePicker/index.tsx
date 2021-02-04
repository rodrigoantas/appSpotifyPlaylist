/* eslint-disable prettier/prettier */
import React, {useState, useCallback} from 'react';
import { View, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { Button } from './styles';


interface TimeInputProps {
  changed(e: any): void;
   filter: {
     id: string;
     name: string;
   }
}


const DateTimePicker: React.FC<TimeInputProps> = ({changed, filter}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = useCallback(() => {
    setDatePickerVisibility(true);
  }, []);

  const hideDatePicker = useCallback(() => {
    setDatePickerVisibility(false);
  }, []);

  const handleConfirm = useCallback(
    (date: any) => {
      changed(date);
      hideDatePicker();
    },
    [hideDatePicker, changed],
  );

  return (
    <View>
      <Button color='#1ED760' onPress={showDatePicker}>
    <Text style={{color: '#1ED760', fontSize: 20,}}> {filter.name} </Text>
      </Button>
      <DateTimePickerModal
        
        is24Hour
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DateTimePicker;
