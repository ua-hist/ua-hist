import { useState } from "react";

export function DateInput(props: {
  date: number;
  setDate: (f: number) => void;
}) {
  const { date, setDate } = props;

  const [value, setValue] = useState<number>(date);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(value);
        setDate(value);
      }}
    >
      <input
        type="number"
        value={value}
        onChange={(e) => {
          setValue(+e.target.value);
        }}
      />
    </form>
  );
}
