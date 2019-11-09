import React from "react";

import { Skeleton } from "antd";

import { OrgsListWrapper, MainKey, SubKey } from "./Search.style";

import Suggestion from "./OrganisationRow";

const SkeletonWrapper = () => {
  return (
    <div style={{ width: "300px" }}>
      <Skeleton loading active style={{ width: "300px" }}></Skeleton>
      <Skeleton loading active></Skeleton>
      <Skeleton loading active></Skeleton>
      <Skeleton loading active></Skeleton>
      <Skeleton loading active></Skeleton>
    </div>
  );
};

const OrganisationsList = ({ sortedOrgs, loading }) => {
  return (
    <OrgsListWrapper>
      {loading ? (
        <SkeletonWrapper />
      ) : (
        sortedOrgs.map(mainCategory =>
          mainCategory.children.length > 0 ? (
            <div key={mainCategory.key}>
              <MainKey>{mainCategory.key}</MainKey>
              {mainCategory.children.map(category =>
                category.children.length > 0 ? (
                  <div key={category.key}>
                    <SubKey>{category.key}</SubKey>
                    <div>
                      {category.children.map(org => (
                        <Suggestion
                          organisation={org}
                          key={org._id}
                          withoutBorder
                          noIcon
                        />
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          ) : null
        )
      )}
    </OrgsListWrapper>
  );
};

export default OrganisationsList;
