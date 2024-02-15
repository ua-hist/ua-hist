import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import prismaPlugin from "./plugins/prisma";

async function build() {
  const f = Fastify();
  await f.register(fastifyCors, {
    origin: "*",
  });
  await f.register(prismaPlugin, {
    databaseUrl: "postgresql://user:user@localhost:6262/user?schema=public",
  });

  return f;
}

async function main() {
  const f = await build();

  f.get("/", async () => {
    return { hello: "world" };
  });

  f.listen({ port: 3000 }, (err) => {
    if (err) {
      f.log.error(err);
    }
  });
}

void main();
