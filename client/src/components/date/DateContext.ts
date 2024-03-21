import { createContext, useContext } from "react";

export type DateContextType = {
  date: number;
  setDate: (v: number) => void;
};

export const DateContext = createContext<DateContextType>(
  {} as DateContextType,
);

export const useDateContext = () => useContext(DateContext);
