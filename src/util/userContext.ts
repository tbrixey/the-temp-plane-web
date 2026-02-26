import { createContext } from "react";
import { User } from "../types/user";

const userContext = createContext<{ user: User | undefined; setUser: any }>({
  user: undefined,
  setUser: (user: any) => {},
});

export default userContext;
