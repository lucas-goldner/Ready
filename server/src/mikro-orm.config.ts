import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM, Options } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";

const config: Options = {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
  dbName: "readydb",
  debug: !__prod__,
  type: "postgresql",
  password: "lol123",
};

export default config;
