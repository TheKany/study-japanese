"use client";

import NormalizeCss from "@/styles/NormalizeCss";
import ResetCss from "@/styles/resetCss";
import React from "react";

const GlobalStyles = () => {
  return (
    <>
      <ResetCss />
      <NormalizeCss />
    </>
  );
};

export default GlobalStyles;
