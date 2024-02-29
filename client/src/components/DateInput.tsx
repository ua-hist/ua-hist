import { useEffect, useState } from "react";

export function DateInput(props: {
  date: number;
  setDate: (f: number) => void;
}) {
  const { date, setDate } = props;

  const [value, setValue] = useState<number>(date);

  useEffect(() => {
    if (value !== date) {
      setValue(date);
    }
  }, [date, value]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(value);
        setDate(value);
      }}
    >
      <div className="flex flex-row gap-2">
        <div>Date: </div>

        <div>
          <input
            type="number"
            value={value}
            onChange={(e) => {
              setValue(+e.target.value);
            }}
          />
        </div>
      </div>
    </form>
  );
}
