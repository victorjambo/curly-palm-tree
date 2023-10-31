import { resolvers, typeDefs } from "graphql-scalars";
import { stitchSchemas } from "@graphql-tools/stitch";
import usersSchema from "../users/resolvers.js";

export async function buildSuperSchema() {
  return stitchSchemas({
    subschemas: [usersSchema],
    typeDefs,
    resolvers,
  });
}
