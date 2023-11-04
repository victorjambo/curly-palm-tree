import { ApolloClient, InMemoryCache } from "@apollo/client";

const BASE_URL = "http://localhost:4000/";

export const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
});
