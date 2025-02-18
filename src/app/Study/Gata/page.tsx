"use client";

import React from "react";
import StudyPage from "../_components/StudyPage";

const GataStudyPage = () => {
  return (
    <StudyPage dataPath={process.env.NEXT_PUBLIC_KATAKANA_URL as string} />
  );
};

export default GataStudyPage;
