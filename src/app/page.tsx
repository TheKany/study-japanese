"use client";

import { ButtonBox } from "@/components/ButtonBox";
import Wrapper from "@/components/Wrapper/Wrapper";
import { useRouter } from "next/navigation";

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
    <Wrapper>
      <p style={{ textAlign: "center", margin: "24px 0" }}>일본어 공부하기</p>
      <ButtonBox onClick={() => onClickLink("list")}>일본어 문자표</ButtonBox>
      <ButtonBox onClick={() => onClickLink("hira")}>히라가나</ButtonBox>
      <ButtonBox onClick={() => onClickLink("gata")}>가타카나</ButtonBox>
      <ButtonBox onClick={() => onClickLink("words")}>일본어 단어</ButtonBox>
    </Wrapper>
  );
}
