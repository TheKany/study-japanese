"use client";

import { ButtonBox } from "@/components/ButtonBox";
import Download from "@/components/Download";
import PwaUpdate from "@/components/PwaUpdate";
import Wrapper from "@/components/Wrapper/Wrapper";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export default function Home() {
  const router = useRouter();

  const onClickLink = (id: string) => {
    switch (id) {
      case "hira":
        router.push("/Study/Hira");
        break;
      case "gata":
        router.push("/Study/Gata");
        break;
      case "words":
        router.push("/Study/Words");
        break;
      case "list":
        router.push("/List");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Download />
      <PwaUpdate />
      <Wrapper>
        <MainTitle>일본어 공부하기</MainTitle>
        <MenuTitle>일본어 학습 정보</MenuTitle>
        <ButtonBox onClick={() => onClickLink("list")}>일본어 문자표</ButtonBox>

        <MenuTitle>일본어 퀴즈</MenuTitle>
        <ButtonBox onClick={() => onClickLink("hira")}>히라가나</ButtonBox>
        <ButtonBox onClick={() => onClickLink("gata")}>가타카나</ButtonBox>
        <ButtonBox onClick={() => onClickLink("words")}>
          단&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 어
        </ButtonBox>
      </Wrapper>
    </>
  );
}

const MainTitle = styled.p`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: 60px 0 80px;
`;

const MenuTitle = styled.p`
  margin-top: 20px;
  font-weight: 700;
`;
