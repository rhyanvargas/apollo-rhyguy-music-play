import { ApolloClient, split, HttpLink, gql } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

import { cache } from "./cache";

let graphURL = `${process.env.REACT_APP_HASURA_PROJECT_ENDPOINT}/v1/graphql`
let strippedGraphURL = graphURL.replace(/^https?:/, '');

const httpLink = new HttpLink({
	uri: `${strippedGraphURL}`,
});

const wsLink = new WebSocketLink({
	uri: `ws:${strippedGraphURL}`,
	options: {
		reconnect: true,
	},
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
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLink
);

const typeDefs = gql`
	type Song {
		artist: String!
		duration: Int!
		id: uuid!
		thumbnail: String!
		title: String!
		url: String!
	}

	input SongInput {
		artist: String!
		duration: Int!
		id: uuid!
		thumbnail: String!
		title: String!
		url: String!
	}

	type Query {
		queue: [Song]!
	}
	type Mutation {
		addOrRemoveFromQueue(input: SongInput!): [Song]!
	}
`;
const client = new ApolloClient({
	link: splitLink,
	cache,
	typeDefs,
});

export default client;
