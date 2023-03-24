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
  runTransaction,
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
        photoURL: user.photoURL,
        displayName: user.displayName,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = async (matchId) => {
  try {
    await endMatch(matchId);
    sessionStorage.removeItem("Auth Token");
    const event = new CustomEvent("userLoggedOut");
    window.dispatchEvent(event);
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
};
const matchUsers = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      collection(db, "matching_users"),
      async (querySnapshot) => {
        if (querySnapshot.size >= 2) {
          const doc1 = querySnapshot.docs[0];
          const doc2 = querySnapshot.docs[1];
          const user1 = doc1.data();
          const user2 = doc2.data();

          // Sort user IDs to avoid duplicate match documents
          const sortedUserIds = [user1.userID, user2.userID].sort();
          const matchId = sortedUserIds.join("_");
          console.log(matchId);

          try {
            await runTransaction(db, async (transaction) => {
              const matchDocRef = doc(db, "matches", matchId);
              const matchDocSnapshot = await transaction.get(matchDocRef);

              // If the match document does not exist, create it
              if (!matchDocSnapshot.exists()) {
                transaction.set(matchDocRef, {
                  user1,
                  user2,
                });

                transaction.delete(doc(db, "matching_users", doc1.id));
                transaction.delete(doc(db, "matching_users", doc2.id));
              }
            });

            // Determine the authorized user and the matched user
            const currentUserId = getUserIdAndEmail().userId;
            const authorizedUser =
              user1.userID === currentUserId ? user1 : user2;
            const matchedUser = user1.userID === currentUserId ? user2 : user1;

            unsubscribe();
            resolve({ matchId, matchedUser });
          } catch (error) {
            console.error("Error adding matched users to database: ", error);
            reject(error);
          }
        } else {
          console.log("Waiting for users to match...");
        }
      }
    );
  });
};

const endMatch = async (matchId) => {
  try {
    await deleteDoc(doc(db, "matches", matchId));
    console.log("Match ended successfully");
  } catch (error) {
    console.error("Error ending match: ", error);
  }
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
  endMatch,
};
