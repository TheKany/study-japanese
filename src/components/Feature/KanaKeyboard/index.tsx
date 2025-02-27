"use client";

import { useUserInput } from "@/context/KanaInputProvider";
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
import React, { useState } from "react";
import styled from "styled-components";

const KanaKeyboard = () => {
  const [clickedMain, setClickedMain] = useState("");
  const [subButtons, setSubButtons] = useState<string[]>([]);
  const { userInput, setUserInput } = useUserInput();

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

  return (
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
  );
};

export default KanaKeyboard;

const KeyboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
