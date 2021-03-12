import {ApolloClient ,split, HttpLink, InMemoryCache, gql, makeVar} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities';
import {WebSocketLink} from '@apollo/client/link/ws'
import { GET_QUEUED_SONGS,IS_LOGGED_IN } from './queries';
import {cache, queueItemsVar} from './cache'

const graphURL = '//rhyguy-music-app.hasura.app/v1/graphql'
// const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: `https:${graphURL}`
});

const wsLink = new WebSocketLink({
  uri: `ws:${graphURL}`,
  options: {
    reconnect: true
  }
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const typeDefs = gql `
  type Song {
    artist: String!,
    duration: Int!,
    id: uuid!,
    thumbnail: String!,
    title: String!,
    url: String!
  }

  input SongInput {
    artist: String!,
    duration: Int!,
    id: uuid!,
    thumbnail: String!,
    title: String!,
    url: String!
  }

  type Query {
    queue: [Song]!
  }
  type Mutation {
    addOrRemoveFromQueue(input: SongInput!): [Song]!
  } 
  `
const client = new ApolloClient({
  link: splitLink,
  cache,
  typeDefs
})

/* Why I passed in a Loca-only field into queue, instead of setting default value to [] :
* https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing-local-state-in-the-cache
*/
cache.writeQuery({
  query: GET_QUEUED_SONGS,
  data: {
    queue: queueItemsVar() 
  },
});



export default client;