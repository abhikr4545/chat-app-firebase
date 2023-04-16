import { useState } from "react";
import { doc, updateDoc, arrayUnion, getDoc, FieldValue } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from 'uuid';

const useAddMessageToGroup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const addMessage = async (message: string, groupId: string) => {
    try {
      setLoading(true);
      const groupRef = doc(db, "groups", groupId);
      const groupSnap = await getDoc(groupRef);

      const messageData = {
        message,
        messageId: uuidv4(),
        sendBy: user?.email,
        sendAt: new Date()
      };

      if (groupSnap.exists() && groupSnap.data().messages === undefined) {
        console.log("messages exists");
        await updateDoc(groupRef, {
          messages: []
        });
        await updateDoc(groupRef, {
          messages: arrayUnion(messageData)
        });
      } else {
        await updateDoc(groupRef, {
          messages: arrayUnion(messageData)
        });
      }

      setLoading(false);
    } catch (error: any) {
      setError(error?.message);
      console.log(error);
      setLoading(false);
    }
  }

  return { loading, addMessage, error };
}

export default useAddMessageToGroup;