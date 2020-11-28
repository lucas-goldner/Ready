import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

//   Add stuff with this code below
//   const post = orm.em.create(Post, { title: "my second post" });
//   await orm.em.persistAndFlush(post);

// Read stuff with code below
//   const posts = await orm.em.find(Post, {});
//   console.log(posts);

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();
  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4210, () => {
    console.log("server started on localhost:4210");
  });
};

main().catch((err) => {
  console.log(err);
});

console.log("Hello World");
