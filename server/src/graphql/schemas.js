import { resolvers, typeDefs } from "graphql-scalars";
import { stitchSchemas } from "@graphql-tools/stitch";
import accountsSchema from "../accounts/resolvers.js";
import channelsSchema from "../channels/resolvers.js";
import chatsSchema from "../chats/resolvers.js";

export async function buildSuperSchema() {
  return stitchSchemas({
    subschemas: [accountsSchema, channelsSchema, chatsSchema],
    typeDefs,
    resolvers,
  });
}
