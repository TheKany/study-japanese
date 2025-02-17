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
      case "hi-ga":
        router.push("/Study/All");
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper>
      <p>일본어 공부하기</p>
      <ButtonBox onClick={() => onClickLink("hira")}>히라가나</ButtonBox>
      <ButtonBox onClick={() => onClickLink("gata")}>가타카나</ButtonBox>
      <ButtonBox onClick={() => onClickLink("hi-ga")}>히라 + 가타</ButtonBox>
    </Wrapper>
  );
}
