"use client";

import AnswerBox from "@/components/Style/Answer";
import Navigation from "@/components/Feature/Navigation";
import Wrapper from "@/components/Style/Wrapper/Wrapper";
import { LangType } from "@/type/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import QuestionBox from "@/components/Style/Question";

const StudyPage = ({ dataPath }: { dataPath: string }) => {
  const [datas, setDatas] = useState<LangType[]>([]);
  const [shuffleDatas, setShuffleDatas] = useState<LangType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<LangType | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<string>("대기");
  const [score, setScore] = useState({ total: 0, currect: 0 });
  const [history, setHistory] = useState<{ currect: boolean; word: string }[]>(
    []
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const shuffleArray = (array: LangType[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const onLoadData = useCallback(async () => {
    try {
      const fetchData = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}${dataPath}`
      );
      const resData = await fetchData.json();
      setDatas(resData);

      const shuffledData = shuffleArray(resData);
      setShuffleDatas(shuffledData);
      setCurrentQuestion(shuffledData[0]);
    } catch (err) {
      console.error("데이터 로드 중 오류 발생:", err);
    }
  }, [dataPath]);

  const handleNextQuestion = () => {
    setUserAnswer("");
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }

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
    if (!currentQuestion) return;

    if (userAnswer.trim() === currentQuestion.speakWord) {
      setIsCorrect("정답");
      setScore((prev) => ({
        ...prev,
        currect: prev.currect + 1,
      }));
      setHistory((prev) => [
        ...prev,
        { currect: true, word: currentQuestion.word },
      ]);
    } else {
      setIsCorrect(currentQuestion.word);
      setHistory((prev) => [
        ...prev,
        { currect: false, word: currentQuestion.word },
      ]);
    }

    setScore((prev) => ({ total: prev.total + 1, currect: prev.currect }));
    handleNextQuestion();
  };

  const onChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const koreanOnly = value.replace(/[^가-힣]/g, "");
    setUserAnswer(koreanOnly);
  };

  // const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     checkAnswer();
  //   }
  // };

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

      {/* 단어 표시 */}
      <QuestionBox correct={isCorrect}>
        {currentQuestion ? currentQuestion.word : "..."}
      </QuestionBox>

      {/* 답 입력 */}
      <AnswerBox>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            checkAnswer();
          }}
        >
          <Answer
            type="text"
            enterKeyHint="enter"
            placeholder="정답을 적어주세요."
            onChange={onChangeAnswer}
            // onKeyDown={onKeyDown}
            ref={inputRef}
          />
        </form>
      </AnswerBox>

      <HistoryTitle>오답노트</HistoryTitle>
      <HistoryNote>
        {history.map((el, index) => (
          <Word key={index} $borderColor={el.currect ? "#3065AC" : "#DD1923"}>
            {el.word}
          </Word>
        ))}
      </HistoryNote>
    </Wrapper>
  );
};

export default StudyPage;

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

const Answer = styled.input`
  width: 100%;
  padding: 8px 14px;
  font-size: 16px;
  touch-action: manipulation;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(167, 167, 170, 0.1) 0px 0px 8px;
`;

const HistoryTitle = styled.p`
  margin: 0 auto;
  font-size: 12px;
  font-weight: 700;
  padding-top: 8px;
`;

const HistoryNote = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 8px 0;
`;

const Word = styled.p<{ $borderColor: string }>`
  width: 30px;
  height: 30px;
  border: 1px solid ${({ $borderColor }) => $borderColor};
  background-color: ${({ $borderColor }) => $borderColor};
  color: #fff;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
