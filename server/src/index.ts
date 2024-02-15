import { build } from "./build";

async function main() {
  const f = await build();

  f.listen({ port: 3000 }, (err) => {
    if (err) {
      f.log.error(err);
    }
  });
}

void main();
