import React from "react";

import { Rate } from "antd";
import ContractorsList from "./ContractorsList";

import { colors } from "../../../../theme";

import {
  OrganisationDetailsWrapper,
  CompanyTitle,
  InfoRow,
  RightInfo,
  LeftInfo,
  OrgLink,
} from "../Profile.style";

const OrganisationDetails = ({
  name,
  email,
  phoneNumber,
  websiteUrl,
  isMobile,
  isTablet,
  category,
  contractorAnswers,
  rate,
}) => {
  return (
    <OrganisationDetailsWrapper isMobile={isMobile} isTablet={isTablet}>
      <CompanyTitle>{name}</CompanyTitle>

      <InfoRow>
        <LeftInfo>Overall rating</LeftInfo>
        <RightInfo>
          <Rate
            disabled
            value={rate}
            style={{
              color: `${colors.stars}`,
              fontSize: "0.75rem",
              minWidth: "78px",
            }}
            className="last-reviewed-star-rate"
          />
        </RightInfo>
      </InfoRow>
      {/* contractor section */}
      {category === "worksite" && (
        <ContractorsList contractorAnswers={contractorAnswers} />
      )}

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
