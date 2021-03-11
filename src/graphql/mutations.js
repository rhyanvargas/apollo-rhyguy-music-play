import {gql} from 'apollo-boost'

export const ADD_SONG = gql `
mutation addSong($title: String!, $artist: String!, $url: String!, $thumbnail: String!, $duration: Int!) {
    insert_songs(objects: {thumbnail: $thumbnail, url: $url, artist: $artist, title: $title, duration: $duration}) {
      affected_rows
    }
  }
  

`