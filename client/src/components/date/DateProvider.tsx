import { PropsWithChildren, useEffect, useState } from "react";
import { StorageHelper } from "../../utils/storage";
import { DateContext } from "./DateContext";

export function DateProvider(props: PropsWithChildren) {
  const [date, setDate] = useState<number>(StorageHelper.get("date", 900));

  useEffect(() => {
    const persistedDate = StorageHelper.get<number | null>("date", null);

    if (persistedDate !== date) {
      StorageHelper.set("date", date);
    }
  }, [date]);

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {props.children}
    </DateContext.Provider>
  );
}
