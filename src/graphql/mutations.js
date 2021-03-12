import {gql} from '@apollo/client'

export const ADD_OR_REMOVE_FROM_QUEUE = gql `
  mutation addOrRemoveFromQueue($input: SongInput!) {
      addOrRemoveFromQueue(input: $input) @client
  }

`;


export const ADD_SONG = gql `
mutation addSong($title: String!, $artist: String!, $url: String!, $thumbnail: String!, $duration: Int!) {
    insert_songs(objects: {thumbnail: $thumbnail, url: $url, artist: $artist, title: $title, duration: $duration}) {
      affected_rows
    }
  }
  

`;