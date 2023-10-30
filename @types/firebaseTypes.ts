import { Timestamp } from "firebase/firestore";

export type UserDB = {
  uid: string;
  friends: Array<any>;
  photoURL: string | undefined;
  emailVerified: boolean;
  email: string;
  displayName: string;
  createdAt: Timestamp;
};
