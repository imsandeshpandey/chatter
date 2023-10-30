import { UserDB } from "@/@types/firebaseTypes";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./App";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const getUserData = async (
  uid: string,
  callback: (userObj: UserDB) => any = () => {},
) => {
  const res = await getDoc(doc(db, "users", uid));
  const userObj = res.data() as UserDB;
  callback(userObj);
  return userObj;
};

export const useUser = (uid?: string) => {
  const [user, setUser] = useState<UserDB>();
  useEffect(() => {
    uid && getUserData(uid, setUser);
  }, [uid]);
  return [user, setUser] as [UserDB, Dispatch<SetStateAction<UserDB>>];
};
