import { createContext } from "react";

import { Language } from "../utils/constant";
import { StateType } from "../types/common";

export type SettingsContextType = {
    language: StateType<Language>;
    menu: StateType<boolean>;
}
// eslint-disable-next-line
export const SettingsContext: any = createContext<SettingsContextType | null>(null);