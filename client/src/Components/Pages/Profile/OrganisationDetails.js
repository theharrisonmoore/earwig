import React from "react";

import {
  OrganisationDetailsWrapper,
  CompanyTitle,
  InfoRow,
  RightInfo,
  LeftInfo,
  OrgButton,
  OrgLink,
} from "./Profile.style";

const OrganisationDetails = ({
  name,
  email,
  phoneNumber,
  websiteUrl,
  isMobile,
  isTablet,
  category,
  summary,
}) => {
  return (
    <OrganisationDetailsWrapper isMobile={isMobile} isTablet={isTablet}>
      <CompanyTitle>{name}</CompanyTitle>
      {category !== "worksite" && (
        <InfoRow>
          <LeftInfo>Website:</LeftInfo>
          <RightInfo>
            <OrgLink
              href={`${websiteUrl}`}
              hasDetails={websiteUrl}
              rel="noopener noreferrer"
              target="_blank"
              disabled={!websiteUrl}
            >
              {websiteUrl || "-"}
            </OrgLink>
          </RightInfo>
        </InfoRow>
      )}

      {["payroll", "agency"].includes(category) && (
        <InfoRow>
          <LeftInfo>Email:</LeftInfo>
          <RightInfo>
            <OrgLink
              href={`mailto:${email}`}
              hasDetails={email}
              disabled={!email}
            >
              {email || "-"}
            </OrgLink>
          </RightInfo>
        </InfoRow>
      )}

      {["payroll", "agency"].includes(category) && (
        <InfoRow>
          <LeftInfo>Phone:</LeftInfo>
          <RightInfo>
            <OrgLink
              href={`tel:${phoneNumber}`}
              hasDetails={phoneNumber}
              disabled={!phoneNumber}
            >
              {phoneNumber || "-"}
            </OrgLink>
          </RightInfo>
        </InfoRow>
      )}
    </OrganisationDetailsWrapper>
  );
};

export default OrganisationDetails;
