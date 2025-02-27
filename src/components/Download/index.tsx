"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Download = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isPwaInstalled, setIsPwaInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [userAgent, setUserAgent] = useState("");

  const installPWA = async () => {
    if (/iphone|ipad|ipod/.test(userAgent.toLowerCase())) {
      setIsIos(true);
      return;
    } else {
      setIsIos(false);
    }

    if (!deferredPrompt) return;
    const promptEvent = deferredPrompt;
    promptEvent.prompt();

    const { outcome } = await promptEvent.userChoice;
    if (outcome === "accepted") {
      setIsPwaInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const onClickClosePopup = () => {
    setIsIos(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserAgent(navigator.userAgent);
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  return (
    <>
      {isPwaInstalled ? null : (
        <DownloadBanner onClick={installPWA}>
          꾸준히 공부를 하고 싶다면 클릭 다운로드!
        </DownloadBanner>
      )}

      {isIos ? (
        <>
          <Dimmed></Dimmed>
          <GuidePopupContainer>
            <CloseBtn onClick={onClickClosePopup}>✖️</CloseBtn>
            <Image
              src={"/screenshots/ios_downloadGuide.png"}
              alt="ios 다운로드 가이드"
              width={400}
              height={500}
            />
          </GuidePopupContainer>
        </>
      ) : null}
    </>
  );
};

export default Download;

const Dimmed = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9998;

  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #121212;
  opacity: 0.5;
`;

const DownloadBanner = styled.button`
  width: 100%;
  padding: 8px 0;
  font-size: 18px;
  background-color: #d7adad;
  color: #fff;
`;

const GuidePopupContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;

  width: 100%;
  max-width: 320px;
  height: 500px;

  display: flex;
  flex-direction: column;
  align-items: end;
`;

const CloseBtn = styled.button`
  background-color: #fff;
  border-radius: 50px;

  padding: 2px;
  margin-bottom: 4px;
`;
