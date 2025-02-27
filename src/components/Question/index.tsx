"use client";

import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const QuestionBox = ({ children }: Props) => {
  return (
    <QuestionContainer>
      <Question>{children}</Question>
    </QuestionContainer>
  );
};

export default QuestionBox;

const QuestionContainer = styled.div`
  margin: 16px 0;
  padding-bottom: 24px;
`;

const Question = styled.p`
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  background-color: #ffd445;
  border: 2px solid #000;
  border-radius: 8px;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;
