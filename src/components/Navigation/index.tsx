"use client";

import React from "react";
import BackArrow from "../SVG/BackArrow";
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <NavContainer>
      <NAvBackBtn
        onClick={() => {
          router.push("/");
        }}
      >
        <BackArrow />
      </NAvBackBtn>

      <NavTitle>
        {pathname.includes("Hira")
          ? "히라가나"
          : pathname.includes("Gata")
          ? "가타카나"
          : pathname.includes("All")
          ? "히라 + 가타"
          : pathname.includes("List")
          ? "문자표"
          : null}
      </NavTitle>

      <div></div>
    </NavContainer>
  );
};

export default Navigation;

const NavContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  margin: 8px 0;
  padding: 8px 0;

  border-bottom: 1px solid #121212;
`;

const NAvBackBtn = styled.button`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavTitle = styled.p`
  font-size: 24px;
  font-weight: 700;
  grid-column: span 3;
  text-align: center;
`;
