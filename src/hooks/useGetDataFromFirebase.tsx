import { useState, useEffect } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

const useGetDataFromFirebase = (id: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    const docRef = doc(db, "groups", `${id}`);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  return { loading, data };
};

export default useGetDataFromFirebase;
