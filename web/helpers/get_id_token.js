import { auth } from "firebaseconfig";

export default async function getFirebaseClientIdToken() {
  try {
    const token = await auth.currentUser.getIdToken(true);
    return token
  } catch (error) {
    console.log(error);
  }
}
