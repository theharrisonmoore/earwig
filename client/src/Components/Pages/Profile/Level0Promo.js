import React from "react";

import { ITEMS } from "../../../constants/promoItems";
import ReviewSection from "./ReviewSection";
import SignUpSection from "./SignUpSection";
import Icon from "../../Common/Icon/Icon";

import { AccountPromo, AccountItem, Level0PromoWrapper } from "./Profile.style";

const Level0Promo = ({
  isMobile,
  isTablet,
  category,
  summary,
  loaded,
  location,
}) => {
  return (
    <Level0PromoWrapper isTablet={isTablet} isMobile={isMobile}>
      <ReviewSection
        category={category}
        sectionDetails={{ _id: "Key ratings" }}
        summary={summary}
        loaded={loaded}
      />
      <AccountPromo>
        <p>Create an account to see more detail, including:</p>
        <div>
          {ITEMS[category] &&
            ITEMS[category].map(item => (
              <AccountItem key={item.text}>
                <Icon
                  icon={item.img}
                  margin="0 1rem 0 0"
                  height="2rem"
                  width="2rem"
                />
                {item.text}
              </AccountItem>
            ))}
        </div>
        <SignUpSection category={category} location={location} />
      </AccountPromo>
    </Level0PromoWrapper>
  );
};

export default Level0Promo;
