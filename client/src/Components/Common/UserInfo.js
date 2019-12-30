import React from "react";
import styled, { css } from "styled-components";

import Icon from "./Icon/Icon";

import { colors } from "../../theme";

const UserInfoWrapper = styled.div`
  margin-left: 0.625rem;
`;

const UserAdditionalDetails = styled.div`
  margin-top: -10px;

  p {
    font-size: 0.8rem;
    color: ${colors.dustyGray2};
  }
`;

const UserDiv = styled.div`
  display: flex;
`;

const UserTrade = styled.p`
  font-style: italic;
  margin-left: 10px;
  color: ${colors.profileFontColor};
  margin-bottom: 0;
`;

const adminTitle = css`
  text-align: right;
`;

const UserID = styled.h3`
  font-weight: 900;
  font-size: 1rem;
  color: ${colors.profileFontColor};
  ${({ adminReply }) => adminReply && adminTitle}
`;

const UserInfo = ({ userId, trade, helpedUsers, points }) => {
  return (
    <>
      <Icon
        icon="getVerified"
        color={colors.black2}
        height="25"
        width="25"
        margin="0 0 0 0.5rem"
      />
      <UserInfoWrapper>
        <UserDiv>
          <UserID>{userId}</UserID>
          <UserTrade>{trade}</UserTrade>
        </UserDiv>
        <UserAdditionalDetails>
          <p>
            Helped {helpedUsers} · Points {points}
          </p>
        </UserAdditionalDetails>
      </UserInfoWrapper>
    </>
  );
};

export default UserInfo;
