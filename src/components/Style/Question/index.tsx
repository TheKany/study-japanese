"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  correct: string;
};

const QuestionBox = ({ children, correct }: Props) => {
  const [isCorrect, setIsCorrect] = useState<string>("대기");

  useEffect(() => {
    setIsCorrect(correct);

    setTimeout(() => {
      setIsCorrect("대기");
    }, 1000);
  }, [correct]);

  console.log(correct);
  return (
    <QuestionContainer>
      <Question>{children}</Question>
      <ImageBox iscorrect={isCorrect} position="left">
        <ImageWrapper>
          <StyledImageLeft src={"/img/o.png"} alt="" width={40} height={40} />
          <StyledImageLeft
            src={"/img/correct03.png"}
            alt=""
            width={80}
            height={80}
          />
        </ImageWrapper>
      </ImageBox>
      <ImageBox iscorrect={isCorrect} position="right">
        <ImageWrapper>
          <StyledImageRight src={"/img/x.png"} alt="" width={40} height={40} />
          <StyledImageRight
            src={"/img/wrong04.png"}
            alt=""
            width={80}
            height={80}
          />
        </ImageWrapper>
      </ImageBox>
    </QuestionContainer>
  );
};

export default QuestionBox;

const QuestionContainer = styled.div`
  position: relative;
  margin: 16px 0;
  padding-bottom: 24px;
`;

const Question = styled.p`
  position: relative;
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

  z-index: 2;
`;

const ImageBox = styled.div<{ iscorrect: string; position: "left" | "right" }>`
  width: 80px;
  height: 80px;
  z-index: 1;

  position: absolute;
  top: 10px;
  ${({ position, iscorrect }) => {
    if (position === "left") {
      return `left: ${iscorrect === "정답" ? "10%" : "50%"};`;
    } else {
      return `left: ${
        iscorrect !== "정답" && iscorrect !== "대기" ? "90%" : "50%"
      };`;
    }
  }}
  transform: translate(-50%, 0);
  transition: left 0.3s ease-in-out;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const StyledImageLeft = styled(Image)<{ src: string }>`
  position: absolute;
  top: ${({ src }) => (src.includes("o.png") ? "70%" : "50%")};
  left: ${({ src }) => (src.includes("o.png") ? "20%" : "50%")};
  transform: translate(-50%, -50%);
`;

const StyledImageRight = styled(Image)<{ src: string }>`
  position: absolute;
  top: ${({ src }) => (src.includes("x.png") ? "15%" : "50%")};
  right: ${({ src }) => (src.includes("x.png") ? "10%" : "50%")};
  transform: translate(50%, -50%);
`;
