"use client";

import Menu from "@/components/Style/Menu";
import Download from "@/components/Feature/Download";
import PwaUpdate from "@/components/Feature/PwaUpdate";
import Wrapper from "@/components/Style/Wrapper/Wrapper";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [viewTextBalloon, setViewTextBallon] = useState<string>("");
  const slideRef = useRef<HTMLButtonElement>(null);
  const SwiperSlideStyle = {
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

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

  const handleSlideCenter = (swiper: SwiperType) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const type = activeSlide.querySelector("button")?.getAttribute("data-type");

    switch (type) {
      case "quiz":
        setViewTextBallon("퀴즈 풀래요!");
        break;
      case "study":
        setViewTextBallon("공부 할래요!");
        break;
      default:
        setViewTextBallon("...");
        break;
    }
  };

  // 카카오 애드핏 광고
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    console.log(slideRef.current);
  }, []);

  return (
    <>
      <Download />
      <PwaUpdate />
      <Wrapper>
        <MenuList>
          {/* 학습 이동 버튼들 */}
          <SwiperContainer>
            <TopDim></TopDim>
            <Swiper
              direction={"vertical"}
              centeredSlides={true}
              slidesPerView={3}
              loop={true}
              modules={[Pagination]}
              className="mySwiper"
              style={{ height: "100%" }}
              onSlideChange={handleSlideCenter}
            >
              <SwiperSlide style={{ ...SwiperSlideStyle }}>
                <Menu
                  bg="#ffd20a"
                  height="50px"
                  onClick={() => onClickLink("list")}
                  ref={slideRef}
                  data-type="study"
                >
                  일본어 문자표
                </Menu>
              </SwiperSlide>
              <SwiperSlide style={{ ...SwiperSlideStyle }}>
                <Menu
                  bg="#5cb3f0"
                  height="50px"
                  onClick={() => onClickLink("hira")}
                  ref={slideRef}
                  data-type="quiz"
                >
                  히라가나
                </Menu>
              </SwiperSlide>
              <SwiperSlide style={{ ...SwiperSlideStyle }}>
                <Menu
                  bg="#5cb3f0"
                  height="50px"
                  onClick={() => onClickLink("gata")}
                  ref={slideRef}
                  data-type="quiz"
                >
                  가타카나
                </Menu>
              </SwiperSlide>
              <SwiperSlide style={{ ...SwiperSlideStyle }}>
                <Menu
                  bg="#5cb3f0"
                  height="50px"
                  onClick={() => onClickLink("words")}
                  ref={slideRef}
                  data-type="quiz"
                >
                  단&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 어
                </Menu>
              </SwiperSlide>
            </Swiper>
            <BottomDim></BottomDim>
          </SwiperContainer>

          {/* 이미지 */}
          <ImgBox>
            <TextBallon>{viewTextBalloon}</TextBallon>
            <Image
              src={"/img/mainChar.png"}
              alt="캐릭터"
              width={200}
              height={200}
              layout="responsive"
            />
          </ImgBox>
        </MenuList>
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

const MenuList = styled.div`
  position: relative;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const SwiperContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  grid-column: span 2;
  position: relative;
`;

const TopDim = styled.div`
  width: 100%;
  height: 60px;
  background-color: rgba(18, 18, 18, 0.5);
  backdrop-filter: blur(8px);
  opacity: 0.6;
  border-radius: 8px;

  position: absolute;
  top: 0;
  z-index: 999;
`;
const BottomDim = styled.div`
  width: 100%;
  height: 60px;
  background-color: rgba(18, 18, 18, 0.5);
  backdrop-filter: blur(8px);
  opacity: 0.6;
  border-radius: 8px;

  position: absolute;
  bottom: 0;
  z-index: 999;
`;

const ImgBox = styled.div`
  margin: auto 0;
  position: relative;
`;

const TextBallon = styled.p`
  background-color: #fff;
  width: 100px;
  text-align: center;
  padding: 12px 8px;
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 8px;

  animation: glow 1.5s infinite alternate;

  @keyframes glow {
    0% {
      box-shadow: 0 0 8px red;
    }
    100% {
      box-shadow: 0 0 8px blue;
    }
  }
`;
