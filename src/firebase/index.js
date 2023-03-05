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
  onSnapshot,
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
    localStorage.setItem("User", JSON.stringify(user));
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
  // check if there is another user in the collection
  // if not, mark this user as not_going_to_create_room
  // if yes, mark this user as going_to_create_room
};

const matchUsers = async () => {
  const unsubscribe = onSnapshot(
    collection(db, "matching_users"),
    (querySnapshot) => {
      if (querySnapshot.size === 2) {
        const doc1 = querySnapshot.docs[0];
        const doc2 = querySnapshot.docs[1];
        const user1 = doc1.data();
        const user2 = doc2.data();
        let matchedUser;
        if (auth.currentUser.uid === user1.userID) {
          matchedUser = user2;
        } else {
          matchedUser = user1;
        }
        addDoc(collection(db, "matches"), {
          matchedUser: matchedUser,
        })
          .then(() => {
            deleteDoc(doc(db, "matching_users", doc1.id));
            deleteDoc(doc(db, "matching_users", doc2.id));
            unsubscribe();
            return matchedUser;
          })
          .catch((error) => {
            console.error("Error adding matched user to database: ", error);
          });
      } else {
        console.log("Waiting for users to match...");
      }
    }
  );
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
  matchUsers,
};
