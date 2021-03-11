import {ApolloClient ,split, HttpLink, InMemoryCache} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities';
import {WebSocketLink} from '@apollo/client/link/ws'

const graphURL = '//rhyguy-music-app.hasura.app/v1/graphql'
const cache = new InMemoryCache();

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

const client = new ApolloClient({
  link:splitLink,
  cache: cache
})

export default client;