import React, { Component } from "react";
import {
  Wrapper,
  ContentWrapper,
  SubTitle,
  SmallTitle,
  Ol,
  Li,
  UnderlinedLink
} from "./../../Common/StaticPages.style";

import {
  TERMS_OF_USE_URL,
  COMMUNITY_GUIDELINES_URL,
  PRIVACY_URL,
  COOKIES_POLICY_URL,
  SIGNUP_URL,
  SEARCH_URL
} from "./../../../constants/naviagationUrls";

export default class TermsOfUse extends Component {
  render() {
    return (
      <Wrapper style={{ textAlign: "left", paddingTop: "3rem" }}>
        <ContentWrapper>
          <SmallTitle>EARWIG</SmallTitle>
          <SmallTitle>TERMS OF USE</SmallTitle>
          <SubTitle left style={{ margin: 0, padding: 0, marginTop: "25px" }}>
            SECTION A: INTRODUCTION AND PRELIMINARY TERMS{" "}
          </SubTitle>
          <Ol showFirstNumber>
            <Li style={{ fontWeight: "900" }}>
              Welcome
              <Ol>
                <Li>
                  Welcome to earwig. Our website (located at ​
                  <UnderlinedLink to="/">earwig </UnderlinedLink>), is owned and
                  operated by Subtap Limited (​ we​ , our or​ us​, as
                  applicable). For further information about us and our contact
                  details, please see the contact information at the end of
                  these Terms.
                </Li>
                <Li>
                  These Terms of Use{" "}
                  <UnderlinedLink to={TERMS_OF_USE_URL}>
                    ​(Terms)
                  </UnderlinedLink>
                  ​ govern your use of the earwig Platform.
                </Li>
                <Li>
                  The earwig Platform is available to both businesses and
                  consumers. You are a business if you are a person acting for
                  purposes relating to your trade, business, craft or
                  profession, and you are a consumer if you are an individual
                  acting for purposes which are wholly or mainly outside of your
                  trade, business, craft or profession.
                </Li>
                <Li>
                  These Terms are organised into 3 sections. Those in Section B
                  will apply to you if you post any user generated content on
                  the earwig Platform (e.g. posting reviews of construction
                  companies, worksites, recruitment agencies, etc.). Those in
                  this Section A and in Section C apply to all earwig Platform
                  users, including those who just visit, use or browse the
                  earwig Platform (​ Visitors​ ).
                </Li>
                <Li>
                  Please read these Terms and the ​
                  <UnderlinedLink to={COMMUNITY_GUIDELINES_URL}>
                    ​Community Guidelines
                  </UnderlinedLink>
                  carefully before you start to use the earwig Platform, as
                  these will apply to your use of the earwig Platform. We
                  recommend that you print or save a copy of these Terms and the
                  ​{" "}
                  <UnderlinedLink to={COMMUNITY_GUIDELINES_URL}>
                    ​Community Guidelines
                  </UnderlinedLink>{" "}
                  for future reference.
                </Li>
                <Li>
                  By accessing or using the earwig Platform, you confirm that
                  you accept these Terms and that you agree to comply with them.
                </Li>

                <Li>
                  We take your privacy seriously. If you would like to find out
                  more about how we process personal information that we collect
                  about you through the earwig Platform, please see our ​
                  <UnderlinedLink to={PRIVACY_URL}>
                    ​Privacy Policy
                  </UnderlinedLink>{" "}
                  and for information on how we use cookies and similar
                  technologies in connection with the earwig Platform, please
                  see our
                  <UnderlinedLink to={COOKIES_POLICY_URL}>
                    ​Cookie Policy​
                  </UnderlinedLink>
                  .
                </Li>
                <Li>
                  We may revise these Terms and the ​
                  <UnderlinedLink to={COMMUNITY_GUIDELINES_URL}>
                    ​Community Guidelines
                  </UnderlinedLink>{" "}
                  from time to time for any reason, including to reflect changes
                  in relevant laws and regulatory requirements. For further
                  information regarding when and how changes we make may take
                  effect, please see paragraph 15 of these Terms.
                </Li>

                <Li>
                  If you have any queries or concerns regarding these Terms,
                  please contact us using the details at the bottom of these
                  Terms.
                </Li>
              </Ol>
            </Li>
            <Li style={{ fontWeight: "900" }}>
              Accessing and using the earwig Platform
              <Ol>
                <Li>
                  Anyone can access the earwig Platform using an internet
                  connection via a web browser or other similar software
                  application. However, if you want to view reviews and
                  companyand agency profiles in full, you will need to sign up
                  and create an account. To create an account, please go to the
                  <UnderlinedLink to={SIGNUP_URL}>
                    ​ Account Registration
                  </UnderlinedLink>
                  ​ page.
                </Li>
                <Li>
                  We try to make the earwig Platform available at all times,
                  but, of course, due to the inherent nature of online and
                  internet based services, we cannot guarantee this.
                </Li>
              </Ol>
            </Li>
            <Li style={{ fontWeight: "900" }}>
              Account registration
              <Ol>
                <Li>
                  You can sign up and create your account on the ​{" "}
                  <UnderlinedLink to={SIGNUP_URL}>
                    ​ Account Registration
                  </UnderlinedLink>
                  . We will never publicly publish the information you give to
                  us when you create your account nor publicly associate such
                  information with any review you may make on the earwig
                  Platform.
                </Li>
                <Li>
                  If you change any of your registration details (e.g. your
                  email address), you must update your account.
                </Li>
                <Li>
                  To help us maintain the security of the earwig Platform, you
                  must keep your registration details confidential. If you
                  become aware of any misuse or unauthorised use of your
                  registration details, you must inform us immediately by using
                  the contact information at the bottom of this page.
                </Li>
                <Li>
                  If you have breached, or we have justifiable reason to believe
                  that you have breached, or will breach, these Terms or the ​
                  <UnderlinedLink to={COMMUNITY_GUIDELINES_URL}>
                    ​Community Guidelines
                  </UnderlinedLink>{" "}
                  we may terminate or suspend your registration and/or access to
                  the earwig Platform.
                </Li>
                <Li>You can close your account at any time.</Li>
                <Li>
                  We reserve the right to delete your account and any personal
                  data or other information associated with your use of the
                  earwig Platform if there is no activity on your account for
                  more than 36 consecutive months.
                </Li>
              </Ol>
            </Li>
            <Li style={{ fontWeight: "900" }}>
              Account Verification
              <Ol>
                <Li>
                  When you register an account on the earwig Platform you will
                  be prompted to verify your account. If you choose to verify
                  your account you will be able to access additional features
                  and functionality on the earwig Platform, including submitting
                  reviews and viewing contact information for construction
                  companies, recruitment agencies and other related companies.
                </Li>
                <Li>
                  To verify your account you will need to provide us with a
                  current photo of yourself holding a valid card or other
                  document that identifies you as working for or within a
                  particular trade and bears your photograph.
                </Li>
              </Ol>
            </Li>
            <SubTitle left style={{ margin: 0, padding: 0, marginTop: "25px" }}>
              SECTION B: YOUR USER GENERATED CONTENT
            </SubTitle>
            <Li style={{ fontWeight: "900" }}>
              Reviews
              <Ol>
                <Li>
                  The earwig Platform is a platform allowing workers in the
                  construction industry to submit, post and publish reviews,
                  experiences and other feedback on and relating to construction
                  companies, worksites and recruitment agencies{" "}
                  <UnderlinedLink to={SEARCH_URL}>
                    (​ Reviews​ ).
                  </UnderlinedLink>{" "}
                </Li>
                <Li>
                  Any Reviews, images or text which you post, publish,
                  contribute or otherwise submit to the earwig Platform (
                  <span style={{ fontWeight: 900 }}>
                    ​ user ​ generated ​ content{" "}
                  </span>
                  or ​<span style={{ fontWeight: 900 }}>​ UGC​ </span> ) must
                  comply with our ​
                  <UnderlinedLink to={COMMUNITY_GUIDELINES_URL}>
                    ​Community Guidelines
                  </UnderlinedLink>
                  ​ . Please read the ​
                  <UnderlinedLink to={COMMUNITY_GUIDELINES_URL}>
                    ​Community Guidelines
                  </UnderlinedLink>
                  ​ carefully.
                </Li>
                <Li>
                  Details about how we and others may use your UGC and how you
                  can use their UGC are set out in the ​{" "}
                  <UnderlinedLink to={COMMUNITY_GUIDELINES_URL}>
                    ​Community Guidelines
                  </UnderlinedLink>{" "}
                  .
                </Li>
                <Li>
                  You own any copyright in the UGC that you post to the
                  Community. However, when you post such content, you hereby
                  grant us perpetual, unlimited, free permission to republish
                  that content on the earwig Platform and to redistribute, make
                  available and/or sell that content in any form or medium
                  throughout the world, including as part of an edited
                  compilation.
                </Li>
                <Li style={{ fontWeight: 900, textDecoration: "underline" }}>
                  We are not obliged to routinely monitor Reviews or other UGC
                  on the earwig Platform. However, if you observe any UGC which
                  you believe does not comply with our Community Guidelines,
                  please either: (i) report that UGC to us by clicking on the
                  relevant ‘Report’ link nearby; or (ii) contact us using the
                  contact details at the bottom of this page, so that we can
                  review the UGC concerned and take any action, as necessary.
                </Li>
                <Li>
                  Our interpretation of the ​{" "}
                  <UnderlinedLink to={COMMUNITY_GUIDELINES_URL}>
                    ​Community Guidelines
                  </UnderlinedLink>{" "}
                  and our decision as to whether or not to remove any reported
                  UGC is within our sole discretion. You understand and agree
                  that if we choose not to remove any reported UGC that you find
                  objectionable, that decision will not constitute a violation
                  of these Terms.
                </Li>
                <Li>
                  Whilst we have no obligation to do so, we reserve the right to
                  actively review, moderate and delete any UGC (or portion
                  thereof) that we believe, in our sole discretion, violates
                  these Terms, the ​
                  <UnderlinedLink to={COMMUNITY_GUIDELINES_URL}>
                    ​Community Guidelines
                  </UnderlinedLink>{" "}
                  and/or that we deem inappropriate.
                </Li>
                <Li>
                  We reserve the right to suspend or terminate your account
                  (and/or withdraw any UGC posted through it), report you to law
                  enforcement, regulatory authorities or administrative bodies
                  and/or take legal action against you in respect of any UGC you
                  post, publish, contribute or otherwise submit to the earwig
                  Platform.
                </Li>
              </Ol>
            </Li>
            <Li style={{ fontWeight: "900" }}>
              Liability in relation to User Generated Content
              <Ol>
                <Li>
                  We provide the earwig Platform in good faith, but we do not
                  warrant the truth, accuracy, integrity, quality or
                  completeness of the information, UGC or other content or
                  postings that appear on the earwig Platform and you should not
                  rely on them being accurate, truthful or complete.
                </Li>
                <Li>
                  To the fullest extent permissible under applicable law we
                  disclaim any and all promises, warranties, conditions, or
                  representations relating to the UGC. In particular:
                  <Ol>
                    <Li>
                      we are not responsible for verifying the ownership of any
                      content posted or uploaded onto the earwig Platform; and
                    </Li>
                    <Li>
                      any UGC, including the posting of comments or information
                      on the earwig Platform (other than content that we
                      publish) is the opinion of the person posting only and in
                      no way reflects our opinions, views or attitudes, nor
                      constitutes any form of recommendation, representation,
                      endorsement or arrangement by us. To be clear, each user
                      acts on his/her own behalf at all times and does not act
                      as our representative or agent in any way.
                    </Li>
                  </Ol>
                </Li>
                <Li>
                  We will not be responsible or liable for any form of direct,
                  indirect, consequential or special loss in connection with
                  your UGC or any other users’ UGC including any direct or
                  indirect loss of profits, revenue, business, data,
                  opportunity, goodwill, reputation and/or business
                  interruption.
                </Li>
                <Li>
                  By posting any UGC on the earwig Platform you promise to us
                  and to other users that:
                  <Ol>
                    <Li>
                      you either own any copyright and/or other intellectual
                      property rights in that content or that you have obtained
                      the necessary right(s) to make the UGC available through
                      the earwig Platform (or, where, applicable, the right to
                      embed or link to that content) in accordance with these
                      Terms and to permit its use via the earwig Platform or in
                      any other way permitted under these Terms; and
                    </Li>
                    <Li>
                      you will not, by contributing that UGC, be: (i) infringing
                      anyone’s rights, including any confidentiality or data
                      protection rights; (ii) violating the{" "}
                      <UnderlinedLink to={COMMUNITY_GUIDELINES_URL}>
                        ​Community Guidelines
                      </UnderlinedLink>
                      ; or (iii) breaching any law or regulation (including
                      applicable data protection law).
                    </Li>
                  </Ol>
                </Li>
                <Li>
                  You agree that you are solely responsible for any and all UGC
                  that you post on the earwig Platform and that by posting UGC
                  to the earwig Platform you may expose yourself to liability if
                  your UGC violates applicable law or any third party right.
                </Li>
              </Ol>
            </Li>
            <SubTitle left style={{ margin: 0, padding: 0, marginTop: "25px" }}>
              SECTION C: GENERAL PROVISIONS
            </SubTitle>
            <Li style={{ fontWeight: "900" }}>
              Promises, liability and disclaimer
              <Ol>
                <Li>
                  The earwig Platform is provided on an "as is" and “information
                  only” basis. To the fullest extent permissible under
                  applicable law, we disclaim any and all promises, warranties,
                  conditions, or representations relating to the earwig Platform
                  and its content, whether express, implied, oral or written. In
                  particular we do not make any promises as to the truth,
                  accuracy, integrity, quality or completeness of the content or
                  information that appears on the earwig Platform and you should
                  not rely on it being accurate, truthful or complete.
                </Li>
                <Li>
                  By using the earwig Platform you acknowledge and accept the
                  inherent risks, characteristics and limitations of the
                  internet, particularly in terms of technical performance of
                  the earwig Platform, response times to view, verify or
                  transfer information; and the risks inherent in all third
                  party links, connections and transfers via the internet.
                  Accordingly, except to the extent required by our data
                  protection and other legal obligations:
                  <Ol>
                    <Li>
                      we do not make any promises about the availability or
                      accessibility of the earwig Platform or promise that your
                      access to the earwig Platform, the content on it or the
                      services we provide will be delivered uninterrupted, in a
                      timely manner or error-free;
                    </Li>
                    <Li>
                      we are not responsible for any data or information
                      uploaded by any users or Visitors including any content
                      posted, uploaded or published on the earwig Platform
                      except to the extent required by data protection and other
                      obligations under the law. It is your responsibility to
                      make backup copies of any of the content you post, upload
                      or publish on the earwig Platform and we strongly
                      recommend that you do so; and
                    </Li>
                    <Li>
                      we make no promises in respect of any harm that may be
                      caused by the transmission of a computer virus, worm, time
                      bomb, Trojan horse, cancelbot, logic bomb or any other
                      form of programming routine designed to damage, destroy or
                      otherwise impair a computer's functionality or operation
                      including transmission arising from software you use to
                      download the content, the earwig Platform or the servers
                      that make it available. In this respect you agree that it
                      is your responsibility to install suitable anti-virus and
                      security software on your computer hardware and other
                      devices to protect against any such bugs, viruses or other
                      such harmful programming routines. Any content downloaded
                      or otherwise obtained through the use of the earwig
                      Platform is done at your own risk and you will be solely
                      responsible for any damage to your computer system or loss
                      of data that results from the download of any such
                      content.
                    </Li>
                  </Ol>
                </Li>
                <Li>
                  We will not be responsible or liable to any Visitors using the
                  earwig Platform for:
                  <Ol>
                    <Li>
                      any form of indirect, consequential or special loss; or
                    </Li>
                    <Li>
                      any financial loss or loss of data, opportunity, goodwill
                      or reputation, in each case whether such loss is direct or
                      indirect.
                    </Li>
                  </Ol>
                </Li>
                <Li>
                  There are certain liabilities which we cannot exclude by law
                  and nothing in these Terms excludes or limits our liability
                  for the following:
                  <Ol>
                    <Li>
                      for death or personal injury caused by our negligence;
                    </Li>
                    <Li>fraud or fraudulent misrepresentation; or</Li>
                    <Li>
                      any other matter for which it would be illegal or unlawful
                      for us to exclude or attempt to exclude its liability.
                    </Li>
                  </Ol>
                </Li>
                <Li>
                  If we are found to be liable, our total liability in respect
                  of all claims made against us in connection with these Terms
                  (other than those mentioned in paragraph 6.4) is as follows:
                  <Ol>
                    <Li>
                      to the extent that such claims relate to any UGC submitted
                      to or posted on the earwig Platform, our maximum liability
                      shall be £100; and
                    </Li>
                    <Li>
                      in relation to any claims not mentioned above in this
                      paragraph 6.5, our liability shall be limited to £100.
                    </Li>
                  </Ol>
                </Li>
              </Ol>
            </Li>
            <Li>
              <span style={{ fontWeight: 900, display: "block" }}>
                Your obligation to indemnify us
              </span>
              You agree only to use the earwig Platform in accordance with these
              Terms. You agree that you will indemnify and keep indemnified us
              (and our employees, officers, agents and suppliers) in full for
              any damages, losses, costs and expenses, including reasonable
              legal fees we incur that arise out of any breach by you of these
              Terms (including any actions you take which disrupt access to
              and/or the functioning of the earwig Platform), any violation by
              you of our{" "}
              <UnderlinedLink to={COMMUNITY_GUIDELINES_URL}>
                ​Community Guidelines
              </UnderlinedLink>{" "}
              or any liability we incur as a result of the use of the earwig
              Platform by you or any other person that uses your account as a
              result of your negligence.
            </Li>
            <Li style={{ fontWeight: "900" }}>
              Our content
              <Ol>
                <Li>
                  Except for any UGC and other third party owned photos, logos
                  or trade marks displayed or made available on the earwig
                  Platform, all of the content on the earwig Platform ​ is owned
                  by (and all copyright, trade mark and other intellectual
                  property rights in that content, shall at all times remain
                  vested in) us or our licensors and is protected by UK and
                  international copyright and other intellectual property laws.
                </Li>
                <Li>
                  All references in these Terms to ‘content’ includes any
                  information or other material found on or via the earwig
                  Platform, including without limitation text, databases,
                  graphics, videos, software and all other features found on or
                  via the earwig Platform.
                </Li>
                <Li>
                  We make the earwig Platform and our content available through
                  the earwig Platform for your personal, non-commercial use
                  only. You may view the earwig Platform’s pages and content
                  online and may print a copy of these Terms and store such
                  Terms in electronic form on your computer for your records,
                  provided you keep intact any and all copyright and proprietary
                  notices. You may not otherwise reproduce, modify, copy or
                  distribute or use any of the content on the earwig Platform
                  other than as expressly permitted under these Terms without
                  our prior written consent.
                </Li>
                <Li>
                  You are not in any circumstances permitted to:
                  <Ol>
                    <Li>
                      make commercial use of any content on the earwig Platform;
                    </Li>
                    <Li>
                      duplicate, copy or re-sell any, all or part of the earwig
                      Platform in contravention of the provisions of our Terms;
                    </Li>
                    <Li>
                      adapt, vary, edit, modify, translate or transpose, in part
                      or in whole, any of the content on the earwig Platform;
                    </Li>
                    <Li>
                      scrape, harvest, mine, retrieve, meter or otherwise gather
                      by electronic means any data or other content from the
                      earwig Platform whether through the use of bots, crawlers,
                      robots, spiders, automatic devices, programs or otherwise;
                    </Li>
                    <Li>
                      use the content to compile a database of, or re-create the
                      whole or substantial part of the content by making
                      repeated and systematic copies of insubstantial parts of,
                      any of the content;
                    </Li>
                    <Li>
                      alter, modify or circumvent or attempt to circumvent, any
                      copy protection and/or digital rights management measures
                      within the earwig Platform or its content, including any
                      watermarks;
                    </Li>
                    <Li>
                      interfere with or disrupt the earwig Platform or servers
                      or networks connected to the earwig Platform, or disobey
                      any requirements, procedures, policies or regulations of
                      networks connected to the earwig Platform; or
                    </Li>
                    <Li>
                      remove, obscure or otherwise tamper with any copyright and
                      proprietary notices that relate to or are contained within
                      the content.
                    </Li>
                  </Ol>
                </Li>
                <Li>
                  Where the earwig Platform includes content provided by users
                  or by others, please refer to the ​{" "}
                  <UnderlinedLink to={COMMUNITY_GUIDELINES_URL}>
                    ​Community Guidelines
                  </UnderlinedLink>{" "}
                  ​ for further details of permitted uses.
                </Li>
                <Li>
                  No permission is given in respect of the use of any of our
                  trade marks or brands, and any such use may constitute an
                  infringement of the holder’s rights​ .
                </Li>
              </Ol>
            </Li>
            <Li style={{ fontWeight: "900" }}>
              General prohibitions on access and use of the earwig Platform
              <Ol>
                <Li>
                  You may use the earwig Platform ​ only for lawful purposes.
                  You may not use the earwig Platform:
                  <Ol>
                    <Li>
                      in any way that breaches any applicable local, national or
                      international law or regulation;
                    </Li>
                    <Li>
                      in any way that is unlawful or fraudulent, or has any
                      unlawful or fraudulent purpose or effect; or
                    </Li>
                    <Li>
                      to knowingly transmit, send or upload any data or other
                      material that contains viruses, Trojan horses, worms,
                      time-bombs, keystroke loggers, spyware, adware or any
                      other harmful programs or similar computer code designed
                      to adversely affect the operation of any computer software
                      or hardware.
                    </Li>
                  </Ol>
                </Li>
              </Ol>
            </Li>
            <Li style={{ fontWeight: "900" }}>
              Links
              <Ol>
                <Li>
                  You acknowledge that the earwig Platform ​ may include links
                  to third-party websites. We do not review these third-party
                  websites nor have any control over them, and we are not
                  responsible for the websites or their content or availability.
                  We do not therefore endorse, or make any representations
                  about, them or any content found there or any results that may
                  be obtained from using them.
                </Li>
                <Li>
                  If you decide to access any of these third-party websites, you
                  do so entirely at your own risk.
                </Li>
                <Li>
                  If you use a linked site, any personal information you give
                  them will be dealt with in line with their privacy policy, not
                  ours, so please ensure that you read their terms and
                  conditions and privacy policy before you use their websites
                  and provide any personal information.
                </Li>
                <Li>
                  You may only link to the earwig Platform​ p rovided that:
                  <Ol>
                    <Li>
                      the earwig Platform is not loaded into frames on the site
                      you’re linking from, unless we expressly agree; and
                    </Li>
                    <Li>
                      your site or services do not misrepresent its relationship
                      with us or present false information about us or otherwise
                      harm our business.
                    </Li>
                  </Ol>
                </Li>
                <Li>
                  We reserve the right to withdraw linking permission at any
                  time without prior notice.
                </Li>
              </Ol>
            </Li>

            <Li style={{ fontWeight: "900" }}>
              Copyright complaints
              <Ol>
                <Li>
                  We respect the intellectual property rights of others, and we
                  prohibit users of the earwig Platform from submitting,
                  uploading, posting or otherwise transmitting any materials
                  that infringe or violate another person’s intellectual
                  property rights.
                </Li>
                <Li>
                  It is our policy to comply with clear notices of alleged
                  copyright infringement. If you wish to submit a notice of
                  alleged copyright infringement or a counter-notice, please
                  contact us using the details provided at the bottom of these
                  Terms, or by reporting the content by clicking the applicable
                  ‘Report’ link nearby.
                </Li>
                <Li>
                  Additionally, it is our policy to terminate usage rights and
                  any applicable user accounts of users we determine to be
                  repeat infringers of others’ copyright.
                </Li>
                <Li>
                  Content hosted on third-party websites accessible from the
                  earwig Platform is the responsibility of those websites, and
                  not our responsibility. If you are the copyright owner of
                  content hosted on a third-party website, and you have not
                  authorised the use of your content, please contact the
                  administrator of the hosting website directly to have the
                  content removed.
                </Li>
              </Ol>
            </Li>
            <Li>
              <span style={{ fontWeight: 900, display: "block" }}>
                General complaints and questions
              </span>
              If you have any complaints or questions please contact us via
              email or by post using the contact information at the bottom of
              these Terms.
            </Li>

            <Li>
              <span style={{ fontWeight: 900, display: "block" }}>
                Written communications
              </span>
              When using the earwig Platform, you accept that communication with
              us will be mainly electronic. We will contact you by email or
              provide you with information by posting notices on the earwig
              Platform. For contractual purposes, you agree to this electronic
              means of communication and you acknowledge that all contracts,
              notices, information and other communications that we provide to
              you electronically comply with any legal requirement that such
              communications be in writing.
            </Li>

            <Li style={{ fontWeight: "900" }}>
              General
              <Ol>
                <Li>
                  <span style={{ textDecoration: "underline" }}>
                    Severability.
                  </span>{" "}
                  If any part of these Terms is found to be unenforceable as a
                  matter of law, all other parts of these Terms will not be
                  affected and shall remain in force. For the avoidance of
                  doubt, should these Terms or any part of them be deemed void
                  or voidable, this shall not affect the validity of any licence
                  provided under these Terms.
                </Li>
                <Li>
                  <span style={{ textDecoration: "underline" }}>
                    Reliance on these Terms.
                  </span>{" "}
                  We intend to rely on these written Terms and any document
                  expressly referred to in them in relation to the subject
                  matter of any contract between us. We and you will be legally
                  bound by these Terms.
                </Li>
                <Li>
                  <span style={{ textDecoration: "underline" }}>
                    Events or circumstances beyond our reasonable control.
                  </span>
                  {"  "} If we are prevented or delayed from complying with our
                  obligations under these Terms by anything you (or anyone
                  acting on your behalf) does or fails to do or due to events or
                  circumstances beyond our reasonable control. In such
                  circumstances including fire, flood and other acts of God,
                  strikes, trade disputes, lock outs, restrictions of imports or
                  exports, riot, accident, disruption to energy supplies, civil
                  commotion, acts of terrorism or war, our inability or delay in
                  performing our obligations will not be deemed to be in breach
                  of contract.
                </Li>
                <Li>
                  <span style={{ textDecoration: "underline" }}>
                    References to ‘including’ and other similar expressions.
                  </span>
                  In these Terms, words that appear after the expression
                  ‘include’, ‘including’, ‘other’, ‘for example’, ‘such as’ or
                  ‘in particular’ (or any similar expression) will not limit the
                  meaning of the words appearing before such expression.
                </Li>
                <Li>
                  <span style={{ textDecoration: "underline" }}>
                    You may not transfer your rights under these Terms to
                    someone else.
                  </span>
                  You may not assign, sub-license or otherwise transfer any of
                  your rights under these Terms.
                </Li>
                <Li>
                  <span style={{ textDecoration: "underline" }}>
                    We may transfer our rights and obligations under these Terms
                    to someone else.
                  </span>
                  We may transfer our rights and obligations under these Terms
                  to someone else. ​ We may assign, novate or otherwise transfer
                  our rights and obligations under these Terms to another
                  organisation. We will contact you to let you know if we plan
                  to do this.
                </Li>
                <Li>
                  <span style={{ textDecoration: "underline" }}>Waiver. </span>
                  If you breach these Terms or violate the ​{" "}
                  <UnderlinedLink to={COMMUNITY_GUIDELINES_URL}>
                    ​Community Guidelines
                  </UnderlinedLink>{" "}
                  and we choose to ignore your breach or violation, we will
                  still be entitled to use our rights and remedies at a later
                  date or in any other situation where you breach the Terms or
                  violate the{" "}
                  <UnderlinedLink to={COMMUNITY_GUIDELINES_URL}>
                    ​Community Guidelines
                  </UnderlinedLink>{" "}
                  ,​ again.
                </Li>
                <Li>
                  <span style={{ textDecoration: "underline" }}>
                    Electronic Commerce (EC Directive) Regulations 2002 (​ ECRs​
                    ).
                  </span>
                  You agree that, if you are not a consumer, we are not required
                  to comply with the requirements set out in regulations 9 or 11
                  of the ECRs.
                </Li>
                <Li>
                  <span style={{ textDecoration: "underline" }}>
                    Exclusion of third party rights.
                  </span>
                  These Terms do not create any right enforceable by any person
                  who is not a party to them (or any contract made under them),
                  except that the provisions of these Terms may be enforced by
                  any of our licensors subject to and in accordance with the ​
                  Contracts (Rights of Third Parties) Act 1999 ​.
                </Li>
                <Li>
                  <span style={{ textDecoration: "underline" }}>Language.</span>
                  ​ The Terms and any contract between us will be concluded in
                  English.
                </Li>
                <Li>
                  <span style={{ textDecoration: "underline" }}>
                    Governing law and jurisdiction.
                  </span>
                  ​ Any disputes or claims between us arising out of or in
                  connection with these Terms or any contract made under them
                  (including non-contractual disputes or claims) are governed by
                  and construed in accordance with the law of England and Wales.
                  Any disputes or claims arising shall be subject to the
                  non-exclusive jurisdiction of the courts of England and Wales.
                  Nothing in this paragraph shall deprive consumers of the right
                  to bring or defend proceedings in their home state nor of the
                  protection afforded to them by the mandatory rules of law of
                  the country in which they live.
                </Li>
              </Ol>
            </Li>

            <Li>
              <span style={{ fontWeight: 900, display: "block" }}>
                Changes to these Terms
              </span>
              We may make changes to these Terms at any time by sending you an
              email with the modified Terms or by posting a copy of them on the
              earwig Platform. Any changes will take effect 7 days after the
              date of our email or the date on which we post the modified terms
              on the earwig Platform, whichever is the earlier. If you continue
              to use the earwig Platform ​ after that period has expired, it
              means that you accept any such changes.
            </Li>
            <Li>
              <span style={{ fontWeight: 900, display: "block" }}>
                Contact us
              </span>
              The earwig Platform is owned by: Subtap Limited
              <br />
              Registered company number: 10912570
              <br />
              Registered address: 2 Western Street, Barnsley, South Yorkshire,
              S70 2BP
              <br />
              VAT registration number: 303514840
              <br />
              Email address: hello@earwig.work
              <br />
              Postal address: 2 Western Street, Barnsley, S70 2BP
            </Li>

            {/* <Li></Li>
                    <Li></Li> 
                    */}
          </Ol>
        </ContentWrapper>
      </Wrapper>
    );
  }
}
