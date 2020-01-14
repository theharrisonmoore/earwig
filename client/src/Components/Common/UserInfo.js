import React from "react";
import styled, { css } from "styled-components";

import Icon from "./Icon/Icon";

import { colors } from "../../theme";

const UserWrapper = styled.div`
  display: flex;
`;

const UserInfoWrapper = styled.div``;

const UserAdditionalDetails = styled.div`
  margin-top: -10px;

  p {
    font-size: 0.75rem;
    color: ${colors.profileFontColor};
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
  font-size: 0.75rem;
`;

const adminTitle = css`
  text-align: right;
`;

const UserID = styled.h3`
  font-weight: 900;
  font-size: 0.75rem;
  color: ${colors.profileFontColor};
  ${({ adminReply }) => adminReply && adminTitle}
`;

const UserInfo = ({
  userId,
  trade,
  helpedUsers,
  points,
  adminReply,
  showVerifiedIcon,
}) => {
  return (
    <UserWrapper>
      {showVerifiedIcon && (
        <Icon
          icon="getVerified"
          color={colors.profileFontColor}
          height="14"
          width="14"
          margin="0.25rem 0.4rem 0 0"
        />
      )}
      <UserInfoWrapper>
        <UserDiv>
          <UserID adminReply={adminReply}>{userId}</UserID>
          <UserTrade>{trade}</UserTrade>
        </UserDiv>
        {!adminReply && (
          <UserAdditionalDetails>
            <p>
              Helped {helpedUsers} · Points {points}
            </p>
          </UserAdditionalDetails>
        )}
      </UserInfoWrapper>
    </UserWrapper>
  );
};

export default UserInfo;
