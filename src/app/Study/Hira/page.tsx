"use client";

import React from "react";
import StudyPage from "../_components/StudyPage";

const HiraStudyPage = () => {
  return (
    <StudyPage dataPath={process.env.NEXT_PUBLIC_HIRAGANA_URL as string} />
  );
};

export default HiraStudyPage;
