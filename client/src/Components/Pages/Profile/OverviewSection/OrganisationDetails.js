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
  StarLabel,
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
  const getRateValue = () => {
    if (rate === 5) {
      return { text: "Excellent", padding: "85px" };
    }
    if (rate >= 4 && rate < 5) {
      return { text: "Good", padding: "68px" };
    }
    if (rate >= 3 && rate < 4) {
      return { text: "Average", padding: "39px" };
    }
    if (rate >= 2 && rate < 3) {
      return { text: "Poor", padding: "24px" };
    }
    if (rate >= 1 && rate < 2) {
      return { text: "Bad", padding: "3px" };
    }
    return { text: "", padding: "0px" };
  };

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
              fontSize: "1.25rem",
              minWidth: "78px",
            }}
            className="last-reviewed-star-rate"
          />
          <div
            style={{
              width: "100px",
              display: "inline-block",
              height: "8px",
            }}
          >
            {["Bad", "Poor", "Average", "Good", "Excellent"].map(option => (
              <StarLabel
                key={option}
                currValue={option === getRateValue().text}
                padding={getRateValue().padding}
              >
                {option}
              </StarLabel>
            ))}
          </div>
        </RightInfo>
      </InfoRow>
      {/* contractor section */}
      {category === "worksite" && (
        <ContractorsList contractorAnswers={contractorAnswers} />
      )}

      {category !== "worksite" && (
        <InfoRow>
          <LeftInfo>Website</LeftInfo>
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
          <LeftInfo>Email</LeftInfo>
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
          <LeftInfo>Phone</LeftInfo>
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
