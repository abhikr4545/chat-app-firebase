import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const useGetUserName = (id: any, collectionName: string) => {
  const [loading, setLoading] = useState(false);
  const [userName, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const docRef = doc(db, collectionName, `${id}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUsername(docSnap.data()?.username)
      }
      setLoading(false);
    };

    fetchData();
  }, [id, collectionName]);

  return { loading, userName };
};

export default useGetUserName;
