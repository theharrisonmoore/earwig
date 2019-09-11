import React, { Component } from "react";
import linkIcon from "./../../../assets/link-icon.svg";
import {
  Wrapper,
  ContentWrapper,
  MainIcon,
  SubTitle,
  SmallParagraph,
  PageTitle
} from "./../../Common/StaticPages.style";

import CommentSection from "./../../Common/CommentSection";

export default class HelpfulStuff extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Wrapper>
        <ContentWrapper style={{ margin: "0 auto" }}>
          <PageTitle>More helpful stuff for workers</PageTitle>
          <MainIcon src={linkIcon} />
          <a
            href="https://www.moneysavingexpert.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SubTitle>Money Saving Expert</SubTitle>
          </a>
          <SmallParagraph>
            Banking and saving, borrowing and debt, utilities and phones, deals
            and vouchers, travel and motoring, mortgages and homes; at Money
            Saving Expert you'll find the most up-to-date, straightforward,
            impartial advice on all this and more.
          </SmallParagraph>
          <a
            href="https://www.skillshare.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SubTitle>Skillshare</SubTitle>
          </a>
          <SmallParagraph>
            Ever wanted to learn the secrets of video production or social media
            mastery? Itching for a career change but feel you lack skills in
            management or entrepreneurship? Now you can learn from the world's
            leading practitioners (many of them famous!) all from the comfort of
            your own living room with online classes at Skillshare.
          </SmallParagraph>
          <a
            href="https://www.trezeo.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SubTitle>Trezeo</SubTitle>
          </a>
          <SmallParagraph>
            Self-employment can be a flexible and fulfilling way to work in
            construction, but it can come at the cost of instability, especially
            in terms of earnings. Trezeo changes that. It gives self-employed
            workers the ability to earn a steady take-home pay, even when work
            dries up or you take time off. You can even get a free trial by
            using the code ‘earwig’ when you sign-up. Happy days!
          </SmallParagraph>
          <a
            href="https://www.redcross.org/get-help/how-to-prepare-for-emergencies/mobile-apps.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SubTitle>First Aid by American Red Cross</SubTitle>
          </a>
          <SmallParagraph>
            Strive for safer working conditions for you and your colleagues with
            this First Aid app from the American Red Cross. The app provides
            step-by-step instructions, videos and interactive quizzes that
            support your learning and make you accident-ready.
          </SmallParagraph>
          <a
            href="https://www.lawbite.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SubTitle>Lawbite</SubTitle>
          </a>
          <SmallParagraph>
            Lawbite is an online platform where you can speak to a lawyer
            free-of-charge over the phone and save all your correspondence in
            one neat profile. There’s an easy-to-use mobile app, too. Just
            submit your enquiry and wait for a lawyer to call you back. They
            offer one-off or subscription pricing at competitive, often
            discounted rates.
          </SmallParagraph>
          <a
            href="https://www.noddle.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SubTitle>Noddle</SubTitle>
          </a>
          <SmallParagraph>
            Noddle claims to be the only free-for-life credit report and score
            that refreshes every week. Once registered, you can see your credit
            score represented on a handy coloured scale, and discover what’s
            affecting your score so you can make changes to improve it. Great
            news if you’re planning to borrow money.
          </SmallParagraph>
          <a
            href="https://www.canva.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SubTitle>Canva</SubTitle>
          </a>
          <SmallParagraph>
            What would you like to design and print? Business cards? Flyers?
            Instagram posts? Professional letterheads? CVs? Logos? Leaflets? Now
            you can with Canva. Use templates and a simple drag-and-drop
            interface to create visually stunning designs for almost anything,
            then have them printed and delivered to your door. It’s free and fun
            to use.
          </SmallParagraph>
          <a
            href="https://www.joinhoney.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SubTitle>Honey</SubTitle>
          </a>
          <SmallParagraph>
            By installing the Honey browser extension on your computer, it will
            give you the best price when you’re shopping online, wherever you’re
            shopping. It’s like having a wallet full of the internet’s best
            discount codes and a personal assistant checking every site for
            offers.
          </SmallParagraph>
          <CommentSection
            title="Wanna recommend something useful to help other workers? Let us know so we can add it here."
            isLoggedIn={isLoggedIn}
          />
        </ContentWrapper>
      </Wrapper>
    );
  }
}
