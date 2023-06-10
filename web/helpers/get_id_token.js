import { auth } from "firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";

export default async function getFirebaseClientIdToken() {
  try {
    const user = await new Promise((resolve, reject) => {
      onAuthStateChanged(auth, resolve, reject);
    });
    const token = await user.getIdToken(true);
    return token;
  } catch (error) {
    console.log(error);
  }
}
