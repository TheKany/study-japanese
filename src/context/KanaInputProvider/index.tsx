"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface KanaInputContextType {
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string>>;
}

const KanaInputContext = createContext<KanaInputContextType | undefined>(
  undefined
);

export const KanaInputProvider = ({ children }: { children: ReactNode }) => {
  const [userInput, setUserInput] = useState("");

  return (
    <KanaInputContext.Provider value={{ userInput, setUserInput }}>
      {children}
    </KanaInputContext.Provider>
  );
};

export const useUserInput = () => {
  const context = useContext(KanaInputContext);
  if (!context) {
    throw new Error("useUserInput must be used within a UserInputProvider");
  }
  return context;
};
