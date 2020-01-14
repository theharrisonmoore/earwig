import React from "react";
import axios from "axios";
import { Carousel } from "antd";
import { withRouter, Link } from "react-router-dom";
import Lightbox from "lightbox-react";

import { SliderWrapper, ImgWrapper, Image } from "./ProfileAnswers.style";

import { colors } from "../../../../theme";
import Icon from "../../../Common/Icon/Icon";
import { addSearchParamsToLink } from "../../../../helpers";

import { REPORT_CONTENT_URL } from "../../../../constants/naviagationUrls";

import { ReactComponent as LeftArrow } from "../../../../assets/leftarrowicon.svg";

import { ReactComponent as RightArrow } from "../../../../assets/right-arrow.icon.svg";

import "lightbox-react/style.css";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.carousel = React.createRef();
    this.state = {
      images: [],
      errors: { image: "" },
      answers: [],
      activeIndex: 0,
      isOpen: false
    };
  }

  componentDidMount() {
    const images = this.props.question.answers.map(item => item.answer);
    const answers = this.props.question.answers.map(item => item.review);

    axios
      .post("/api/wroksite-images", images)
      .then(res => {
        this.setState({ images: res.data.images, answers });
      })
      .catch(err => {
        this.setState({
          errors: { ...this.state.errors, image: "image error" }
        });
      });
  }

  next = () => {
    this.carousel.next();
  };

  previous = () => {
    this.carousel.prev();
  };

  afterChange = index => {
    this.setState({ activeIndex: index });
  };

  handleOpenLightBox = () => {
    this.setState({ isOpen: true });
  };

  onCloseRequest = () => {
    this.setState({ isOpen: false });
  };

  onMovePrevRequest = () => {
    const { activeIndex, images } = this.state;
    this.setState({
      activeIndex: (activeIndex + images.length - 1) % images.length
    });
  };

  onMoveNextRequest = () => {
    const { activeIndex, images } = this.state;
    this.setState({
      activeIndex: (activeIndex + 1) % images.length
    });
  };

  render() {
    const { images, activeIndex, isOpen } = this.state;
    const { organization } = this.props;

    const { name: orgName, _id: orgId } = organization;

    const [activeReview] = organization.reviews.filter(
      item => item._id === this.state.answers[this.state.activeIndex]
    );

    const arrowStyle = CSS.supports("( mix-blend-mode: difference )")
      ? {
          mixBlendMode: "difference",
          cursor: "pointer",
          width: "2rem",
          height: "2rem"
        }
      : {
          background: "#364d79",
          cursor: "pointer",
          width: "2rem",
          height: "2rem"
        };

    // creates link to report content
    const reportLink = () => {
      const createLink = addSearchParamsToLink(
        {
          reportedReviewUserId: activeReview && activeReview.user._id,
          orgName,
          orgId,
          target: "worksiteImage",
          image: images[activeIndex] && images[activeIndex].link
        },
        REPORT_CONTENT_URL
      );
      return createLink;
    };

    return (
      <>
        {isOpen && (
          <Lightbox
            mainSrc={images[activeIndex].link}
            nextSrc={images[(activeIndex + 1) % images.length].link}
            prevSrc={
              images[(activeIndex + images.length - 1) % images.length].link
            }
            onCloseRequest={this.onCloseRequest}
            onMovePrevRequest={this.onMovePrevRequest}
            onMoveNextRequest={this.onMoveNextRequest}
          />
        )}

        {this.state.errors && !this.state.errors.image ? (
          <div
            style={{
              position: "relative",
              maxWidth: "500px",
              margin: " 0 auto"
            }}
          >
            <SliderWrapper>
              <div>
                <LeftArrow
                  fill="white"
                  height="2rem"
                  width="2rem"
                  onClick={this.next}
                  className="left-arrow"
                  style={arrowStyle}
                />
              </div>
              <Carousel
                effect="scrollx"
                dots={false}
                ref={node => (this.carousel = node)}
                afterChange={this.afterChange}
                style={{ cursor: "pointer" }}
              >
                {images &&
                  images.map(img => (
                    <div style={{ cursor: "pointer" }}>
                      <ImgWrapper
                        style={{ cursor: "pointer", position: "relative" }}
                        onClick={this.handleOpenLightBox}
                      >
                        <Image
                          src={img.link}
                          alt=""
                          orientation={img.orientation}
                        />
                      </ImgWrapper>
                    </div>
                  ))}
              </Carousel>
              <RightArrow
                height="2rem"
                width="2rem"
                fill="white"
                onClick={this.previous}
                className="right-arrow"
                style={arrowStyle}
              />
            </SliderWrapper>
            <Link
              style={{
                right: "0px",
                width: "33px",
                position: "absolute",
                top: "1px",
                display: "flex",
                background: "white",
                textAlign: "center",
                justifyContent: "center",
                height: "33px",
                alignItems: "center",
                borderRadius: "50%"
              }}
              to={reportLink()}
            >
              <Icon
                icon="flag"
                color={colors.dustyGray4}
                width="27"
                height="27"
              />
            </Link>
          </div>
        ) : (
          <div>Something went wrong try to refresh the page</div>
        )}
      </>
    );
  }
}

export default withRouter(Slider);
