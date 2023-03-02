import { auth, db, app } from "../firebase";
import { collection, doc, getDoc, addDoc, deleteDoc } from "firebase/firestore";

const getUserIdAndEmail = () => {
  const user = auth.currentUser;
  return { userId: user.uid, email: user.email };
};

const handleMatchButtonClick = async () => {
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
