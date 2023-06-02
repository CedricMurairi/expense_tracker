import getExpendituresFromAPI from "@data/get_expenditures_api";
import getFirebaseClientIdToken from "@helpers/get_id_token";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "firebaseconfig";

export default async function getExpeditures() {
  try {
    const user = await new Promise((resolve, reject) => {
      onAuthStateChanged(auth, resolve, reject);
    });

    if (user) {
      const idToken = await getFirebaseClientIdToken();
      const spendings = await getExpendituresFromAPI(idToken);

      return spendings.expenditures;
    }
  } catch (error) {
    console.error(error);
  }
}
