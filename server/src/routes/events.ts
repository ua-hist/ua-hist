import { FastifyZod } from "fastify";
import { z } from "zod";

export default function (f: FastifyZod) {
  f.get("/", {
    schema: {
      querystring: z.object({
        foo: z.string(),
      }),
    },
  }, async (req) => {
    return {
      foo: req.query.foo,
    };
  });
}
