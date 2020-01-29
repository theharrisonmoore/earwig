import React from "react";
import { Icon as AntdIcon, Popover } from "antd";
import { Link } from "react-router-dom";

import {
  ContractorDiv,
  ContractorText,
  ContractorListLink,
} from "../Profile.style";

import { filterDuplicates } from "../../../../helpers";

const DropdownList = ({ contractors }) => {
  // creates list of contractors on site

  return (
    <div style={{ maxHeight: "150px", overflow: "auto" }}>
      {contractors.length > 0 && (
        <ol>
          {contractors.map((item, i) =>
            i > 0 ? (
              <li key={`contractor-list-item-${Math.random()}`}>
                <Link to={`/profile/${item._id}`}>{item.name}</Link>
              </li>
            ) : null,
          )}
        </ol>
      )}
    </div>
  );
};

export default ({ contractorAnswers }) => {
  // filter out all duplicate values
  const uniqueCompanies =
    contractorAnswers &&
    contractorAnswers.length > 0 &&
    filterDuplicates(contractorAnswers);

  return (
    <ContractorDiv>
      {/* MAIN COMPANY */}
      <ContractorText>
        Main Company:{" "}
        <span className="contactor-name">
          {uniqueCompanies[0] && uniqueCompanies[0].name ? (
            <Link
              to={`/profile/${uniqueCompanies[0]._id}`}
              style={{ color: "black", textDecoration: "underline" }}
            >
              {uniqueCompanies[0] && uniqueCompanies[0].name}
            </Link>
          ) : (
            "No answers yet"
          )}
        </span>
      </ContractorText>
      {/* OTHER COMPANIES ON SITE */}
      {uniqueCompanies && uniqueCompanies.length > 1 && (
        <Popover
          placement="bottom"
          title="Contractors List"
          content={<DropdownList contractors={uniqueCompanies} />}
          trigger="click"
        >
          <ContractorListLink>
            More main companies on this site
          </ContractorListLink>
          <AntdIcon style={{ color: "black" }} type="caret-down" />
        </Popover>
      )}
    </ContractorDiv>
  );
};
