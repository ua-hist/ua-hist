import Fastify, { FastifyZod } from "fastify";
import fastifyCors from "@fastify/cors";
import prismaPlugin from "./plugins/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import eventRoutes from "./routes/events";
import swaggerPlugin from "./plugins/swagger";
import { readFile, readdir } from "fs/promises";
import { join } from "path";

export async function build(): Promise<FastifyZod> {
  const f = Fastify({
    logger: true,
  });
  await f.register(swaggerPlugin);
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

  function findInsertPosition(numbers, K) {
    let low = 0;
    let high = numbers.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);

      if (numbers[mid] === K) {
        return mid + 1;
      } else if (numbers[mid] < K) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return low;
  }

  (f as unknown as FastifyZod).get(
    "/maps/:year",
    {
      schema: {
        params: z.object({
          year: z.string(),
        }),
      },
    },
    async (req, res) => {
      const { year: strYear } = req.params;

      const year = parseInt(strYear);

      const files = await readdir(join(__dirname, "../geojson"));

      const years = files
        .map((file) => parseInt(file.replace(".geojson", "")))
        .sort((a, b) => a - b);

      const foundYear = years[findInsertPosition(years, year) - 1];

      if (!foundYear) {
        return undefined;
      }

      const json = JSON.parse(
        (
          await readFile(join(__dirname, `../geojson/${foundYear}.geojson`))
        ).toString()
      );

      return json;
    }
  );

  return f.withTypeProvider<ZodTypeProvider>();
}
