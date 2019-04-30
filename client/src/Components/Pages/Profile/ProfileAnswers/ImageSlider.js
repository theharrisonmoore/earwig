import React from "react";
import axios from "axios";
import { Carousel } from "antd";
import { withRouter } from "react-router-dom";

import { SliderWrapper, ImgWrapper, Image } from "./ProfileAnswers.style";

import { ReactComponent as LeftArrow } from "../../../../assets/leftarrowicon.svg";

import { ReactComponent as RightArrow } from "../../../../assets/right-arrow.icon.svg";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.carousel = React.createRef();
    this.state = { images: [], errors: { image: "" } };
  }

  componentDidMount() {
    const images = this.props.question.answers.map(item => item.answer);
    axios
      .post("/api/wroksite-images", images)
      .then(res => {
        this.setState({ images: res.data.images });
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
  render() {
    const { images } = this.state;
    return (
      <>
        {this.state.errors && !this.state.errors.image ? (
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
            >
              {images &&
                images.map(img => (
                  <ImgWrapper>
                    <Image src={img} alt="" />
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
        ) : (
          <div>Something went wrong try to refresh the page</div>
        )}
      </>
    );
  }
}

export default withRouter(Slider);
