import { FastifyZod } from "fastify";
import { z } from "zod";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export interface JwtPayload extends jwt.JwtPayload {
  userId: string;
}

export class JwtService {
  constructor(private readonly secret: string) {}

  sign(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret);
  }

  verify(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload;
  }

  parseAndVerify(header: string): JwtPayload | null {
    const token = this.parseBearerToken(header);

    if (token) {
      return this.verify(token);
    }
    else {
      return null;
    }
  }

  parseBearerToken(jwtHeader: string): string | undefined {
    const bearer = jwtHeader.split(" ");
    const token = bearer[1];

    return token;
  }
}

export default async function (f: FastifyZod) {
  const prisma = f.prisma;
  const jwtService = new JwtService("secret");

  f.post("/signin", {
    schema: {
      body: z.object({
        email: z.string().email(),
        password: z.string().min(8),
      }),
    },
  }, async ({ body }, res) => {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return res.status(401).send({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Invalid email or password",
      });
    }

    const token = jwtService.sign({ userId: user.id });
    return res.send({ token });
  });

  f.post("/signup", {
    schema: {
      body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
      }),
    },
  }, async ({ body }, rep) => {
    try {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: hashedPassword,
        },
      });

      return rep.status(201).send(user);
    } catch (e) {
      f.log.error(e);
      return rep.status(409).send({
        message: "User already exists",
      });
    }
  });
}
