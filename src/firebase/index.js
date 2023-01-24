import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
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

// sign up with Google
// const signUpWithGoogle = async () => {
//   const provider = new app.auth.GoogleAuthProvider();
//   try {
//     const { user } = await app.auth().signInWithPopup(provider);
//     const { email, displayName } = user;
//     await app.auth().createUserWithEmailAndPassword(email, displayName);
//     console.log("User signed up with Google successfully!");
//   } catch (error) {
//     console.log(error);
//   }
// };
const logout = () => {
  signOut(auth);
};

export { signInWithGoogle, logout, auth, app, db };
