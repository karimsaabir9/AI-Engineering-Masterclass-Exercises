"use client";
import Header from "./_components/Header";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { TripContextType, TripDetailContext } from "@/context/TripDetailContext";
import { TripInfo } from "./create-new-trip/_components/ChatBox";
import { Doc } from "@/convex/_generated/dataModel";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const CreateUser = useMutation(api.user.CreateNewUser);
  const [userDetail, setUserDetail] = useState<Doc<"UserTable"> | null>();
  const [tripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null);
  const { user } = useUser();

  const CreateNewUser = async () => {
    if (user) {
      // Save New User if Not Exist
      const result = await CreateUser({
        email: user?.primaryEmailAddress?.emailAddress ?? "",
        imageUrl: user?.imageUrl,
        name: user?.fullName ?? "",
      });
      setUserDetail(result);
    }
  };

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <TripDetailContext.Provider value={{tripDetailInfo, setTripDetailInfo}}>
      <div>
        <Header />
        {children}
      </div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  );
};

export default Provider;

export const useUserDetail = () => {
  return useContext(UserDetailContext);
};


export const useTripDetail = ():TripContextType | undefined => {
  return useContext(TripDetailContext);
}