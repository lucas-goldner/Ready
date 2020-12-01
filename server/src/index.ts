import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __prod__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import "reflect-metadata";
import { UserResolver } from "./resolvers/user";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { sendEmail } from "./utils/sendEmails";
import { User } from "./entities/User";

//   Add stuff with this code below
//   const post = orm.em.create(Post, { title: "my second post" });
//   await orm.em.persistAndFlush(post);

// Read stuff with code below
//   const posts = await orm.em.find(Post, {});
//   console.log(posts);

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.em.nativeDelete(User, {});
  await orm.getMigrator().up();
  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,

        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: "andkajdahwadhdlgagdhaldahkjaaudgajkjidwifiu",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4210, () => {
    console.log("server started on localhost:4210");
  });
};

main().catch((err) => {
  console.log(err);
});

console.log("Hello World");
