import React from "react";

import { ITEMS } from "../../../../constants/promoItems";
import SignUpSection from "../SignUpSection";
import Icon from "../../../Common/Icon/Icon";

import {
  AccountPromo,
  AccountItem,
  Level0PromoWrapper,
} from "../Profile.style";

const Level0Promo = ({ isMobile, isTablet, category, location }) => {
  return (
    <Level0PromoWrapper isTablet={isTablet} isMobile={isMobile}>
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
        <SignUpSection category={category} />
      </AccountPromo>
    </Level0PromoWrapper>
  );
};

export default Level0Promo;