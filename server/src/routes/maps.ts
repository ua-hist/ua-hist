import { FastifyZod } from "fastify";
import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { z } from "zod";

export default async function (f: FastifyZod) {
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

  f.get(
    "/:year",
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

      const files = await readdir(join(__dirname, "../../geojson"));

      const years = files
        .map((file) => parseInt(file.replace(".geojson", "")))
        .sort((a, b) => a - b);

      const foundYear = years[findInsertPosition(years, year) - 1];

      if (!foundYear) {
        return undefined;
      }

      const json = JSON.parse(
        (
          await readFile(join(__dirname, `../../geojson/${foundYear}.geojson`))
        ).toString()
      );

      return json;
    }
  );
}
