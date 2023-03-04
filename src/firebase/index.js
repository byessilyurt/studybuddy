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
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
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

const logout = async () => {
  try {
    await removeFromMatchingUsers();
    sessionStorage.removeItem("Auth Token");
    signOut(auth);
  } catch (err) {
    console.error(err);
  }
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
    timestamp: timestamp,
  });
  await new Promise((r) => setTimeout(r, 1000));
  await matchUsers();
};

const matchUsers = async () => {
  const q = query(collection(db, "matching_users"));
  const docs = await getDocs(q);
  if (docs.docs.length === 2) {
    const doc1 = docs.docs[0];
    const doc2 = docs.docs[1];
    const user1 = doc1.data();
    const user2 = doc2.data();
    await addDoc(collection(db, "matches"), {
      user1: user1,
      user2: user2,
    });
    await deleteDoc(doc(db, "matching_users", doc1.id));
    await deleteDoc(doc(db, "matching_users", doc2.id));
  }
  // add user1 and user2 to global state
  // set matched to true
};

const removeFromMatchingUsers = async () => {
  const userInfo = getUserIdAndEmail();
  const q = query(
    collection(db, "matching_users"),
    where("userID", "==", userInfo.userId)
  );
  const docs = await getDocs(q);
  await deleteDoc(doc(db, "matching_users", docs.docs[0].id));
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
