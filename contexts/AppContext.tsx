import { UserDB } from "@/@types/firebaseTypes";
import { Context, Dispatch, ReactNode, SetStateAction, useState } from "react";
import React, { createContext, useContextSelector } from "use-context-selector";
import { RequireAtLeastOne } from "@/@types/utils.types";

type AppContextType = {
  friends: Array<any>;
  setFriends: Dispatch<SetStateAction<Array<any>>>;
};

const AppContext = createContext<AppContextType | null>(null);
const useApp = (
  selector: (value: AppContextType) => RequireAtLeastOne<AppContextType>,
) => useContextSelector(AppContext as Context<AppContextType>, selector);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [friends, setFriends] = useState<Array<UserDB | null>>([]);
  const value = { friends, setFriends };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
