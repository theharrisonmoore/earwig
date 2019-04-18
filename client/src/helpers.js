import { MOBILE_WIDTH } from "./constants/screenWidths";
import React from "react";
import StarRatingComponent from "react-star-rating-component";
import { organizations } from "./theme";

export const isMobile = width => width < MOBILE_WIDTH;

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
