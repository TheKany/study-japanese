"use client";

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

  const installPWA = async () => {
    console.log("installPWA");

    if (!deferredPrompt) return;
    const promptEvent = deferredPrompt;
    promptEvent.prompt();

    const { outcome } = await promptEvent.userChoice;
    if (outcome === "accepted") {
      setIsPwaInstalled(true);
    }
    setDeferredPrompt(null);
  };

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

  console.log("deferredPrompt", deferredPrompt);
  console.log("isPwaInstalled", isPwaInstalled);

  return (
    <>
      {isPwaInstalled ? null : (
        <DownloadBanner onClick={installPWA}>
          꾸준히 공부를 하고 싶다면 클릭 다운로드!
        </DownloadBanner>
      )}
    </>
  );
};

export default Download;

const DownloadBanner = styled.button`
  width: 100%;
  padding: 24px 0;
  font-size: 18px;
  background-color: #d7adad;
  color: #fff;
`;
