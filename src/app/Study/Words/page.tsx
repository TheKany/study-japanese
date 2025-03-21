"use client";

import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Wrapper from "@/components/Style/Wrapper/Wrapper";
import Navigation from "@/components/Feature/Navigation";
import { WordType } from "@/type/types";
import KanaKeyboard from "@/components/Feature/KanaKeyboard";
import { useUserInput } from "@/context/KanaInputProvider";
import QuestionBox from "@/components/Style/Question";

const WordPage = () => {
  const { userInput, setUserInput } = useUserInput();
  const [datas, setDatas] = useState<WordType[]>([]);
  const [shuffleDatas, setShuffleDatas] = useState<WordType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<WordType | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState({ total: 0, currect: 0 });
  const [isCorrect, setIsCorrect] = useState("대기");
  const [corAnswer, setCorAnswer] = useState({
    spHira: "",
    spKoren: "",
  });

  const [history, setHistory] = useState<WordType[]>([]);

  const shuffleArray = (array: WordType[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const onLoadData = useCallback(async () => {
    try {
      const fetchData = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}word_one.json`
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
    const isCorrectAnswer = userInput === currentQuestion?.speakWord;
    const correctWord = currentQuestion?.speakWord as string;
    const correctMeaning = currentQuestion?.speakKorean as string;

    setIsCorrect(isCorrectAnswer ? "정답" : correctWord);

    setScore((prev) => ({
      ...prev,
      total: prev.total + 1,
      currect: isCorrectAnswer ? prev.currect + 1 : prev.currect,
    }));

    setCorAnswer((prev) => ({
      ...prev,
      spHira: correctWord,
      spKoren: correctMeaning,
    }));

    setHistory((prev) => [
      {
        id: currentQuestion?.id as number,
        word: currentQuestion?.word as string,
        speakWord: correctWord as string,
        speakKorean: correctMeaning as string,
        mean: currentQuestion?.mean as string,
        correct: isCorrectAnswer as boolean,
      },
      ...prev,
    ]);

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

      <CorrectAnswer>
        정답: {corAnswer.spHira} / {corAnswer.spKoren}
      </CorrectAnswer>

      <QuestionBox correct={isCorrect}>
        {currentQuestion ? currentQuestion.mean : "..."}
      </QuestionBox>

      <HintContainer>
        <HintBtn onClick={onClickShowHint}>글자힌트</HintBtn>

        <HintWord $show={showHint}>{currentQuestion?.word}</HintWord>
      </HintContainer>

      <InputContainer>
        A:{" "}
        <InputText>
          {[...userInput].map((el, idx) => {
            return <span key={`${el}_${idx}`}>{el}</span>;
          })}
        </InputText>
        <InputBtn onClick={checkAnswer}>✔️</InputBtn>
      </InputContainer>

      <KanaKeyboard />

      <HistoryTitle>오답노트</HistoryTitle>
      <HistoryNote>
        {history.map((el, idx) => {
          return (
            <Word key={idx} $borderColor={el.currect ? "#3065AC" : "#DD1923"}>
              <p>
                {el.word}:{el.mean}
              </p>
              <p style={{ fontSize: 12 }}>
                ⟦ {el.speakWord} | {el.speakKorean} ⟧
              </p>
            </Word>
          );
        })}
      </HistoryNote>
    </Wrapper>
  );
};

export default WordPage;

const InfoContainer = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ScoreBox = styled.div`
  display: flex;
  justify-content: end;
`;

const CorrectAnswer = styled.p`
  text-align: center;
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
  font-size: 12px;

  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2px;
  background-color: #484848;
  color: #fff;

  &:active {
    box-shadow: inset 0px 2px 6px rgba(255, 255, 255, 0.2);
  }
`;

const HintWord = styled.p<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "block" : "none")};
  font-size: 24px;
`;

const InputContainer = styled.div`
  position: relative;
  height: 40px;
  margin: 16px auto;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 14px;
  font-size: 16px;
  touch-action: manipulation;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(167, 167, 170, 0.1) 0px 0px 8px;
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

const HistoryTitle = styled.p`
  margin: 0 auto;
  font-size: 12px;
  font-weight: 700;
  padding-top: 8px;
`;

const HistoryNote = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  width: 100%;
  margin: 8px 0;
`;

const Word = styled.div<{ $borderColor: string }>`
  padding: 8px 0;
  border: 1px solid ${({ $borderColor }) => $borderColor};
  background-color: ${({ $borderColor }) => $borderColor};
  color: #fff;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 16px;

  width: 100%;
`;
