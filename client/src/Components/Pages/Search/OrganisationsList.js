import React, { Component, createRef } from "react";

import { Skeleton, Spin } from "antd";

import { OrgsListWrapper, MainKey, SubKey, NoDataTitle } from "./Search.style";

import Suggestion from "./OrganisationRow";

const SkeletonWrapper = () => {
  return (
    <Spin tip="loading...">
      <div style={{ width: "300px" }}>
        <Skeleton loading active style={{ width: "300px" }}></Skeleton>
        <Skeleton loading active></Skeleton>
        <Skeleton loading active></Skeleton>
        <Skeleton loading active></Skeleton>
        <Skeleton loading active></Skeleton>
      </div>
    </Spin>
  );
};
const approxDivHeight = 75;

class OrganisationsList extends Component {
  state = {
    rederedListLength: 10,
  };

  componentDidMount() {
    document.addEventListener("scroll", this.checkScroll);
    this.checkScroll();
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.checkScroll);
  }

  componentDidUpdate(prevProps) {
    const { category } = this.props;
    if (prevProps.category !== category) {
      this.setState({ rederedListLength: 10 });
    }
  }

  checkScroll = () => {
    const scroll = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    const divHeight =
      (this.listRef &&
        this.listRef.current &&
        this.listRef.current.clientHeight) ||
      0;

    if (scroll + windowHeight > divHeight * 0.9) {
      this.setState(({ rederedListLength }) => {
        return {
          rederedListLength: rederedListLength + 10,
        };
      });
    }
  };

  listRef = createRef();

  render() {
    const { sortedOrgs, loading } = this.props;
    const { rederedListLength } = this.state;

    const elementsNotLoadedYet = Math.min(rederedListLength, sortedOrgs.length);

    const elementsShouldBeInPage = Math.min(
      sortedOrgs.length,
      rederedListLength + 20
    );

    return (
      <OrgsListWrapper>
        {loading ? (
          <SkeletonWrapper />
        ) : (
          <>
          {sortedOrgs.length > 0 ? 
          <>
            <div ref={this.listRef}>
              {sortedOrgs.slice(0, rederedListLength).map(org => (
                <div key={org._id}>
                  {org.mainKey && <MainKey>{org.mainKey}</MainKey>}
                  {org.subKey && <SubKey>{org.subKey}</SubKey>}

                  <Suggestion
                    organisation={org}
                    key={org._id}
                    withoutBorder
                    noIcon
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                width: "100%",
                height: `${Math.min(
                  elementsShouldBeInPage - elementsNotLoadedYet,
                  0
                ) * approxDivHeight}px`,
              }}
            />
          </> :
          <>
            <NoDataTitle>No relevant reviews found</NoDataTitle>
          </>
          }
          </>
        )}
      </OrgsListWrapper>
    );
  }
}

export default OrganisationsList;
