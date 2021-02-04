# Spotify Playlists Selection
## This is a React Native version of the <a href="https://github.com/rodrigoantas/spotifyPlaylists"> Spotify Playlist</a>!
### App made with React Native, using the Spotify API.



<img src="https://i.imgur.com/yqq59fa.png" style="height:600px;">


## Architecture

- React Native <br/>
Framework used for the front-end, using components. UseState was used to store the data from the api, useCallback it's the best way of declaring a function inside a React Component and useEffect is a function to trigger everytime the page loads or when a variable changes.


- Styled Components <br/>
Used to style the application in a more organized way and also to use props.

- React Native Paper <br/>
Since no UI prototype was given, i've used this basic library to style a little more.

- Axios <br/>
Used to require the API. It's easier that way than just fetching the data, since you can use .get easilly.