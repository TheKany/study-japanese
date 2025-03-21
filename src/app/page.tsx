"use client";

import Menu from "@/components/Style/Menu";
import Download from "@/components/Feature/Download";
import PwaUpdate from "@/components/Feature/PwaUpdate";
import Wrapper from "@/components/Style/Wrapper/Wrapper";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useEffect } from "react";

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

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Download />
      <PwaUpdate />
      <Wrapper>
        <MainTitle>일본어 공부하기</MainTitle>
        <MenuTitle>일본어 학습 정보</MenuTitle>
        <Menu onClick={() => onClickLink("list")}>일본어 문자표</Menu>

        <MenuTitle>일본어 퀴즈</MenuTitle>
        <Menu onClick={() => onClickLink("hira")}>히라가나</Menu>
        <Menu onClick={() => onClickLink("gata")}>가타카나</Menu>
        <Menu onClick={() => onClickLink("words")}>
          단&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 어
        </Menu>
      </Wrapper>

      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit="DAN-VYmIo67TQVN5C0eY"
        data-ad-width="320"
        data-ad-height="100"
      ></ins>
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
