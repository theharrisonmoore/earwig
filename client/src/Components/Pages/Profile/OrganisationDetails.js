import React from "react";
import { Link } from "react-router-dom";

import { Icon as AntdIcon, Popover } from "antd";

import {
  OrganisationDetailsWrapper,
  CompanyTitle,
  InfoRow,
  RightInfo,
  LeftInfo,
  OrgLink,
  ContractorDiv,
  ContractorText,
  ContractorListLink,
} from "./Profile.style";

const ContractorsList = ({ contractorAnswers }) => (
  <div style={{ maxHeight: "150px", overflow: "auto" }}>
    {contractorAnswers.map(item => (
      <Link to={`/profile/${item._id}`}>{item.name}</Link>
    ))}
  </div>
);

const OrganisationDetails = ({
  name,
  email,
  phoneNumber,
  websiteUrl,
  isMobile,
  isTablet,
  category,
  contractorAnswers,
}) => {
  return (
    <OrganisationDetailsWrapper isMobile={isMobile} isTablet={isTablet}>
      <CompanyTitle>{name}</CompanyTitle>

      {/* contractor section */}
      {category === "worksite" && (
        <ContractorDiv>
          <ContractorText>
            Main Contractor:{" "}
            <span className="contactor-name">
              {contractorAnswers[0] && contractorAnswers[0].name ? (
                <Link
                  to={`/profile/${contractorAnswers[0]._id}`}
                  style={{ color: "black", textDecoration: "underline" }}
                >
                  {contractorAnswers[0] && contractorAnswers[0].name}
                </Link>
              ) : (
                "No answers yet"
              )}
            </span>
          </ContractorText>
          {contractorAnswers[0] && (
            <Popover
              placement="bottom"
              title="Contractors List"
              content={
                <ContractorsList contractorAnswers={contractorAnswers} />
              }
              trigger="click"
            >
              <ContractorListLink>
                More main contractors on this site
              </ContractorListLink>
              <AntdIcon style={{ color: "black" }} type="caret-down" />
            </Popover>
          )}
        </ContractorDiv>
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
