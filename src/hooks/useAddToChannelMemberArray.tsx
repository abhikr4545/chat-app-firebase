import { doc, updateDoc, getDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const useAddToChannelMemberArray = () => {
  const addMember = async (docId: string, userId: string) => {
    try {
      const groupRef = doc(db, "groups", docId);
      const groupDoc = await getDoc(groupRef);
      if (groupDoc.exists()) {
        const groupData = groupDoc.data();
        if (groupData?.members) {
          if (!groupData.members.includes(userId)) {
            await updateDoc(groupRef, {
              members: arrayUnion(userId)
            });
          }
        } else {
          await setDoc(groupRef, {
            members: [userId]
          }, { merge: true });
        }
      } else {
        console.log("The group doesn't exist");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return { addMember };
};

export default useAddToChannelMemberArray;