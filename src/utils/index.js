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

const getBrowserVisibilityProp = () => {
  if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    return "visibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    return "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    return "webkitvisibilitychange";
  }
};

const getBrowserDocumentHiddenProp = () => {
  if (typeof document.hidden !== "undefined") {
    return "hidden";
  } else if (typeof document.msHidden !== "undefined") {
    return "msHidden";
  } else if (typeof document.webkitHidden !== "undefined") {
    return "webkitHidden";
  }
};

const getIsDocumentHidden = () => {
  return !document[getBrowserDocumentHiddenProp()];
};

export {
  handleMatchButtonClick,
  handleCancelClick,
  getIsDocumentHidden,
  getBrowserVisibilityProp,
  getBrowserDocumentHiddenProp,
};
