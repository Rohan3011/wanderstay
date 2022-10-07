import { db, storage } from "../firebase/client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, addDoc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export async function postListing(props) {
  const uploadImageToStorage = async () => {
    const imageRef = ref(storage, `images/${props.image.path}-${uuidv4()}`);
    if (!props.image) return;
    return await uploadBytes(imageRef, props.image)
      .then((snapshot) => snapshot.ref)
      .catch(() => console.log("Image upload failed"));
  };

  const postListingsToFB = async (imageRef) => {
    const docID = uuidv4();
    const imageUrl = await getDownloadURL(imageRef);
    const docRef = doc(db, "listings", docID);
    const docData = {
      ...props,
      id: docID,
      image: imageUrl,
    };

    return await setDoc(docRef, docData)
      .then((msg) => msg)
      .catch((err) => console.error(err));
  };

  const addToUserListings = async (id) => {
    const userRef = doc(db, "users", props.id);
    return await addDoc(userRef, {
      listing_id: id,
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const resUploadedToDB = await uploadImageToStorage();
  const resPostedToFB = await postListingsToFB(resUploadedToDB);
  //   const resAddToUserListings = await addToUserListings(resPostedToFB.id);
  //   console.log(resAddToUserListings);
}
