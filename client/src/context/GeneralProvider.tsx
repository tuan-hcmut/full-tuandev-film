import React, { createContext, useState, useEffect } from "react";

interface GeneralProps {
  children: JSX.Element[] | JSX.Element;
}

interface ContextProps {
  Scroll: boolean;
}

const GeneralContext = createContext<ContextProps>({
  Scroll: false,
});

export const GeneralProvider: React.FC<GeneralProps> = ({ children }) => {
  const [Scroll, setScroll] = useState(false);

  useEffect(() => {
    const scrollToTop = () => {
      setScroll(window.scrollY > 600);
    };

    window.addEventListener("scroll", scrollToTop);

    return () => {
      window.removeEventListener("scroll", scrollToTop);
    };
  }, []);

  return (
    <GeneralContext.Provider value={{ Scroll }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
