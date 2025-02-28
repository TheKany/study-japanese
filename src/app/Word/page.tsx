"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/Feature/Navigation";
import Wrapper from "@/components/Style/Wrapper/Wrapper";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WordType } from "@/type/types";

/**
 *  1: word_one.json
 *  2: word_two.json
 * ....
 * 8. word_eight.json
 */

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const WordPage = () => {
  const settings = {
    infinite: true,
    slidesToShow: 3.5,
    slidesToScroll: 1,
  };

  const fileNames = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
  ];
  const [data, setData] = useState<WordType[]>([]);

  const onLoadData = async (fileNumber: string) => {
    const fileName = `word_${fileNumber}.json`;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}${fileName}`
      );
      if (!response.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");

      const fetchData = await response.json();
      setData(fetchData);
    } catch (error) {
      console.error("데이터 로드 오류:", error);
    }
  };

  useEffect(() => {
    onLoadData("one");
  }, []);

  return (
    <Wrapper>
      <Navigation />

      <Slider {...settings}>
        {fileNames.map((num) => (
          <MenuBtn key={num} onClick={() => onLoadData(num)}>
            {`Word ${num}`}
          </MenuBtn>
        ))}
      </Slider>

      <WordContainer>
        {data.length > 0 ? (
          data.map((item, index) => (
            <Word key={index}>
              <p>
                {item.word} {item.mean}
              </p>
              <p style={{ fontSize: 12 }}>
                ⟦ {item.speakWord} | {item.speakKorean} ⟧
              </p>
            </Word>
          ))
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </WordContainer>
    </Wrapper>
  );
};

export default WordPage;

const MenuBtn = styled.button`
  background-color: yellow;
  padding: 8px;
`;

const WordContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Word = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 16px;

  width: 100%;
  border: 1px solid #ccc;
  padding: 8px;
`;
