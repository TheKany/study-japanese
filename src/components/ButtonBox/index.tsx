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
  border: 1px solid #121212;

  margin: 8px 0;
`;
