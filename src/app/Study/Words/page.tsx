"use client";

import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {
  DakutenKey,
  HandakutenKey,
  KanaRowKey,
  baseKana,
  baseKanaKeys,
  dakutenMap,
  handakutenMap,
  modifiers,
  smallKanaMap,
} from "@/type/keyboardType";
import Wrapper from "@/components/Wrapper/Wrapper";
import Navigation from "@/components/Navigation";
import { WordType } from "@/type/types";

const PatternPage = () => {
  const [datas, setDatas] = useState<WordType[]>([]);
  const [shuffleDatas, setShuffleDatas] = useState<WordType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<WordType | null>(null);
  const [subButtons, setSubButtons] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState({ total: 0, currect: 0 });

  const shuffleArray = (array: WordType[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const onLoadData = useCallback(async () => {
    try {
      const fetchData = await fetch(
        "https://japanese-word-data.pages.dev/word_one.json"
      );
      const resData = await fetchData.json();
      setDatas(resData);

      const shuffledData = shuffleArray(resData);
      setShuffleDatas(shuffledData);
      setCurrentQuestion(shuffledData[0]);
    } catch (err) {
      console.error("데이터 로드 중 오류 발생:", err);
    }
  }, []);

  const onClickMain = (id: KanaRowKey) => {
    if (id === "BACK") {
      setUserInput(userInput.slice(0, -1));
    } else {
      setSubButtons(baseKana[id]);
    }
  };

  const onClickSub = (text: string) => {
    setUserInput((prev) => prev + text);
  };

  const onClickModi = (modi: string) => {
    if (!userInput) return;

    const lastChar = userInput[userInput.length - 1];

    // 탁점 (゛) 변형
    if (modi === "゛" && lastChar in dakutenMap) {
      setUserInput(
        (prev) => prev.slice(0, -1) + dakutenMap[lastChar as DakutenKey]
      );
      return;
    }

    // 반탁점 (゜) 변형
    if (modi === "゜" && lastChar in handakutenMap) {
      setUserInput(
        (prev) => prev.slice(0, -1) + handakutenMap[lastChar as HandakutenKey]
      );
      return;
    }

    // 작은 글자 변형 (ゃ, ゅ, ょ)
    if (["ゃ", "ゅ", "ょ"].includes(modi) && lastChar in smallKanaMap) {
      const transformedKana =
        smallKanaMap[lastChar as keyof typeof smallKanaMap][
          modi as "ゃ" | "ゅ" | "ょ"
        ];
      setUserInput((prev) => prev.slice(0, -1) + transformedKana);
      return;
    }

    // 促音 (っ, 작은 つ) 변형
    if (modi === "っ") {
      setUserInput((prev) => prev + "っ");
      return;
    }
  };

  const onClickShowHint = () => {
    setShowHint(!showHint);
  };

  useEffect(() => {
    onLoadData();
  }, [onLoadData]);

  useEffect(() => {
    if (shuffleDatas.length > 0) {
      setCurrentQuestion(shuffleDatas[0]);
    }
  }, [shuffleDatas]);
  return (
    <Wrapper>
      <Navigation />

      <InfoContainer>
        <ScoreBox>
          <p>
            {score.currect}/{score.total}
          </p>
        </ScoreBox>
      </InfoContainer>

      <QuestionContainer>
        <Question>{currentQuestion ? currentQuestion.mean : "..."}</Question>

        <HintContainer>
          <HintBtn onClick={onClickShowHint}>
            글자힌트
            {/* <HintSub>* 누르면 점수 없음</HintSub> */}
          </HintBtn>

          <HintWord $show={showHint}>{currentQuestion?.word}</HintWord>
        </HintContainer>
      </QuestionContainer>

      <InputContainer>
        A: <InputText>{userInput}</InputText>
      </InputContainer>

      <KeyboardContainer>
        <Sub>
          {subButtons.map((text, index) => (
            <SubBtn key={index} onClick={() => onClickSub(text)}>
              {text}
            </SubBtn>
          ))}
        </Sub>

        <Main>
          {baseKanaKeys.map((el) => {
            if (el === "BACK") {
              return (
                <MainBtn
                  $bgColor="#fff"
                  key={el}
                  onClick={() => onClickMain(el)}
                >
                  🔙
                </MainBtn>
              );
            } else {
              return (
                <MainBtn
                  $bgColor="#121212"
                  key={el}
                  onClick={() => onClickMain(el)}
                >
                  {el}
                </MainBtn>
              );
            }
          })}
        </Main>

        <Modi>
          {modifiers.map((el) => {
            return (
              <MainBtn
                $bgColor="#121212"
                key={el}
                onClick={() => onClickModi(el)}
              >
                {el}
              </MainBtn>
            );
          })}
        </Modi>
      </KeyboardContainer>
    </Wrapper>
  );
};

export default PatternPage;

const InfoContainer = styled.div`
  width: 100%;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ScoreBox = styled.div`
  display: flex;
  justify-content: end;
`;

const QuestionContainer = styled.div`
  margin: 16px 0;
  border-bottom: 1px solid #121212;
`;

const Question = styled.p`
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-size: 700;
  border: 1px solid #aaa;
  border-radius: 8px;
  margin: 0 auto;
`;

const HintContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 4px 0;
  padding: 4px 24px;
`;

const HintBtn = styled.button`
  width: 100px;
  font-size: 16px;

  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2px;
  background-color: #484848;
  color: #fff;

  &:active {
    box-shadow: inset 0px 2px 6px rgba(255, 255, 255, 0.2);
  }
`;

const HintSub = styled.p`
  font-size: 10px;
  color: #fff;
`;

const HintWord = styled.p<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "block" : "none")};
`;

const KeyboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 90%;
  height: 40px;
  border: 1px solid #ccc;

  margin: 16px auto;
  padding: 4px;

  display: flex;
  align-items: center;
`;

const InputText = styled.span`
  margin-left: 8px;
  font-size: 14px;
`;

const Main = styled.div`
  width: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`;

const MainBtn = styled.button<{ $bgColor: string }>`
  width: 30px;
  height: 40px;
  border: 1px solid #ccc;
  background-color: ${({ $bgColor }) => $bgColor};
  color: #fff;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;

const Sub = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  height: 60px;
`;

const SubBtn = styled.button`
  width: 30px;
  height: 40px;
  border: 1px solid #ccc;
  background-color: #a28181;
  color: #fff;

  &:active {
    opacity: 0.8;
  }
`;

const Modi = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 20px 0;
`;
