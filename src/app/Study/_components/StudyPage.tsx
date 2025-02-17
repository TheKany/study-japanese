"use client";

import { ButtonBox } from "@/components/ButtonBox";
import Wrapper from "@/components/Wrapper/Wrapper";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StudyPage = ({
  title,
  dataPath,
}: {
  title: string;
  dataPath: string;
}) => {
  const router = useRouter();

  const [datas, setDatas] = useState<
    { id: number; word: string; speakWord: string }[]
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState<{
    word: string;
    speakWord: string;
  } | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState({ total: 0, currect: 0 });
  const [history, setHistory] = useState<{ currect: boolean; word: string }[]>(
    []
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const onLoadData = async () => {
    try {
      const fetchData = await fetch(dataPath);
      const resData = await fetchData.json();
      setDatas(resData);
      if (resData.length > 0) {
        setCurrentQuestion(resData[Math.floor(Math.random() * resData.length)]);
      }
    } catch (err) {
      console.error("데이터 로드 중 오류 발생:", err);
    }
  };

  const getNextQuestion = () => {
    if (datas.length > 0) {
      setCurrentQuestion(datas[Math.floor(Math.random() * datas.length)]);
      setUserAnswer("");
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }
  };

  const checkAnswer = () => {
    if (!currentQuestion) return;

    if (userAnswer.trim() === currentQuestion.speakWord) {
      alert("정답입니다! ✅");
      setScore((prev) => ({
        ...prev,
        currect: prev.currect + 1,
      }));
      setHistory((prev) => [
        ...prev,
        {
          currect: true,
          word: currentQuestion.word,
        },
      ]);
    } else {
      alert(`오답입니다! ❌ 정답은 "${currentQuestion.speakWord}" 입니다.`);

      setHistory((prev) => [
        ...prev,
        {
          currect: false,
          word: currentQuestion.word,
        },
      ]);
    }

    setScore((prev) => ({
      ...prev,
      total: prev.total + 1,
    }));

    setUserAnswer("");
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }, 0);

    getNextQuestion();
  };

  const onChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const koreanOnly = value.replace(/[^가-힣]/g, "");
    setUserAnswer(koreanOnly);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  const onClickLink = (id: string) => {
    switch (id) {
      case "hira":
        router.push("/Study/Hira");
        break;
      case "gata":
        router.push("/Study/Gata");
        break;
      case "hi-ga":
        router.push("/Study/All");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    onLoadData();
  }, []);

  return (
    <Wrapper>
      <PageBtnContainer>
        <ButtonBox height="20px" onClick={() => onClickLink("hira")}>
          히라가나
        </ButtonBox>
        <ButtonBox height="20px" onClick={() => onClickLink("gata")}>
          가타카나
        </ButtonBox>
        <ButtonBox height="20px" onClick={() => onClickLink("hi-ga")}>
          히라 + 가타
        </ButtonBox>
      </PageBtnContainer>

      <InfoContainer>
        <Title>{title}</Title>
        <ScoreBox>
          <p>
            {score.currect}/{score.total}
          </p>
        </ScoreBox>
      </InfoContainer>

      {/* 단어 표시 */}
      <QuestionContainer>
        <Question>{currentQuestion ? currentQuestion.word : "..."}</Question>
      </QuestionContainer>

      {/* 답 입력 */}
      <AnswerContainer>
        <Answer
          type="text"
          enterKeyHint="enter"
          placeholder="정답을 적어주세요"
          onChange={onChangeAnswer}
          onKeyPress={onKeyPress}
          ref={inputRef}
        />
      </AnswerContainer>

      <p>오답노트</p>
      <HistoryNote>
        <HistoryNote>
          {history.map((el, index) => (
            <Word borderColor={el.currect ? "#3065AC" : "#DD1923"} key={index}>
              {el.word}
            </Word>
          ))}
        </HistoryNote>
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

const Title = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const ScoreBox = styled.div`
  display: flex;
  justify-content: end;
`;

const QuestionContainer = styled.div`
  margin: 16px 0;
  border-bottom: 1px solid #121212;
  padding-bottom: 32px;
`;

const Question = styled.p`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  border: 1px solid #aaa;
  border-radius: 8px;
  margin: 0 auto;
`;

const AnswerContainer = styled.div`
  width: 50%;
  margin: 8px auto;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Answer = styled.input`
  width: 100%;
  border: 1px solid #171717;
  padding: 8px 16px;
  font-size: 16px;
  touch-action: manipulation;
`;

const HistoryNote = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 8px 0;
`;

const Word = styled.p<{ borderColor: string }>`
  width: 30px;
  height: 30px;
  border: 1px solid ${({ borderColor }) => borderColor};
  background-color: ${({ borderColor }) => borderColor};
  color: #fff;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageBtnContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  width: 100%;
  margin: 0 auto;
  margin-top: 32px;
`;
