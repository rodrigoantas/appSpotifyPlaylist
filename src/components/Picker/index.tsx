/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {Picker} from '@react-native-picker/picker';
import { View, Text } from 'react-native';

interface IDropdownProps {
  options: Array<IDropdownDataItem>
  changed(e: any): void;
  selectedValue: string;
  filter: IDropwdownFilter;
}

interface IDropdownDataItem {
  value: string;
  name: string;
}

interface IDropwdownFilter {
  id: string;
  name: string;
}

const PickerSelect: React.FC<IDropdownProps> = ({options, changed, selectedValue, filter}) => {

  const dropdownChanged = (e: any) => {
    changed(e);
};

return (
  <View>
    <Text style={{fontSize: 18}}>{filter.name}</Text>
    <Picker
    selectedValue={selectedValue}
    style={{height: 50, width: 150, backgroundColor: 'white'}}
    onValueChange={dropdownChanged}
    >
      <Picker.Item label="None" value="" />
    {options.map((item, idx) => <Picker.Item key={idx} label={item.name} value={item.value} />)}
  </Picker>
</View>
);



};

export default PickerSelect;





