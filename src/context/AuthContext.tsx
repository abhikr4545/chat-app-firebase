import { createContext, useContext, useState } from "react";
import { User as FirebaseUser, UserCredential, signOut } from "firebase/auth";
import { auth } from "../firebase";

type AuthState = {
  isAuthenticated: boolean;
  login: (currentUser: UserCredential) => void;
  logout: () => void;
  user: FirebaseUser | null;
};

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  login: (currentUser: UserCredential) => {},
  logout: () => {},
  user: null,
});

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  const login = async (currentUser: UserCredential) => {
    setIsAuthenticated(true);
    setUser(currentUser.user);
  };

  const logout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
    setUser(null);
  };

  const authState: AuthState = { isAuthenticated, login, logout, user };

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthState => useContext(AuthContext);
