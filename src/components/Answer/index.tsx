"use client";

import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const AnswerBox = ({ children }: Props) => {
  return <AnswerContainer>{children}</AnswerContainer>;
};

export default AnswerBox;

const AnswerContainer = styled.div`
  width: 100%;
  margin: 8px auto;
  display: flex;
  align-items: center;
  gap: 8px;
`;
