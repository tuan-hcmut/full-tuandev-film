import React, { createContext, useEffect, useState } from "react";

import { dataSignUp } from "../shared/variables";

import { signup, isLogin } from "../services/auth";

interface GeneralProps {
  children: JSX.Element[] | JSX.Element;
}

interface ContextProps {
  signUp: any;
  user: any;
}

const AuthContext = createContext<ContextProps>({
  signUp: {},
  user: {},
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

  return (
    <AuthContext.Provider
      value={{
        signUp,
        user: isLogedin.user,
      }}
    >
      {isLogedin.isLoged !== undefined && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
