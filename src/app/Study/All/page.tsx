"use clinet";

import React from "react";
import StudyPage from "../_components/StudyPage";

const AllStudyPage = () => {
  return <StudyPage dataPath={process.env.NEXT_PUBLIC_ALLKANA_URL as string} />;
};

export default AllStudyPage;
