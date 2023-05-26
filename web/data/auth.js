import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "firebaseconfig";
import { doc, setDoc } from "firebase/firestore/lite";

export function continueWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  provider.setCustomParameters({
    login_hint: "user@babylonbee.com",
  });
  auth.languageCode = "it";

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
    })
    .then(() => {
      const user = auth.currentUser;
      setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        refreshToken: user.refreshToken,
        isAnonymous: user.isAnonymous,
      }).then(() => {
        return user;
      });
    })
    .catch((error) => {
      const errorcode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log({
        errorcode,
        errorMessage,
        email,
        credential,
      });
    });
}
