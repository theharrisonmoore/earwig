import React from "react";
import SVG from "react-inlinesvg";
import StarRatingComponent from "react-star-rating-component";
import { ImgDiv } from "./Components/Pages/Search/Search.style";
import { organizations } from "./theme";

// creates SVG Divs
export const SVGCreator = source => (
  <ImgDiv>
    <SVG src={`/icons/${source}.svg`} alt={`${source}`} />
  </ImgDiv>
);

// creates star rating component based on avg ratings of an organisation
export const StarRateCreator = organisation => (
  <StarRatingComponent
    name="star rating component"
    editing={false}
    starCount={5}
    value={organisation.avgRatings}
    starColor={`${organizations[organisation.category].primary}`}
    emptyStarColor={"#D3D3D3"}
  />
);

// sorts array of organisations by last viewed category
export const SortArrayNewest = (a, b) => {
  return a.lastViewed > b.lastViewed ? -1 : b.lastViewed > a.lastViewed ? 1 : 0;
};
