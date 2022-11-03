import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/client";

export default async function exploreAPI(req, res) {
  try {
    const ListingCollectionRef = collection(db, "listings");
    const querySnapshot = await getDocs(ListingCollectionRef);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
}
