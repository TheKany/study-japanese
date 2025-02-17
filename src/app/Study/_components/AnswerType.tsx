import { ButtonBox } from "@/components/ButtonBox";
import React from "react";
import styled from "styled-components";

const AnswerType = () => {
  const onClickAnswerType = (type: string) => {
    switch (type) {
      case "voice":
        break;
      case "text":
        break;

      default:
        break;
    }
  };

  return (
    <BtnContainer>
      <ButtonBox onClick={() => onClickAnswerType("voice")}>voice</ButtonBox>
      <ButtonBox onClick={() => onClickAnswerType("text")}>text</ButtonBox>
    </BtnContainer>
  );
};

export default AnswerType;

const BtnContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;
