/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Card, Title, Paragraph} from 'react-native-paper';
import { Text, Linking, View } from 'react-native';

import {RectButton, TouchableOpacity} from 'react-native-gesture-handler';


interface ICard {
  playlist: {
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
}


const PlaylistCard:React.FC<ICard> = ({playlist}) => (
  <View style={{backgroundColor: '#282828'}}>
  <Card style={{margin: 20}}>
    <Card.Cover source={{uri: `${playlist.images[0].url}`}} />
    <Card.Content>
      <Title>{playlist.name}</Title>
      <Paragraph>{playlist.description}</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Text style={{color: 'black', marginRight: 15, fontWeight: 'bold'}}>TOTAL TRACKS: {playlist.tracks.total}</Text>
            <TouchableOpacity style={{backgroundColor: 'black', padding: 10, borderRadius: 3}}>
                <Text style={{ color: '#1ED760'}} onPress={() => Linking.openURL(`${playlist.external_urls.spotify}`)}>LISTEN</Text>
            </TouchableOpacity>
    </Card.Actions>
  </Card>
  </View>
);

export default PlaylistCard;
