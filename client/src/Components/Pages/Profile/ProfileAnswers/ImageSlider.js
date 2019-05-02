import React from "react";
import axios from "axios";
import { Carousel } from "antd";
import { withRouter, Link } from "react-router-dom";

import { SliderWrapper, ImgWrapper, Image } from "./ProfileAnswers.style";

import { StyledAntIcon } from "./../Profile.style";

import { REPORT_CONTENT_URL } from "./../../../../constants/naviagationUrls";

import { ReactComponent as LeftArrow } from "../../../../assets/leftarrowicon.svg";

import { ReactComponent as RightArrow } from "../../../../assets/right-arrow.icon.svg";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.carousel = React.createRef();
    this.state = {
      images: [],
      errors: { image: "" },
      answers: [],
      activeIndex: 0
    };
  }

  componentDidMount() {
    const images = this.props.question.answers.map(item => item.answer);
    const answers = this.props.question.answers.map(item => item.review);

    axios
      .post("/api/wroksite-images", images)
      .then(res => {
        this.setState({ images: res.data.images, answers: answers });
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

  render() {
    const { images, activeIndex } = this.state;
    const { organization } = this.props;
    const [activeReview] = organization.reviews.filter(
      item => item._id === this.state.answers[this.state.activeIndex]
    );

    return (
      <>
        {this.state.errors && !this.state.errors.image ? (
          <div
            style={{
              position: "relative",
              maxWidth: "500px",
              margin: " 0 auto"
            }}
          >
            <SliderWrapper>
              <LeftArrow
                fill="white"
                height="2rem"
                width="2rem"
                onClick={this.next}
                className="left-arrow"
              />
              <Carousel
                effect="scrollx"
                dots={false}
                ref={node => (this.carousel = node)}
                afterChange={this.afterChange}
              >
                {images &&
                  images.map(img => (
                    <ImgWrapper style={{ position: "relative" }}>
                      <Image src={img} alt="" />
                      <h1 style={{ position: "absolute" }}>hello</h1>
                    </ImgWrapper>
                  ))}
              </Carousel>
              <RightArrow
                height="2rem"
                width="2rem"
                fill="white"
                onClick={this.previous}
                className="right-arrow"
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
              to={{
                pathname: REPORT_CONTENT_URL,
                state: {
                  review: {
                    user: activeReview && activeReview.user
                  },
                  organization,
                  image: images[activeIndex],
                  target: "worksiteImage"
                }
              }}
            >
              <StyledAntIcon type="flag" />
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
