import { resolvers, typeDefs } from "graphql-scalars";
import { stitchSchemas } from "@graphql-tools/stitch";
import accountsSchema from "../accounts/resolvers.js";

export async function buildSuperSchema() {
  return stitchSchemas({
    subschemas: [accountsSchema],
    typeDefs,
    resolvers,
  });
}
