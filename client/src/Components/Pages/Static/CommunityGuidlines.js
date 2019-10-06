import React, { Component } from "react";
import {
  Wrapper,
  ContentWrapper,
  SubTitle,
  SmallTitle,
  Ol,
  Li,
  UnderlinedLink,
  BoldWord
} from "./../../Common/StaticPages.style";

import { TERMS_OF_USE_URL } from "./../../../constants/naviagationUrls";

export default class CommunityGuidlines extends Component {
  render() {
    return (
      <Wrapper style={{ paddingTop: "3rem" }}>
        <ContentWrapper>
          <SmallTitle>EARWIG</SmallTitle>
          <SmallTitle>COMMUNITY GUIDELINES</SmallTitle>
          <Ol>
            <Li>
              <Ol displayOrder={true}>
                <Li>
                  These Community Guidelines set out the rules you must follow
                  if you wish to submit any content to our website (located at ​
                  <UnderlinedLink to="/">www.earwig.work</UnderlinedLink>) (<BoldWord>Site</BoldWord> or <BoldWord>earwig Platform</BoldWord>).
                </Li>
                <Li>
                  By using the earwig Platform ​ you accept, and agree to abide
                  by, these Community Guidelines, which supplement and form part
                  of the{" "}
                  <UnderlinedLink target="_blank" to={TERMS_OF_USE_URL}>
                    ​Terms
                  </UnderlinedLink>
                  ​ .
                </Li>
                <SubTitle
                  left
                  style={{ margin: 0, padding: 0, marginTop: "25px" }}
                >
                  Submitting content to the earwig Platform
                </SubTitle>
                <Li>
                  Any information, material and content which you and other
                  users post, contribute or otherwise submit to the earwig
                  Platform is generally known as ‘user generated content’ (​
                  <BoldWord>UGC​</BoldWord> ). Paragraphs 1.4 to 1.9 below set out the rules for contributing UGC, the ways in which we and other users may use your UGC, and how you can use their UGC.
                </Li>
                <Li>
                  You agree to ensure that:
                  <Ol>
                    <Li>
                      your UGC does not contain any personal data about any
                      person unless you have obtained their prior permission to
                      do so. This includes any information that could
                      potentially identify an individual such as their name,
                      date of birth, email or home address, information about
                      their job or their job performance, any contact
                      information or any sensitive information (e.g. regarding
                      their ethnic background or their religious beliefs). You
                      must never include any personal data about children (i.e.
                      individuals under the age of 18), whether your own or of
                      others, in any of your UGC;
                    </Li>
                    <Li>
                      all information that you submit or post is accurate, true
                      and up-to-date in all respects at all times;
                    </Li>
                    <Li>
                      all UGC posted by you is lawful and not defamatory,
                      libellous, fraudulent, untrue, abusive, threatening,
                      harassing, obscene, discriminatory, likely to cause
                      distress or intended to incite hatred;
                    </Li>
                    <Li>
                      after receiving a warning, you do not continue to post or
                      submit comments that would result in the same or a similar
                      warning or that are off-topic; and
                    </Li>
                    <Li>
                      any UGC you submit or post is not in breach of any
                      copyright of other intellectual property laws. In the case
                      of any content that you do not own, you agree to ensure
                      that you have permission from the intellectual property
                      owner to use and to permit its use as contemplated by
                      these Community Guidelines and the ​
                      <UnderlinedLink to={TERMS_OF_USE_URL}>
                        ​Terms
                      </UnderlinedLink>, and by any third parties that we may authorise under
                      the ​
                      <UnderlinedLink to={TERMS_OF_USE_URL}>
                        ​Terms
                      </UnderlinedLink>
                      ​ .
                    </Li>
                  </Ol>
                </Li>
                <Li>
                  You may not:
                  <Ol>
                    <Li>
                      distribute or post any links, including links to websites,
                      files or links that open or run programs;
                    </Li>
                    <Li>
                      distribute any UGC which contains any confidential
                      information (including in relation to your employer, their
                      clients or any construction premises);
                    </Li>
                    <Li>
                      distribute or post any messages in relation to a dispute
                      about any decision we make concerning your conduct under
                      the ​
                      <UnderlinedLink to={TERMS_OF_USE_URL}>
                        ​Terms
                      </UnderlinedLink>
                      ​ or these Community Guidelines;
                    </Li>
                    <Li>
                      distribute or post spam, in particular by sending
                      unsolicited marketing messages or other messages to
                      anyone, or submit or post chain letters or pyramid
                      schemes;
                    </Li>

                    <Li>
                      post or transmit any advertisements for, or solicitations
                      of, business
                    </Li>
                    <Li>
                      distribute viruses or any other technologies that may harm
                      the earwig Platform or the interests of any users of the
                      earwig Platform or otherwise interfere with or disrupt our
                      systems;
                    </Li>
                    <Li>
                      except as permitted under the ​
                      <UnderlinedLink to={TERMS_OF_USE_URL}>
                        ​Terms
                      </UnderlinedLink>
                      ​ or under these Community Guidelines, copy, modify or
                      distribute our content or trade marks, or any content or
                      trade marks owned by a third party or other users of the
                      earwig Platform, unless you have their explicit
                      permission;
                    </Li>
                    <Li>
                      impersonate another person or otherwise misrepresent your
                      affiliation with a person or entity;
                    </Li>
                    <Li>
                      harvest or otherwise collect or use information about
                      others without their explicit consent;
                    </Li>
                    <Li>
                      allow any other person or entity to use your log-in
                      details or account for posting or viewing comments;
                    </Li>
                    <Li>
                      impersonate another person or misrepresent your current or
                      former affiliation with a construction company, worksite
                      or recruitment agency;
                    </Li>
                    <Li>impersonate another person;</Li>
                    <Li>
                      post any UGC that you know is false or misleading or that
                      does not reflect your honest opinion and experience;
                    </Li>
                    <Li>
                      continue to use the earwig Platform whilst your
                      registration is temporarily suspended or after your
                      registration has been permanently terminated; or
                    </Li>
                    <Li>
                      engage in any other conduct that restricts or inhibits any
                      other person from using or enjoying any area of the earwig
                      Platform, or which, in our judgment, exposes us to any
                      liability or detriment of any type.
                    </Li>
                  </Ol>
                </Li>
                <Li>
                  We reserve the right (but we are not obliged) to do any or all
                  of the following:
                  <Ol>
                    <Li>record the communications that are posted to us;</Li>
                    <Li>
                      investigate a claim that any one or more communication
                      does not conform to the terms of these Community
                      Guidelines or otherwise with the ​
                      <UnderlinedLink to={TERMS_OF_USE_URL}>
                        ​Terms
                      </UnderlinedLink>
                      ​ and determine in our sole discretion what action to take
                      in respect of such communication;
                    </Li>
                    <Li>
                      delete without notice your UGC and other communications
                      which are abusive, illegal or disruptive, or that
                      otherwise fail to conform with these Community Guidelines;
                    </Li>
                    <Li>
                      terminate or suspend your earwig Platform account. The
                      length of suspension may vary depending on the reasons for
                      the suspension;
                    </Li>
                    <Li>
                      monitor or disclose any communication to the earwig
                      Platform; and
                    </Li>
                    <Li>
                      remove any communications posted on the earwig Platform,
                      regardless of whether such communications breach these ​
                      <UnderlinedLink to={TERMS_OF_USE_URL}>
                        ​Terms
                      </UnderlinedLink>
                      ​ .
                    </Li>
                  </Ol>
                </Li>
                <SubTitle
                  left
                  style={{ margin: 0, padding: 0, marginTop: "25px" }}
                >
                  Your content
                </SubTitle>
                <Li>
                  By submitting or posting any UGC to the earwig Platform,
                  whether text or pictures or otherwise, you are promising to us
                  and to other users that:
                  <Ol>
                    <Li>
                      you either own all rights (including copyright) in that
                      UGC or that you have obtained the necessary permissions to
                      make the UGC available through the earwig Platform in
                      accordance with these Community Guidelines and the ​
                      <UnderlinedLink to={TERMS_OF_USE_URL}>
                        ​Terms
                      </UnderlinedLink>
                      ​ and permit its use via the earwig Platform and by any
                      third parties we authorise, and that you will provide us
                      with evidence of such permissions should we require; and
                    </Li>
                    <Li>
                      you will not be infringing anyone’s rights or breaching
                      any law or regulation (including data protection and
                      privacy laws) by contributing that UGC and by allowing it
                      to be used in the ways described in these Community
                      Guidelines and the ​
                      <UnderlinedLink to={TERMS_OF_USE_URL}>
                        ​Terms
                      </UnderlinedLink>
                      ​ .
                    </Li>
                  </Ol>
                </Li>

                <SubTitle
                  left
                  style={{ margin: 0, padding: 0, marginTop: "25px" }}
                >
                  Who can use your content and how they can use it
                </SubTitle>
                <Li>
                  When you contribute UGC to the earwig Platform:
                  <Ol>
                    <Li>
                      you hereby grant us and any third parties we authorise
                      unlimited, non-terminable and free permission (including
                      the right to sublicense that permission) to use, re-use,
                      copy, adapt, abridge, amend, distribute, modify,
                      translate, publish, perform, display, develop, reproduce,
                      exploit, communicate to the public and to make your UGC
                      available, in each case, in any form and/or by any media,
                      transmission or channel (whether now known or hereafter
                      devised), whether on a commercial or non-commercial basis
                      anywhere in the world. By way of example only, this will
                      include permission to:
                      <ul
                        style={{
                          listStyle: "upper-alpha",
                          paddingLeft: "30px"
                        }}
                      >
                        <li>
                          make your UGC available through the earwig Platform to
                          other users of the earwig Platform; and
                        </li>
                        <li>
                          allow any third parties authorised by us to reproduce,
                          display, publish, communicate, perform and/or embed
                          your UGC on their platforms, including their websites
                          and applications.
                        </li>
                      </ul>
                    </Li>
                    <Li>
                      you hereby grant to every other user of the earwig
                      Platform unlimited, non-terminable and free permission to
                      use all or any part of your UGC on the same terms as you
                      are permitted to use their UGC, as described in paragraph
                      1.9 below.
                    </Li>
                  </Ol>
                </Li>

                <SubTitle
                  left
                  style={{ margin: 0, padding: 0, marginTop: "25px" }}
                >
                  Your permitted use of UGC on the earwig Platform
                </SubTitle>
                <Li>
                  You may view any UGC posted to the earwig Platform and listen to any audio files we make available for download for your
                  own personal and non-commercial purposes only. You are not, in
                  any circumstances, permitted to:
                  <Ol>
                    <Li>make commercial use of any such content;</Li>
                    <Li>edit any such content; or</Li>
                    <Li>
                      remove, obscure or otherwise tamper with any copyright and proprietary notices that relate to, or are contained within, such content; or
                    </Li>
                    <Li>
                      publish, distribute or share with any other person any files you download from the Platform.
                    </Li>
                  </Ol>
                </Li>
                <SubTitle
                  left
                  style={{ margin: 0, padding: 0, marginTop: "25px" }}
                >
                  Suspension and termination
                </SubTitle>
                <Li>
                  We will determine, in our sole discretion, whether there has
                  been a breach of these Community Guidelines, in whole or in
                  part, through your use of the earwig Platform. When a breach
                  of this policy has occurred, we may take such action as we
                  deem appropriate.
                </Li>
                <Li>
                  Failure to comply with these Community Guidelines constitutes
                  a material breach of the{" "}
                  <UnderlinedLink to={TERMS_OF_USE_URL}>​Terms</UnderlinedLink>​
                  on which you are permitted to use the earwig Platform and may
                  result in our taking all or any of the following actions:
                  <Ol>
                    <Li>
                      immediate, temporary or permanent withdrawal of your right
                      to use the earwig Platform;
                    </Li>
                    <Li>
                      immediate, temporary or permanent removal of any posting
                      or material uploaded by you to the earwig Platform;
                    </Li>
                    <Li>issue of a warning to you;</Li>
                    <Li>
                      legal proceedings against you for reimbursement of all
                      costs on an indemnity basis (including, but not limited
                      to, reasonable administrative and legal costs) resulting
                      from the breach;
                    </Li>
                    <Li>further legal action against you; and</Li>
                    <Li>
                      disclosure of such information to law enforcement
                      authorities as we reasonably feel is necessary.
                    </Li>
                  </Ol>
                </Li>
                <SubTitle
                  left
                  style={{ margin: 0, padding: 0, marginTop: "25px" }}
                >
                  Changes to these Community Guidelines
                </SubTitle>
                <Li>
                  We may change these Community Guidelines from time to time and
                  will post on the earwig Platform, or, where appropriate, send
                  by email to you, the modified versions of these guidelines.
                  Any changes will be effective on the date specified in the
                  post or email.
                </Li>
              </Ol>
            </Li>
          </Ol>
        </ContentWrapper>
      </Wrapper>
    );
  }
}
