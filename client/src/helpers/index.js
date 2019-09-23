import axios from "axios";
import React from "react";
import StarRatingComponent from "react-star-rating-component";
import SVG from "react-inlinesvg";
import {
  S_MOBILE_WIDTH,
  MOBILE_WIDTH,
  TABLET_WIDTH,
} from "../constants/screenWidths";
import { ImgDiv } from "../Components/Pages/Search/Search.style";
import { organizations } from "../theme";

import { API_LOGOUT_URL } from "../apiUrls";
import { LOGIN_URL } from "../constants/naviagationUrls";

import Icon from "../Components/Common/Icon/Icon";

// creates SVG Divs
export const SVGCreator = (source, height, width) => (
  <ImgDiv height={height} width={width}>
    <SVG src={`/icons/${source}.svg`} alt={`${source}`} />
  </ImgDiv>
);

// creates SVG Divs
export const NewSVGCreator = (source, height, width, color) => (
  <ImgDiv height={height} width={width}>
    <Icon icon={source} height={height} width={width} color={color} />
  </ImgDiv>
);

// creates star rating component based on avg ratings of an organisation
export const StarRateCreator = (organisation, value) => (
  <StarRatingComponent
    name="star rating component"
    editing={false}
    starCount={5}
    value={organisation.avgRatings || value || 0}
    starColor={`${organizations[organisation.category].primary}` || "red"}
    emptyStarColor="#D3D3D3"
  />
);

// sorts array of organisations by last viewed category
export const SortArrayNewest = (a, b) => {
  // eslint-disable-next-line no-nested-ternary
  return a.lastViewed > b.lastViewed ? -1 : b.lastViewed > a.lastViewed ? 1 : 0;
};
export const isSMobile = width => width <= S_MOBILE_WIDTH;

export const isMobile = width => width <= MOBILE_WIDTH;

export const isTablet = width => width <= TABLET_WIDTH && width > MOBILE_WIDTH;

const levels = {
  LEVEL0: 0, // not logged in user
  LEVEL1: 1, // just logged in user
  LEVEL2: 2, // awaiting verification user
  LEVEL3: 3, // verified user
  ADMIN: 4, // admin
};

export const authorization = ({
  isAdmin,
  awaitingReview,
  verified,
  minimumLevel,
  isLoggedIn,
}) => {
  const minimumLevelValue = levels[minimumLevel];

  let userLevel;

  if (isAdmin) {
    userLevel = levels.ADMIN;
  } else if (verified) {
    userLevel = levels.LEVEL3;
  } else if (awaitingReview) {
    userLevel = levels.LEVEL2;
  } else if (isLoggedIn) {
    userLevel = levels.LEVEL1;
  } else {
    userLevel = levels.LEVEL0;
  }

  return userLevel >= minimumLevelValue;
};

export const handleLogout = (history, handleChangeState) => {
  axios.get(API_LOGOUT_URL).then(() => {
    handleChangeState({
      isLoggedIn: false,
      id: "",
      trade: "",
      verified: false,
      awaitingReview: false,
      userId: "",
      points: 0,
      helpedUsers: 0,
      isAdmin: false,
      isMounted: false,
      email: "",
      city: "",
    });
    history.push(LOGIN_URL);
  });
};

export const isMobileDevice = {
  Android() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any() {
    return (
      isMobileDevice.Android() ||
      isMobileDevice.BlackBerry() ||
      isMobileDevice.iOS() ||
      isMobileDevice.Opera() ||
      isMobileDevice.Windows()
    );
  },
};

export const questionsNumber = {
  agency: {
    full: {
      count: "17 questions",
      time: "2 mins",
    },
  },
  payroll: {
    full: {
      count: "14 questions",
      time: "2 mins",
    },
  },
  worksite: {
    full: {
      count: "19 questions",
      time: "2 mins",
    },
  },
  company: {
    full: {
      count: "10 questions",
      time: "1 mins",
    },
  },
};

export const highlightMentions = text => {
  return text.split("\n").map(line => (
    <>
      {line.split(" ").map((ele, index) => (
        <>
          {ele.startsWith("@") ? (
            <span style={{ fontWeight: 900 }}>{ele.substr(1)}</span>
          ) : (
            ele
          )}{" "}
          {line.split(" ").length === index + 1 && "\n"}
        </>
      ))}
    </>
  ));
};

export const isIphone = () => {
  const iOSUserAgent =
    /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent) && !window.MSStream;

  const iOSPlatform =
    !!navigator.platform &&
    /iPad|iPhone|iPod|MacIntel/.test(navigator.platform);

  return iOSPlatform && iOSUserAgent;
};
