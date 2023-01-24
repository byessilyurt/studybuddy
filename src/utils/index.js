import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
// get the current user's ID from firebase
const getUserIdAndEmail = () => {
  const user = auth.currentUser;
  return { userId: user.uid, email: user.email };
};

const handleMatchButtonClick = async () => {
  // Get the user's ID and current timestamp
  const userInfo = getUserIdAndEmail();
  const timestamp = Date.now();

  // Create a new document with the user's ID, status as "matching", and timestamp
  await addDoc(collection(db, "matching_users"), {
    userID: userInfo.userId,
    email: userInfo.email,
    status: "matching",
    timestamp: timestamp,
  });
};

export { handleMatchButtonClick };
