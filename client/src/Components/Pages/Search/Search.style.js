import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, shadows, organizations } from "./../../../theme";

export const SearchWrapper = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 1rem auto;
  padding: 0 1rem;
  padding-top: 2rem;
  border: 1px solid blue;
`;

export const SuggestionBox = styled.div`
  opacity: 0.6;
  border: 1px solid #000000;
  box-shadow: ${colors.searchBoxShadow};
`;
