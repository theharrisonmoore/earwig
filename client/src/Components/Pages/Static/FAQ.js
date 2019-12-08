import React, { Component } from "react";
import { Link as ScrollLink, Element } from "react-scroll";
import {
  Wrapper,
  ContentWrapper,
  SmallParagraph,
  Iframe,
  BlueDiv,
  PurpleDiv,
  SubTitleGroup,
  TopSubTitle,
  SectionHeading,
  NormalLink,
  StyledOl,
} from "../../Common/StaticPages.style";

import CommentSection from "../../Common/CommentSection";

// ROUTES
import {
  UPLOAD_VERIFICATION_PHOTO,
  COMMUNITY_GUIDELINES_URL,
  CONTACT_URL,
  DELETE_PROFILE_URL,
} from "../../../constants/naviagationUrls";

export default class FAQ extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <Wrapper>
        <PurpleDiv width="25%" />
        <ContentWrapper
          width="50%"
          style={{ padding: "3rem 4vw", paddingTop: "3rem" }}
        >
          <SubTitleGroup>
            <ScrollLink
              to="getting-started"
              spy
              smooth
              duration={500}
              offset={-50}
            >
              <TopSubTitle list="true">Getting started</TopSubTitle>
            </ScrollLink>
            <ScrollLink
              to="homepage-video"
              spy
              smooth
              duration={500}
              offset={-60}
            >
              <TopSubTitle sublist="true" list="true">
                Homepage video
              </TopSubTitle>
            </ScrollLink>
            <ScrollLink
              to="important-message"
              spy
              smooth
              duration={500}
              offset={-60}
            >
              <TopSubTitle sublist="true" list="true">
                An important message for workers
              </TopSubTitle>
            </ScrollLink>
            <ScrollLink to="pay" spy smooth duration={500} offset={-60}>
              <TopSubTitle list="true" sublist="true">
                Do I have to pay to use earwig?
              </TopSubTitle>
            </ScrollLink>
            <ScrollLink
              to="verification"
              spy
              smooth
              duration={500}
              offset={-60}
            >
              <TopSubTitle list="true" sublist="true">
                Why do I have to get verified as a worker before I can give
                reviews?
              </TopSubTitle>
            </ScrollLink>
            <ScrollLink to="blacklisted" spy smooth duration={500} offset={-60}>
              <TopSubTitle list="true" sublist="true">
                Could I be blacklisted if I give bad reviews?
              </TopSubTitle>
            </ScrollLink>
            <ScrollLink to="pay-remove" spy smooth duration={500}>
              <TopSubTitle list="true" sublist="true">
                Can agencies, payrolls or construction companies pay earwig to
                remove reviews?
              </TopSubTitle>
            </ScrollLink>
            <ScrollLink
              to="force-remove"
              spy
              smooth
              duration={500}
              offset={-60}
            >
              <TopSubTitle list="true" sublist="true">
                Can agencies, payrolls or construction companies force earwig to
                remove reviews?
              </TopSubTitle>
            </ScrollLink>
            <ScrollLink to="favour" spy smooth duration={500} offset={-60}>
              <TopSubTitle list="true" sublist="true">
                What’s stopping agencies, payrolls or construction companies
                from asking their own staff to sign-up and give reviews in their
                favour?
              </TopSubTitle>
            </ScrollLink>
            <ScrollLink to="delete" spy smooth duration={500}>
              <TopSubTitle list="true" sublist="true">
                Can I delete my earwig account at any time?
              </TopSubTitle>
            </ScrollLink>
            <ScrollLink
              to="using-earwig"
              spy
              smooth
              duration={500}
              offset={-50}
            >
              <TopSubTitle list="true">Using earwig</TopSubTitle>
            </ScrollLink>
            <ScrollLink to="helpful" spy smooth duration={500} offset={-60}>
              <TopSubTitle list="true" sublist="true">
                How can I make my reviews the most helpful?
              </TopSubTitle>
            </ScrollLink>
            <ScrollLink
              to="how-many-reviews"
              spy
              smooth
              duration={500}
              offset={-60}
            >
              <TopSubTitle list="true" sublist="true">
                How many reviews can I give?
              </TopSubTitle>
            </ScrollLink>
            <ScrollLink to="edit-delete" spy smooth duration={500} offset={-60}>
              <TopSubTitle list="true" sublist="true">
                Can I edit or delete a review once I’ve given it?
              </TopSubTitle>
            </ScrollLink>
            <ScrollLink to="see-reviews" spy smooth duration={500} offset={-60}>
              <TopSubTitle list="true" sublist="true">
                Why can’t I see a review I just published?
              </TopSubTitle>
            </ScrollLink>
            <ScrollLink to="points" spy smooth duration={500} offset={-60}>
              {" "}
              <TopSubTitle list="true" sublist="true">
                What are my points for?
              </TopSubTitle>
            </ScrollLink>
          </SubTitleGroup>

          <Element name="getting-started">
            <SectionHeading>Getting started</SectionHeading>
          </Element>
          <Element name="homepage-video">
            <SectionHeading sublist="true">Homepage Video</SectionHeading>
          </Element>
          <Iframe
            src="https://www.youtube.com/embed/Z4F7iJeYgqE?controls=0"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
          <Element name="important-message">
            <SectionHeading sublist="true">
              An important message for workers
            </SectionHeading>
          </Element>
          <Iframe
            src="https://www.youtube.com/embed/nV2Wbg3pMPE?controls=0"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
          <Element name="pay">
            <SectionHeading sublist="true">
              Do I have to pay to use earwig?
            </SectionHeading>
          </Element>
          <SmallParagraph>
            As a member of the public browsing reviews or as a verified worker
            giving reviews, earwig is completely free. In the future, we may
            introduce charges for agencies, payrolls, and construction companies
            who want to claim their earwig profiles and post jobs. We’ll notify
            you if this happens.
          </SmallParagraph>
          <Element name="verification">
            <SectionHeading sublist="true">
              Why do I have to get verified as a worker before I can give
              reviews?
            </SectionHeading>
          </Element>
          <SmallParagraph>
            If you want to give reviews and help other workers by replying to
            them and giving them points, you need to{" "}
            <NormalLink to={UPLOAD_VERIFICATION_PHOTO}>get verified</NormalLink>{" "}
            as a genuine worker. This means all reviews are credible and
            protects the worker community from fake reviews and spam by
            non-workers.
          </SmallParagraph>
          <Element name="blacklisted">
            <SectionHeading sublist="true">
              Could I be blacklisted if I give bad reviews?
            </SectionHeading>
          </Element>
          <SmallParagraph>
            We believe that every voice counts and should be protected by
            anonymity - everybody has a right to speak and be heard without fear
            of blacklisting. To protect you, we’ll randomly assign you an earwig
            Username, which is the only thing that will be shown beside your
            reviews and activity. You can change your earwig Username at any
            time.
            <br />
            <br />
            What’s more, we’ve built earwig so it has two different databases
            separating your email address from your earwig Username. This means
            your email address is not connected to your reviews and activity
            even in the unlikely event that earwig is hacked.
          </SmallParagraph>
          <Element name="pay-remove">
            <SectionHeading sublist="true">
              Can agencies, payrolls or construction companies pay earwig to
              remove reviews?
            </SectionHeading>
          </Element>
          <SmallParagraph>
            Absolutely not! We’re very serious about this. earwig simply
            wouldn’t work if we did this because workers would find out and stop
            giving reviews.
            <br />
            <br />
            earwig is built ​by​ workers f​or​ workers and it’s in all our
            interests to ensure that information on earwig is worker-led and not
            messed around with.
          </SmallParagraph>
          <Element name="force-remove">
            <SectionHeading sublist="true">
              Can agencies, payrolls or construction companies force earwig to
              remove reviews?
            </SectionHeading>
          </Element>
          <SmallParagraph>
            There could be situations in which agencies, payrolls or
            construction companies put pressure on earwig to remove reviews. If
            this happens, we may contact you via the email you registered with
            to ask you to confirm that:
          </SmallParagraph>
          <StyledOl>
            <li>
              It was you who gave the review (don’t worry, this will never be
              shared);
            </li>
            <li>You stand behind your review; and</li>
            <li>You wish to keep your review on earwig.</li>
          </StyledOl>
          <SmallParagraph>
            If you confirm this and choose to keep your review on earwig, it
            will then be up to us to decide whether the review violates our ​
            <NormalLink to={COMMUNITY_GUIDELINES_URL}>
              Community Guidelines​
            </NormalLink>{" "}
            and should therefore be removed.
            <br />
            <br />
            You can delete your reviews at any time.
          </SmallParagraph>
          <Element name="favour">
            <SectionHeading sublist="true">
              What’s stopping agencies, payrolls or construction companies from
              asking their own staff to sign-up and give reviews in their
              favour?
            </SectionHeading>
          </Element>
          <SmallParagraph>
            This isn’t possible because only verified workers can give reviews.
            To ​
            <NormalLink to={UPLOAD_VERIFICATION_PHOTO}>get verified</NormalLink>
            ,​ workers must upload a current photo of themselves holding a valid
            card or other document that shows them as working for or within a
            particular trade and the card must show their photograph.
            <br />
            <br />
            <strong>
              Once we’ve verified you, we’ll delete your photo to protect your
              anonymity.
            </strong>
            <br />
            <br />
            This means all reviews are credible and protects the worker
            community from fake reviews and spam by non-workers.
          </SmallParagraph>
          <Element name="delete">
            <SectionHeading sublist="true">
              Can I delete my earwig account at any time?
            </SectionHeading>
          </Element>
          <SmallParagraph>
            You can delete your account at any time. Simply:
            <StyledOl>
              <li>Log-in to earwig.</li>
              <li>
                Click <strong>M​enu​</strong>, then choose ​{" "}
                <strong>Your profile​</strong>.
              </li>
              <li>
                On Your Profile page, click ​ <strong>Edit info</strong>.
              </li>
              <li>
                Choose <strong>D​elete my earwig account</strong>.
              </li>
            </StyledOl>
            Once the deletion process begins, you won’t be able to reactivate
            your account or access any of the reviews you’ve given or the points
            you’ve earned.
            <br />
            <br />
            If you think you may like to keep your account but you’re unhappy
            about something,{" "}
            <NormalLink to={DELETE_PROFILE_URL}>tell us why​</NormalLink> so we
            can do our best to fix it.
          </SmallParagraph>
          <Element name="using-earwig">
            <SectionHeading>Using earwig</SectionHeading>
          </Element>
          <Element name="helpful">
            <SectionHeading sublist="true">
              How can I make my reviews the most helpful?
            </SectionHeading>
          </Element>
          <SmallParagraph>
            <strong>Write for other workers.​</strong> Mention things you would
            care about if you were looking for a new job. More detail = more
            helpful. Others will take your views more seriously than anybody
            else's because you have firsthand experience on the job.
            <br />
            <br />
            <strong>Try to be balanced.​</strong> Even if you loved working on a
            job, there was probably some room for improvement somewhere and this
            is useful for others to know. Likewise, even if your experience was
            bad overall, there are probably some things that went well. Others
            will find your reviews more realistic if they’re not utterly
            positive (or utterly negative).
            <br />
            <br />
            <strong>Be authentic.​</strong> Communicate your true self and
            opinions. earwig works best when you share unique insights that help
            others make better decisions. If your reviews speak about specific
            situations that are interesting and relevant, then you’re bound to
            help more people.
          </SmallParagraph>
          <Element name="how-many-reviews">
            <SectionHeading sublist="true">
              How many reviews can I give?
            </SectionHeading>
          </Element>
          <SmallParagraph>
            Every time you choose a new job, you could be dealing with a new
            agency, payroll, worksite, a​ nd​ construction company. That’s four
            new things every time! We encourage you to give reviews about each
            of these four things for every job you're on.
            <br />
            <br />
            If you’re on the same job for a long period and things have changed
            and you’d like to give another review about the same agency,
            payroll, worksite, or company, you can do this every four weeks.
            Four weeks is enough time for the conditions of the job to change
            and potentially warrant a new review.
          </SmallParagraph>
          <Element name="edit-delete">
            <SectionHeading sublist="true">
              Can I edit or delete a review once I’ve given it?
            </SectionHeading>
          </Element>
          <SmallParagraph>
            You can edit your reviews within four weeks, unless workers have
            found them helpful and given you points, or unless the agency,
            payroll or company has replied.
            <br />
            <br />
            You can delete your reviews at any time. Be aware that you lose the
            associated points you’ve earned for any review you delete.
          </SmallParagraph>
          <Element name="see-reviews">
            <SectionHeading sublist="true">
              Why can’t I see a review I just published?
            </SectionHeading>
          </Element>
          <SmallParagraph>
            There could be a number of reasons why a review you’ve published
            isn’t shown on earwig. Either:
            <StyledOl>
              <li>
                Your review is being held until we’ve verified you are a worker;
              </li>
              <li>
                Your review (or a portion of it) has been reported by a user and
                we’re in the process of checking whether it violates our ​
                <NormalLink to={COMMUNITY_GUIDELINES_URL}>
                  Community Guidelines
                </NormalLink>
                ;​
              </li>
              <li>
                Your review violates our ​
                <NormalLink to={COMMUNITY_GUIDELINES_URL}>
                  Community Guidelines​
                </NormalLink>{" "}
                and has been removed; or
              </li>
              <li>
                There was an unexpected error when you published your review. If
                you think this has happened please{" "}
                <NormalLink to={CONTACT_URL}>g​et in touch​</NormalLink>.
              </li>
            </StyledOl>
          </SmallParagraph>
          <Element name="points">
            <SectionHeading sublist="true">
              What are my points for?
            </SectionHeading>
          </Element>
          <SmallParagraph>
            You earn points when verified workers mark your comments as helpful.
            You can also earn points when you invite other workers to use earwig
            and they get verified.
            <br />
            <br />
            Your points are an important measure of how helpful you’ve been to
            other workers. Your points are displayed publicly beside your earwig
            Username when you give reviews and comment on other reviews.
            <br />
            <br />
            earwig is a young organisation and we’re still coming up with ideas
            about how to reward the most helpful workers, ie how you can use
            your points for additional benefits. We may give awards and run
            competitions from time to time. If you have an idea about how you’d
            like to be rewarded using your points, we’d love to hear it so ​
            <NormalLink to={CONTACT_URL}>let us know​</NormalLink>.
          </SmallParagraph>

          <CommentSection
            title="Still got a question? Ask us and we'll get back to you shortly"
            isLoggedIn={isLoggedIn}
          />
        </ContentWrapper>
        <BlueDiv width="25%" />
      </Wrapper>
    );
  }
}
