import { db } from "../firebase/client";
import { doc, setDoc } from "firebase/firestore";

export async function BookListing({ userID, listingID }) {
  const docRef = doc(db, `users/${userID}/listings`, listingID);
  return await setDoc(docRef, docData)
    .then((msg) => msg)
    .catch((err) => console.error(err));
}
