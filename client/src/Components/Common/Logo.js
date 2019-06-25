import React from "react";
import styled from "styled-components";

import logoSrc from "./../../assets/logo-beta-new.svg";

const Image = styled.img`
  vertical-align: middle;
  border-style: none;
  width: 30%;
  min-width: 10.5rem;
  max-width: 15.5rem;
  margin-bottom: 2rem;
`;

export default function Logo() {
  return <Image src={logoSrc} />;
}
