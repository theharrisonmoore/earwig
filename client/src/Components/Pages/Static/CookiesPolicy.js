import React, { Component } from "react";
import {
  Wrapper,
  ContentWrapper,
  SmallTitle,
  Ol,
  Li,
  UnderlinedLink,
  BoldWord,
} from "../../Common/StaticPages.style";

import {
  TERMS_OF_USE_URL,
  PRIVACY_URL,
} from "../../../constants/naviagationUrls";

export default class CookiesPolicy extends Component {
  render() {
    return (
      <Wrapper style={{ textAlign: "left", paddingTop: "3rem" }}>
        <ContentWrapper>
          <SmallTitle>EARWIG</SmallTitle>
          <SmallTitle>COOKIES POLICY</SmallTitle>
          <Ol showFirstNumber>
            <Li style={{ fontWeight: "900" }}>
              OUR USE OF COOKIES
              <Ol>
                <Li>
                  Welcome to earwig. This website, located at{" "}
                  <UnderlinedLink to="www.earwigwork.com">
                    www.earwigwork.com
                  </UnderlinedLink>{" "}
                  <BoldWord> (Site)</BoldWord>
                  {"  "} is owned and operated by Subtap Limited{" "}
                  <strong>(we, us, our)</strong>. Our Site may use cookies to
                  distinguish you from other users. This helps us to provide you
                  with a good experience when you browse the Site and also
                  allows us to improve it. In this Cookies Policy you will find
                  information on what cookies may be set when you visit any of
                  our Site and the purposes for which we use those cookies.
                </Li>
              </Ol>
            </Li>
            <p>
              For further detailed information about this Site, please click
              here to see our{" "}
              <UnderlinedLink to={TERMS_OF_USE_URL}>
                Terms of Use
              </UnderlinedLink>{" "}
              and our{" "}
              <UnderlinedLink to={PRIVACY_URL}>Privacy Policy</UnderlinedLink>.
            </p>
            <Li style={{ fontWeight: "900" }}>
              YOUR CONSENT TO USE COOKIES
              <Ol>
                <Li>
                  Certain cookies we use are strictly necessary for the Site to
                  work. For example, when you visit our Site for the first time,
                  we present you with a pop-up message notifying you about our
                  use of cookies. We had to use a cookie to remember that we
                  have presented this notice to you (you can see details of this
                  cookie in the{" "}
                  <UnderlinedLink to="#cookieDetails">
                    Cookie Details
                  </UnderlinedLink>
                  &nbsp; section below).
                </Li>
                <Li>
                  In relation to all other types of cookies we use, by clicking
                  the relevant button on the Cookie Banner or by continuing to
                  use the Site, you are agreeing to our use of cookies in the
                  manner described in this Cookies Policy. If you continue to
                  use the Site, more cookies and other tracking technologies
                  will be placed on your computer as described in this Cookies
                  Policy in order to enhance your user experience whilst on the
                  Site. Please see further section 4 below regarding the ways
                  you can control or delete the cookies we use.
                </Li>
              </Ol>
            </Li>
            <Li style={{ fontWeight: "900" }}>
              WHAT ARE COOKIES?
              <Ol>
                <Li>
                  A cookie is a small data file that is placed on your browser
                  or the hardware of your computer or other device to allow a
                  website to recognise you as a user when you return to the
                  website, either for the duration of your visit (using a
                  ‘session cookie’) or for repeat visits (a ‘persistent
                  cookie’). Other similar files work in the same way and we use
                  the word ‘cookie’ in this Cookies Policy to refer to all files
                  that collect information in this way.
                </Li>
                <Li>
                  Cookies are an extremely common technology for remembering
                  certain information about a visitor to a website. The vast
                  majority of websites currently make use of cookies and they
                  are commonly used for a wide range of tasks. We use cookies
                  for the following purposes:
                  <Ol>
                    <Li>
                      <strong>Strictly necessary cookies.</strong>
                      These are cookies that are required for the operation of
                      our Site. They include, for example, cookies that enable
                      you to log into secure areas of our Site.
                    </Li>
                    <Li>
                      <strong>Analytical cookies</strong>. They allow us to
                      recognise and count the number of visitors and to see how
                      visitors move around our Site when they are using it. This
                      helps us to improve the way our Site works, for example,
                      by ensuring that users are finding what they are looking
                      for easily.
                    </Li>
                  </Ol>
                </Li>
                <Li>
                  This Cookies Policy gives you information on the specific
                  cookies used on this Site.
                </Li>
              </Ol>
            </Li>
            <Li style={{ fontWeight: "900" }}>
              HOW TO CONTROL AND DELETE COOKIES
              <Ol>
                <Li>
                  If you wish to restrict or block the cookies which are set by
                  the Site (or, indeed, on any other website) you can do this
                  through your browser settings. The ‘Help’ function within your
                  browser should tell you how.
                </Li>
                <Li>
                  Alternatively, you may wish to visit &nbsp;
                  <UnderlinedLink to="http://www.allaboutcookies.org/">
                    http://www.allaboutcookies.org/
                  </UnderlinedLink>
                  &nbsp; which contains comprehensive information on how to do
                  this on a wide variety of browsers. You will also find details
                  on how to delete cookies from your computer, as well as more
                  general information about cookies. Please note that, as these
                  websites are not owned or operated by us, we are not
                  responsible for any of the content on them.
                </Li>
                <Li>
                  Please be aware that restricting cookies may mean that you
                  will not be able to take full advantage of all the features or
                  services available on the Site.
                </Li>
              </Ol>
            </Li>
            <Li style={{ fontWeight: "900" }}>
              MAIN COOKIES USED BY US ON OUR SITE
              <Ol>
                <Li>
                  A list of the main cookies used by us on this Site together
                  with details about what each is used for can be found in the
                  &nbsp;
                  <UnderlinedLink to="#cookieDetails">
                    Cookie Details
                  </UnderlinedLink>
                  &nbsp; section below.
                </Li>
              </Ol>
            </Li>
            <Li style={{ fontWeight: "900" }}>
              THIRD PARTY COOKIES
              <Ol>
                <Li>
                  This Site uses third party cookies. More specifically, we use
                  third party Analytics cookies to help us collect information
                  that allows us to analyse web traffic to our Site. The
                  information collected via the cookies, which is anonymous, is
                  sent to a third party that operates analytics tools which we
                  use to analyse the information collected and improve our Site.
                </Li>
                <Li>
                  A list of the third party cookies used in connection with the
                  Site can be found under the relevant section in the &nbsp;
                  <UnderlinedLink to="#cookieDetails">
                    Cookie Details
                  </UnderlinedLink>
                  &nbsp; section below.
                </Li>
              </Ol>
            </Li>

            <Li style={{ fontWeight: "900" }}>
              EMAIL TRACKING
              <Ol>
                <Li>
                  Some of the emails we send to you may contain a ‘web beacon
                  pixel’ (clear GIFs) or tracked links which allows us to
                  identify when you have opened the email and to verify which
                  links contained in the email you have accessed. We use this
                  information to determine which parts of our emails are of most
                  interest to you.
                </Li>
                <Li>
                  You can delete the pixel by deleting the email. If you do not
                  wish to download the pixel to your computer or other device,
                  you can ensure this by selecting to receive emails from us in
                  plain text rather than HTML, or not opening pictures in your
                  email.
                </Li>
                <Li>
                  Alternatively you can unsubscribe from our mailing list by
                  contacting us at hello@earwig.work
                </Li>
              </Ol>
            </Li>

            <Li style={{ fontWeight: "900" }}>
              CHANGES
              <Ol>
                <Li>
                  We may make changes to this Cookies Policy at any time by
                  sending you an email with the modified terms or, where
                  appropriate, by posting a copy of them on the Site. Any
                  changes will take effect 7 days after the date of our email or
                  the date on which we post the modified terms on the Site,
                  whichever is the earlier.
                </Li>
              </Ol>
            </Li>
            <Li style={{ fontWeight: "900" }}>
              CONTACT US
              <Ol>
                <Li>
                  If you have any questions or concerns about cookies or your
                  privacy when using this Site, please contact us as follows:
                  <Ol>
                    <Li>
                      If you wish to write to us, please write to earwig, 2
                      Western Street, Barnsley, S70 2BP.
                    </Li>
                    <Li>
                      Our email address for data protection queries is
                      hello@earwig.work, alternatively you can use via the Site.
                    </Li>
                  </Ol>
                </Li>
              </Ol>
            </Li>
          </Ol>
          <p>
            <strong>DATE PUBLISHED: 1 MAY 2019</strong>
          </p>
          <SmallTitle id="cookieDetails">Cookie Details</SmallTitle>
          <SmallTitle>Cookies used on our Site</SmallTitle>
          <div className="table">
            <table>
              <tr>
                <th>Cookie </th>
                <th>Name</th>
                <th>Type and Expiry</th>
                <th>Category and Purpose</th>
              </tr>
              <tr>
                <td>PHP SESSION</td>
                <td>PHPSESSID</td>
                <td>First party cookie Session cookie</td>
                <td>
                  <strong>Strictly necessary</strong>: This cookie is essential
                  as it stores technical information needed to make the Site
                  function correctly during browsing.
                </td>
              </tr>
              <tr>
                <td>JSON Web Token </td>
                <td>JWT</td>
                <td>First party cookie Authentication cookie</td>
                <td>
                  <strong>Strictly necessary</strong>: This cookie is essential
                  as it validates Site users’ login credentials.
                </td>
              </tr>

              <tr>
                <td>Banner cookie </td>
                <td>JWT</td>
                <td>First party cookie Persistent cookie: 6 months</td>
                <td>
                  <strong>Strictly necessary</strong>: This cookie is essential
                  as we use it to remember whether you have acknowledged the
                  cookie notice we present to you.
                </td>
              </tr>
            </table>
          </div>

          <SmallTitle>Third Party Cookies used on our Site</SmallTitle>
          <div className="table">
            <table>
              <tr>
                <th>Cookie </th>
                <th>Name</th>
                <th>Category and Purpose</th>
                <th>Further information</th>
              </tr>
              <tr>
                <td>Google Analytics </td>
                <td>
                  _utma <br /> _utmb <br />
                  _utmc
                  <br /> _utmz
                </td>
                <td>First party cookie Session cookie</td>
                <td>
                  <strong>Analytical:</strong> These cookies enable the Google
                  Analytics service we use to function. Google Analytics helps
                  us take and analyse visitor information such as browser usage
                  and new visitor number, which assists us to improve our Site
                  and your user experience.
                </td>
              </tr>
            </table>
          </div>
        </ContentWrapper>
      </Wrapper>
    );
  }
}
