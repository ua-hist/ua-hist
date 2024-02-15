import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export default fp(async (f, { databaseUrl }: { databaseUrl: string }) => {
  const prisma = new PrismaClient({
    datasourceUrl: databaseUrl,
  });
  await prisma.$connect();

  f.decorate("prisma", prisma);

  f.addHook("onClose", async () => {
    await prisma.$disconnect();
  });
});
