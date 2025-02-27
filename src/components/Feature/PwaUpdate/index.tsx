"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

const PwaUpdate = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        setUpdateAvailable(true);
      });
    }
  }, []);

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    updateAvailable && (
      <UpdateContainer>
        <Text>새로운 업데이트가 있습니다!</Text>
        <UpdateBtn onClick={reloadPage}>업데이트</UpdateBtn>
      </UpdateContainer>
    )
  );
};

export default PwaUpdate;

const UpdateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 4px;

  margin: 8px 16px;
`;

const Text = styled.p`
  font-size: 12px;
`;

const UpdateBtn = styled.button`
  font-size: 14px;
  background-color: #e9f690;
  padding: 4px;

  border-radius: 4px;
`;
