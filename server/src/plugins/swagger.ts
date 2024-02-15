import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export default fp(async (f) => {
  await f.register(swagger, {
    transform: (s) => {
      if (s.url.startsWith("/swagger")) {
        return s;
      }
      const tag = s.url.split("/")[1];
      const jsonSchema = jsonSchemaTransform(s);
      if (jsonSchema.schema === undefined) {
        jsonSchema.schema = { tags: [tag] };
      }
      else {
        jsonSchema.schema.tags = [tag];
      }

      return jsonSchema;
    },
    swagger: {
      info: {
        title: "Test swagger",
        description: "Testing the Fastify swagger API",
        version: "0.1.0",
      },
      host: "localhost:3000",
      tags: [],
      consumes: ["application/json"],
      produces: ["application/json"],
      securityDefinitions: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
    },
  });

  await f.register(swaggerUi, {
    routePrefix: "/swagger",
  });
});
