import { Feature } from "geojson";
import { useState } from "react";
import { getMaps } from "../api/get-maps";

export function DateInput(props: { setFeats: (f: Feature<any>[]) => void }) {
  const [date, setDate] = useState<number | undefined>();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(date);
        if (!date) {
          return;
        }
        const data = await getMaps(date);
        // props.setFeats([]);
        // await new Promise((r) => setTimeout(r, 200));
        props.setFeats(data);
      }}
    >
      <input
        type="number"
        value={date}
        onChange={(e) => {
          setDate(+e.target.value);
        }}
      />
    </form>
  );
}
