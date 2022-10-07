import { db } from "../firebase/client";
import { doc, setDoc } from "firebase/firestore";

export default async function updateListings(docID, docData) {
  const docRef = doc(db, "listings", docID);
  return await setDoc(docRef, docData, { merge: true })
    .then((msg) => msg)
    .catch((err) => console.error(err));
}
