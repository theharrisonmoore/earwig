import styled from "styled-components";

import { organizations } from "../../../../theme";

export const HeaderWrapper = styled.div`
  background-color: ${({ category }) => organizations[category].primary};
  width: 100%;
  height: 17rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 2rem;
  max-width: 21rem;

  .react-autosuggest__input {
    border-radius: 5rem;
  }
`;
