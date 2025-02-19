"use client";

import Navigation from "@/components/Navigation";
import SlideArrow from "@/components/SVG/SlideArrow";
import Wrapper from "@/components/Wrapper/Wrapper";
import { LangType } from "@/type/types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const LangListPage = () => {
  const [hiradatas, setHiraDatas] = useState<LangType[]>([]);
  const [gataDatas, setGataDatas] = useState<LangType[]>([]);
  const [slideIdx, setSlideIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState<number | null>();

  const onLoadData = async () => {
    try {
      const hiraRes = await fetch(
        process.env.NEXT_PUBLIC_HIRAGANA_URL as string
      );
      const resHira = await hiraRes.json();
      const gataRes = await fetch(
        process.env.NEXT_PUBLIC_KATAKANA_URL as string
      );
      const resGata = await gataRes.json();

      setHiraDatas(resHira);
      setGataDatas(resGata);
    } catch (err) {
      console.error("데이터 로드 중 오류 발생:", err);
    }
  };

  const onClickFlip = (id: number) => {
    setIsFlipped(id);

    setTimeout(() => {
      setIsFlipped(null);
    }, 3000);
  };

  const slideLeft = () => {
    setSlideIdx((prev) => Math.max(prev - 1, 0));
  };

  const slideRight = () => {
    setSlideIdx((prev) => Math.min(prev + 1, 1));
  };

  useEffect(() => {
    onLoadData();
  }, []);

  return (
    <Wrapper>
      <Navigation />
      <SlideWrapper>
        <SlideButton
          onClick={slideLeft}
          style={
            slideIdx === 1
              ? { visibility: "visible" }
              : { visibility: "hidden" }
          }
        >
          <SlideArrow />
        </SlideButton>

        <SlickContainer style={{ transform: `translateX(-${slideIdx * 50}%)` }}>
          <SlickBox>
            <Title>히라가나</Title>
            <WordContainer>
              {hiradatas.map((el) => {
                return (
                  <WordBox key={el.id} onClick={() => onClickFlip(el.id)}>
                    <WordCard className={isFlipped === el.id ? "flipped" : ""}>
                      <WordCardFront>{el.word}</WordCardFront>
                      <WordCardBack>{el.speakWord}</WordCardBack>
                    </WordCard>
                  </WordBox>
                );
              })}
            </WordContainer>
          </SlickBox>

          <SlickBox>
            <Title>가타카나</Title>
            <WordContainer>
              {gataDatas.map((el) => {
                return (
                  <WordBox key={el.id} onClick={() => onClickFlip(el.id)}>
                    <WordCard className={isFlipped === el.id ? "flipped" : ""}>
                      <WordCardFront>{el.word}</WordCardFront>
                      <WordCardBack>{el.speakWord}</WordCardBack>
                    </WordCard>
                  </WordBox>
                );
              })}
            </WordContainer>
          </SlickBox>
        </SlickContainer>

        <SlideButton
          onClick={slideRight}
          style={
            slideIdx === 0
              ? { visibility: "visible" }
              : { visibility: "hidden" }
          }
        >
          <SlideArrow />
        </SlideButton>
      </SlideWrapper>
    </Wrapper>
  );
};

export default LangListPage;

const Title = styled.p`
  width: 100%;
  text-align: center;
  padding: 8px 0;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 700;
`;

const SlideWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  min-width: 300px;
`;

const SlickContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 200%;
  transition: transform 0.5s ease-in-out;
`;

const SlickBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

const SlideButton = styled.button`
  height: 200px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #171717;
  padding: 8px 16px;
  z-index: 10;
  background: none;
  border: none;
  cursor: pointer;

  &:first-of-type {
    left: 0;
    transform: translateY(-50%) scaleX(-1);
  }

  &:last-of-type {
    right: 0;
  }
`;

const WordContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  place-items: center;
  align-items: center;
`;

const WordBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  width: 40px;
  height: 40px;
`;

const WordCard = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;

  &.flipped {
    transform: rotateY(180deg);
  }
`;

const WordCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-size: 20px;
  backface-visibility: hidden;

  border: 1px solid #aaa;
  border-radius: 50%;
`;

const WordCardBack = styled(WordCardFront)`
  transform: rotateY(180deg);
  position: absolute;
  background-color: #cbe5fb;
`;
