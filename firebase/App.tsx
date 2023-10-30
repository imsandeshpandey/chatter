import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_NqL1KbStGeerN22xx77odBygxUok49M",
  authDomain: "chatter-71bb5.firebaseapp.com",
  projectId: "chatter-71bb5",
  storageBucket: "chatter-71bb5.appspot.com",
  messagingSenderId: "507812920121",
  appId: "1:507812920121:web:758706d45e11730afdc6e8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
