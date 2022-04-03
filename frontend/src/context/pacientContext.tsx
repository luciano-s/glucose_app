import React from "react";
import { IPacient } from "../types";

export const pacientContext = React.createContext<{
  pacient: IPacient | null;
  setPacient: (p: IPacient) => void;
}>({
  pacient: null,
  setPacient: () => null,
});
