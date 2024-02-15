import { FastifyZod } from "fastify";
import { z } from "zod";

export default async function (f: FastifyZod) {
  const prisma = f.prisma;

  f.post("/", {
    schema: {
      body: z.array(
        z.object({
          time: z.string(),
          events: z.string(),
          eventsMarkup: z.string(),
          eventIndex: z.number(),
        }),
      ),
    },
  }, async (req, res) => {
    const eventsDto = req.body;

    const savedEvents = await prisma.historyEvent.createMany({
      data: eventsDto,
    });

    return res.status(201).send(savedEvents);
  });

  f.get("/", async () => {
    return await prisma.historyEvent.findMany({
      orderBy: {
        eventIndex: "asc",
      },
    });
  });

  f.delete("/:id", {
    schema: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
  }, async (req, res) => {
    const { id } = req.params;

    await prisma.historyEvent.delete({
      where: {
        id: id,
      },
    });

    return res.status(204).send({
      message: "deleted",
    });
  });
}
