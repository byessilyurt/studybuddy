import { auth, db, app } from "../firebase";
import { collection, doc, getDoc, addDoc, deleteDoc } from "firebase/firestore";
// get the current user's ID from firebase
const getUserIdAndEmail = () => {
  const user = auth.currentUser;
  return { userId: user.uid, email: user.email };
};

// look for other users whose status also matching and match them

const handleMatchButtonClick = async () => {
  // Get the user's ID and current timestamp
  const userInfo = getUserIdAndEmail();
  const timestamp = Date.now();
  await addDoc(collection(db, "matching_users"), {
    userID: userInfo.userId,
    email: userInfo.email,
    status: "matching",
    timestamp: timestamp,
  });
};

const handleCancelClick = async () => {
  const userInfo = getUserIdAndEmail();
  await deleteDoc(collection(db, "matching_users"), userInfo.userId);
};

export { handleMatchButtonClick, handleCancelClick };
