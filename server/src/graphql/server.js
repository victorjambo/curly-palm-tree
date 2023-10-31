import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSuperSchema } from "./schemas.js";
import { context } from "./context.js";

(async () => {
  const server = new ApolloServer({
    schema: await buildSuperSchema(),
  });

  const { url } = await startStandaloneServer(server, {
    context,
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
