import { addToMatchingUsers, removeFromMatchingUsers } from "../firebase";

const handleMatchButtonClick = async () => {
  try {
    await addToMatchingUsers();
    return true;
  } catch (error) {
    return error;
  }
};

const handleCancelButtonClick = async () => {
  removeFromMatchingUsers();
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
  handleCancelButtonClick,
  getIsDocumentHidden,
  getBrowserVisibilityProp,
  getBrowserDocumentHiddenProp,
};
