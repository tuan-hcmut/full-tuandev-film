import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase";

import { dataSignUp } from "../shared/variables";

import { signup, isLogin } from "../services/auth";

import { loginWithGoogle } from "../services/auth";

interface GeneralProps {
  children: JSX.Element[] | JSX.Element;
}

interface ContextProps {
  signUp: any;
  user: any;
  signUpWithGoogle: any;
}

const AuthContext = createContext<ContextProps>({
  signUp: {},
  user: {},
  signUpWithGoogle: {},
});

export const AuthProvider: React.FC<GeneralProps> = ({ children }) => {
  const [isLogedin, setIsLogedin] = useState({
    isLoged: undefined,
    user: null,
  });

  useEffect(() => {
    const isLoginFunc = async () => {
      setIsLogedin(await isLogin());
    };

    isLoginFunc();
  }, []);

  const signUp = async (data: dataSignUp) => {
    return await signup(data);
  };

  const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    if (res && res.user) {
      const response = await loginWithGoogle(res.user);

      if (response.status === 200) {
        await signOut(auth);
        window.location.href = "/";
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        user: isLogedin.user,
        signUpWithGoogle,
      }}
    >
      {isLogedin.isLoged !== undefined && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
