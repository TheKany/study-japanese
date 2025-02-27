"use client";

import styled from "styled-components";

type Props = {
  width?: string;
  height?: string;
};

export const ButtonBox = styled.button<Props>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "50px"};
  border-radius: 8px;
  background-color: #ffd20a;
  margin: 8px 0;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
`;
