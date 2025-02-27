import React from "react";
import { KanaInputProvider } from "./KanaInputProvider";

type Props = {
  children: React.ReactNode;
};

const AppProviders = ({ children }: Props) => {
  return <KanaInputProvider>{children}</KanaInputProvider>;
};

export default AppProviders;
