import { Context, createContext } from "react";

type PageTitleContextType = {
    pageTitle: any,
    setPageTitle: (value: any) => void
}
// eslint-disable-next-line
export const PageTitleContext: Context<PageTitleContextType | null> = createContext(null);