import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from "../firebase";

const useUsernameAvailability =  () => {
  const checkUsername = async (username: string) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);      

      if (querySnapshot.empty) {
        return false
      }

      return true;

    } catch (error) {
      console.log(error);
    }
  }

  return { checkUsername }
};

export default useUsernameAvailability;
