import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  query,
  doc,
  getDocs,
  collection,
  where,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZwDfFnH_cxca88WaQ_on7mnqNv4BaaZE",
  authDomain: "studybuddy-7fd62.firebaseapp.com",
  projectId: "studybuddy-7fd62",
  storageBucket: "studybuddy-7fd62.appspot.com",
  messagingSenderId: "800200913730",
  appId: "1:800200913730:web:6b5e7b31101e7520350edb",
  measurementId: "G-Y85Q23LPZX",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// login with Google
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    sessionStorage.setItem("Auth Token", res._tokenResponse.refreshToken);
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const getUserIdAndEmail = () => {
  const user = auth.currentUser;
  return { userId: user.uid, email: user.email };
};

const addToMatchingUsers = async () => {
  const userInfo = getUserIdAndEmail();
  const timestamp = Date.now();
  await addDoc(collection(db, "matching_users"), {
    userID: userInfo.userId,
    email: userInfo.email,
    status: "matching",
    timestamp: timestamp,
  });
  console.log(userInfo.email, "has been added to the database");
};

const removeFromMatchingUsers = async () => {
  const userInfo = getUserIdAndEmail();
  const q = query(
    collection(db, "matching_users"),
    where("userID", "==", userInfo.userId)
  );
  const docs = await getDocs(q);
  console.log(docs.docs[0].id);
  await deleteDoc(doc(db, "matching_users", docs.docs[0].id))
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

export {
  signInWithGoogle,
  logout,
  auth,
  app,
  db,
  addToMatchingUsers,
  removeFromMatchingUsers,
};
