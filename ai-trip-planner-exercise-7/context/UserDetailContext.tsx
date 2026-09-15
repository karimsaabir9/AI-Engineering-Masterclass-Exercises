import { Doc } from "@/convex/_generated/dataModel";
import { createContext, Dispatch, SetStateAction } from "react";

export type UserDetailContextType = {
  userDetail: Doc<"UserTable"> | null | undefined;
  setUserDetail: Dispatch<SetStateAction<Doc<"UserTable"> | null | undefined>>;
};

export const UserDetailContext = createContext<UserDetailContextType | undefined>(
  undefined
);
