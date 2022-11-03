import { db } from "../firebase/client";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

export async function updateListings(listingID, docData) {
  const docRef = doc(db, "listings", listingID);
  try {
    const msg = await setDoc(docRef, docData, { merge: true });
    return msg;
  } catch (err) {
    return console.error(err);
  }
}
export async function deleteListings(listingID) {
  const docRef = doc(db, "listings", listingID);
  try {
    const msg = await deleteDoc(docRef);
    return msg;
  } catch (err) {
    return console.error(err);
  }
}

export async function bookListings(userID, listingID, docData) {
  const userRef = doc(db, "users", userID);
  const docRef = doc(userRef, "listings", listingID);
  try {
    const msg = await setDoc(docRef, docData);
    return msg;
  } catch (err) {
    return console.error(err);
  }
}
