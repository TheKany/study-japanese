"use client";

// import { ButtonBox } from "@/components/ButtonBox";
import Wrapper from "@/components/Wrapper/Wrapper";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const AllStudyPage = () => {
  const [datas, setDatas] = useState<
    { id: number; word: string; speakWord: string }[]
  >([]);
  // const [inputMode, setInputMode] = useState("text");
  const [currentQuestion, setCurrentQuestion] = useState<{
    word: string;
    speakWord: string;
  } | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState({
    total: 0,
    currect: 0,
  });

  const onLoadData = async () => {
    try {
      const fetchGatakana = await fetch("/datas/Gatakana.json");
      const resGatakana = await fetchGatakana.json();

      const fetchHiragana = await fetch("/datas/Hiragana.json");
      const resHiragana = await fetchHiragana.json();

      const combinedData = resHiragana.concat(resGatakana);

      setDatas(combinedData);

      if (combinedData.length > 0) {
        setCurrentQuestion(
          combinedData[Math.floor(Math.random() * combinedData.length)]
        );
      }
    } catch (err) {
      console.error("데이터 로드 중 오류 발생:", err);
    }
  };

  // const onClickAnswerType = (type: string) => {
  //   switch (type) {
  //     case "voice":
  //       setInputMode("voice");
  //       break;
  //     case "text":
  //       setInputMode("text");
  //       break;

  //     default:
  //       break;
  //   }
  // };

  const getNextQuestion = () => {
    if (datas.length > 0) {
      setCurrentQuestion(datas[Math.floor(Math.random() * datas.length)]);
      setUserAnswer("");
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
    } else {
      alert(`오답입니다! ❌ 정답은 "${currentQuestion.speakWord}" 입니다.`);
    }
    setScore((prev) => ({
      ...prev,
      total: prev.total + 1,
    }));

    getNextQuestion();
  };

  const onChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const koreanOnly = /[a-z|A-Z|0-9|]+$/;

    if (koreanOnly.test(value)) {
      alert("한글만 입력해주세요.");
      e.target.value = "";
      return;
    }

    setUserAnswer(value);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  useEffect(() => {
    onLoadData();
  }, []);

  return (
    <Wrapper>
      {/* <BtnContainer>
        <ButtonBox onClick={() => onClickAnswerType("voice")}>voice</ButtonBox>
        <ButtonBox onClick={() => onClickAnswerType("text")}>text</ButtonBox>
      </BtnContainer> */}

      <InfoContainer>
        <Title>히라가나 + 가타카나</Title>

        <ScoreBox>
          <p>
            {score.currect}/{score.total}
          </p>
        </ScoreBox>
      </InfoContainer>

      {/* 단어 나오는 곳 */}
      <QuestionContainer>
        <Question>{currentQuestion ? currentQuestion.word : "..."}</Question>
      </QuestionContainer>

      {/* 답안 적는 / 말하는 곳 */}
      <AnswerContainer>
        <Answer
          type="text"
          placeholder="정답을 적어주세요"
          onChange={onChangeAnswer}
          onKeyPress={onKeyPress}
        />
      </AnswerContainer>
      {/* <AnswerContainer>
        {inputMode === "text" ? (
          <Answer
            type="text"
            placeholder="정답을 적어주세요"
            onChange={onChangeAnswer}
            onKeyPress={onKeyPress}
          />
        ) : (
          <>
            <Answer type="text" placeholder="정답을 말해주세요" />
            <div>
              <button>녹음</button>
              <button>중지</button>
            </div>
          </>
        )}
      </AnswerContainer> */}
    </Wrapper>
  );
};

export default AllStudyPage;

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

// const BtnContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 16px;
//   border-bottom: 1px solid #121212;

//   margin-bottom: 16px;
//   padding-bottom: 16px;
// `;

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
`;
