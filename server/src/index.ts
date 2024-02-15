import Fastify from "fastify";

const fastify = Fastify();

fastify.get("/", async () => {
  return { hello: "world" };
});

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
  }
});
