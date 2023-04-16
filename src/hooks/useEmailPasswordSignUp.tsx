import { useState } from "react";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { User as FirebaseUser, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

interface SignUpState {
  isLoading: boolean;
  error: any;
  user: FirebaseUser | null;
}

const useEmailPasswordSignUp = () => {
  const [signUpState, setSignUpState] = useState<SignUpState>({ isLoading: false, error: null, user: null });

  const signUp = async (email: string, password: string, username: string) => {
    setSignUpState({ isLoading: true, error: null, user: null });

    try {
      const { user }: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", email), {
        username
      });
      setSignUpState({ isLoading: false, error: null, user });

    } catch (error: any) {
      setSignUpState({ isLoading: false, error, user: null });
      throw error;
    }
  }

  return { signUpState, signUp };
};

export default useEmailPasswordSignUp;