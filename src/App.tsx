/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';

import filtersApi from './services/filters-api';
import axios from 'axios';
import { encode as btoa } from 'js-base64';

import { ScrollView } from 'react-native';

import { DoubleInputView, FilterHeader } from './styles/appStyles';

import Picker from './components/Picker';
import DateTimePicker from './components/DateTimePicker';
import NumberInput from './components/NumberInput';
import SearchBar from './components/SearchBar';
import Card from './components/Card';

const client_id = ''; // Your client id
const client_secret = ''; // Your secret


interface IPlaylists {
  id: string;
  name: string;
  description: string;
  images: Array<{url: string;}>;
  tracks: {
    total: number;
  }
  external_urls: {
    spotify: string;
  }
}


interface ILists {
  id: string;
  name: string;
  values: Array<IValues>
}

interface IValues {
  value: string;
  name: string;
}
 interface IDropdownCountry {
  selectedCountry: string;
  listOfCountries:ILists;
}

interface IDropdownLocales {
 selectedLocale: string;
 listOfLocales: ILists;
}

interface ITimetampPicker {
 selectedValue: string;
 id: string;
 name: string;
}

interface ILimit {
 selectedValue: string;
 id: string;
 name: string;
}
interface IOffset {
 selectedValue: string;
 id: string;
 name: string;
}



const App: React.FC = () => {
  const [token, setToken] = useState('');
  const [playlists, setPlaylists] = useState<IPlaylists[]>();
  const [search, setSearch] = useState('');
  const [locale, setLocale] = useState({} as IDropdownLocales);
  const [country, setCountry] = useState({} as IDropdownCountry);
  const [timestamp, setTimestamp] = useState({selectedValue: '', id: '', name: '' });
  const [limit, setLimit] = useState({} as ILimit);
  const [offset, setOffset] = useState({} as IOffset);




  useEffect(() => {

    async function loadToken() {

     await axios('https://accounts.spotify.com/api/token', {
     headers: {
       'Content-Type' : 'application/x-www-form-urlencoded',
       'Authorization' : 'Basic ' + btoa(`${client_id}:${client_secret}`),
     },
     data: 'grant_type=client_credentials',
     method: 'POST',
   })
   .then(tokenResponse => {
     setToken(tokenResponse.data.access_token);

   });}

   loadToken();

 }, []);


 useEffect(() => {
  async function loadPlaylists() {

   // getting the spotify api with the authorization header and params.
   await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
     headers: {
       'Authorization' : `Bearer ${token}`,
     }, params : {
      country: country.selectedCountry ? country.selectedCountry : undefined,
      locale: locale.selectedLocale ? locale.selectedLocale : undefined,
      timestamp: timestamp && timestamp.selectedValue ? `${timestamp.selectedValue.slice(0,19)}` : undefined,
      limit: limit ? limit.selectedValue : undefined,
      offset: offset ? Number(offset.selectedValue) : undefined,
    },
       })
       .then(playlistsResponse => {
         setPlaylists(playlistsResponse.data.playlists.items);

       });
 }

   loadPlaylists();



}, [token, country, locale, timestamp, limit, offset]);

useEffect(() => {
  async function loadFilters() {
    await filtersApi.get('/').then(filtersResponse => {
    setCountry({
      selectedCountry: '',
      listOfCountries: filtersResponse.data.filters[1],
    });
    setLocale({
      selectedLocale: '',
      listOfLocales: filtersResponse.data.filters[0],
    });
     setTimestamp({
       selectedValue: new Date().toISOString(),
       name: filtersResponse.data.filters[2].name,
       id: filtersResponse.data.filters[2].id,
     });
     setLimit({
       selectedValue: '20',
       id: filtersResponse.data.filters[3].id,
       name: filtersResponse.data.filters[3].name,
     });
     setOffset({
      selectedValue: '0',
      id: filtersResponse.data.filters[4].id,
      name: filtersResponse.data.filters[4].name,
    });
  });
  }
  loadFilters();
}, []);


 const handleCountryChanged = useCallback((val: any)=> {
  if (val === 'en_US') {
    val = 'US';
    setCountry({
    selectedCountry: val,
    listOfCountries: country.listOfCountries,
  });
  } else {
    setCountry({
      selectedCountry: val,
      listOfCountries: country.listOfCountries,
    });
  }
}, [country]);

const handleLocaleChanged = useCallback((val: any)=> {
  setLocale({
    selectedLocale: val,
    listOfLocales: locale.listOfLocales,
  });
}, [locale]);

const handleTimePickerChanged = useCallback((val: any)=> {
  setTimestamp({
    selectedValue: val.toISOString(),
    name: timestamp.name,
    id: timestamp.id,
  });
}, [timestamp]);

const handleLimitChanged = useCallback((val: any)=> {
  setLimit({
    selectedValue: val,
    name: limit.name,
    id: limit.id,
  });
}, [limit]);

const handleOffsetChanged = useCallback((val: any)=> {
  setOffset({
    selectedValue: val,
    name: offset.name,
    id: offset.id,
  });
}, [offset]);




  return (
    <>
    <ScrollView style={{}}>

      <FilterHeader>
        <SearchBar setSearch={setSearch}/>
        <DoubleInputView>
            {country && country.listOfCountries && <Picker filter={country.listOfCountries} options={country.listOfCountries.values} changed={handleCountryChanged} selectedValue={country.selectedCountry}/>}

            {locale && locale.listOfLocales && <Picker filter={locale.listOfLocales} options={locale.listOfLocales.values} changed={handleLocaleChanged} selectedValue={locale.selectedLocale}/>}
        </DoubleInputView>

        <DateTimePicker changed={(e)=> {handleTimePickerChanged(e);}} filter={timestamp} />

        <DoubleInputView>
          <NumberInput filter={limit} placeholder="Padrão: 20" changed={handleLimitChanged}/>
          <NumberInput filter={offset} placeholder="Padrão: 0" changed={handleOffsetChanged}/>
        </DoubleInputView>
      </FilterHeader>


<ScrollView >
    {search && playlists?.length ?
      playlists?.filter(playlist => playlist.name.toLowerCase().includes(search.toLowerCase())).map(playlist => <Card playlist={playlist}/> )
      : playlists?.map(playlist => <Card playlist={playlist}/>)
      }

</ScrollView>



    </ScrollView>

    </>
  );
};

export default App;
