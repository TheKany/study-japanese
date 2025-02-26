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
  const [clickedMain, setClickedMain] = useState("");
  const [subButtons, setSubButtons] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState({ total: 0, currect: 0 });
  const [corAnswer, setCorAnswer] = useState({
    spHira: "",
    spKoren: "",
  });

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
      setClickedMain(id);
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

  const handleNextQuestion = () => {
    setCorAnswer((prev) => ({
      ...prev,
      spHira: "",
      spKoren: "",
    }));

    setShuffleDatas((prev) => {
      if (prev.length > 1) {
        const newData = prev.slice(1);
        setCurrentQuestion(newData[0]);
        return newData;
      } else {
        const reshuffledData = shuffleArray(datas);
        setCurrentQuestion(reshuffledData[0]);
        return reshuffledData;
      }
    });
  };

  const checkAnswer = () => {
    if (userInput === currentQuestion?.speakWord) {
      setScore((prev) => ({
        ...prev,
        total: prev.total + 1,
        currect: prev.currect + 1,
      }));
    } else {
      setScore((prev) => ({
        ...prev,
        total: prev.total + 1,
      }));
    }

    setCorAnswer((prev) => ({
      ...prev,
      spHira: currentQuestion?.speakWord as string,
      spKoren: currentQuestion?.speakKorean as string,
    }));

    setUserInput("");
    setShowHint(false);

    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
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
        <CorrectAnswer>
          정답: {corAnswer.spHira} / {corAnswer.spKoren}
        </CorrectAnswer>
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
        <InputBtn onClick={checkAnswer}>✔️</InputBtn>
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
                  key={el}
                  onClick={() => onClickMain(el)}
                  isActive={clickedMain === el}
                >
                  🔙
                </MainBtn>
              );
            } else {
              return (
                <MainBtn
                  key={el}
                  onClick={() => onClickMain(el)}
                  isActive={clickedMain === el}
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
                isActive={clickedMain === el}
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
  position: relative;
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

const CorrectAnswer = styled.p`
  text-align: center;
  padding: 16px 0;
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

// const HintSub = styled.p`
//   font-size: 10px;
//   color: #fff;
// `;

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
  position: relative;
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
  font-size: 18px;
  font-weight: 500;
`;

const InputBtn = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translate(0%, -60%);
  font-size: 24px;
`;

const Main = styled.div`
  width: 240px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`;

const MainBtn = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  width: 40px;
  height: 50px;
  border: 1px solid #ccc;
  font-size: 18px;
  border-radius: 4px;
  background-color: ${({ isActive }) => (isActive ? "#ccc" : "#fff")};
  box-shadow: ${({ isActive }) =>
    isActive
      ? "inset 3px 3px 4px rgba(0, 0, 0, 0.25)"
      : "0px 4px 4px rgba(0, 0, 0, 0.25)"};
  color: #121212;
  cursor: pointer;
`;

const Sub = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  height: 60px;
`;

const SubBtn = styled.button`
  width: 50px;
  height: 50px;
  background-color: #9be1ff;
  border-radius: 4px;
  font-size: 20px;
  font-weight: 700;
  color: #121212;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

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
