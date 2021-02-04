/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

interface NumberInputProps {
  changed(e: any): void;
  placeholder?: string;
  filter: {
    id: string;
    name: string;
  }
}

const NumberInput: React.FC<NumberInputProps> = ({changed, placeholder, filter}) => {

  const numberInputChanged = (e: any) => {
    changed(e);
};

  return (
    <View>
      <TextInput
        style={{width: 150}}
        placeholder={placeholder}
        mode="outlined"
        label={filter.name}
        onChangeText={numberInputChanged}
        keyboardType="numeric"
      />
    </View>
  );
};

export default NumberInput;
