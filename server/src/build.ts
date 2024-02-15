import Fastify, { FastifyZod } from "fastify";
import fastifyCors from "@fastify/cors";
import prismaPlugin from "./plugins/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import eventRoutes from "./routes/events";

export async function build(): Promise<FastifyZod> {
  const f = Fastify();
  await f.register(fastifyCors, {
    origin: "*",
  });
  await f.register(prismaPlugin, {
    databaseUrl: "postgresql://user:user@localhost:6262/user?schema=public",
  });

  f.setValidatorCompiler(validatorCompiler);
  f.setSerializerCompiler(serializerCompiler);
  f.setErrorHandler(async (err, _req, rep) => {
    if (err instanceof z.ZodError) {
      return rep.status(400).send({
        message: "Invalid request",
        issues: err.issues,
      });
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      const code = err.code;

      // not found
      if (code === "P2018" || code === "P2025") {
        return rep.status(404).send({
          message: "Not found",
        });
      }
    }

    return rep.status(500).send(err.message);
  });

  await f.register(eventRoutes, {
    prefix: "/events",
  });

  return f.withTypeProvider<ZodTypeProvider>();
}
