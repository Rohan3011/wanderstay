import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/client";

export function useFetchListings() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const ListingCollectionRef = collection(db, "listings");
        const querySnapshot = await getDocs(ListingCollectionRef);
        querySnapshot.forEach((doc) => {
          setData((data) => [...data, doc.data()]);
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { loading, error, data };
}
