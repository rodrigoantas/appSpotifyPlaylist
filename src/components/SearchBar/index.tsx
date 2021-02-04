/* eslint-disable prettier/prettier */
import React from 'react';
import {Searchbar} from 'react-native-paper';
import {View} from 'react-native';

interface SearchByNameInputProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar:React.FC<SearchByNameInputProps> = ({setSearch}) => {


  return (
    <View>
    <Searchbar
    style={{width: 350, marginTop: 10}}
      placeholder="Search"
      onChangeText={(e)=> setSearch(e)}
    />
    </View>
  );
};

export default SearchBar;
