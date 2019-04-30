import React from "react";
import axios from "axios";
import { Carousel } from "antd";
import "./Slider.css";

import { ReactComponent as LeftArrow } from "../../../../assets/leftarrowicon.svg";

import { ReactComponent as RightArrow } from "../../../../assets/right-arrow.icon.svg";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.carousel = React.createRef();
    this.state = { images: [] };
  }

  componentDidMount() {
    const images = this.props.question.answers.map(item => item.answer);
    axios
      .post("/api/wroksite-images", images)
      .then(res => {
        console.log("res", res.data.images);
        this.setState({ images: res.data.images });
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  next = () => {
    this.carousel.next();
  };

  previous = () => {
    this.carousel.prev();
  };
  render() {
    const { question } = this.props;

    // const images = question.answers.map(item => item.answer);
    console.log("images", this.state.images);
    const images = this.state.images;
    return (
      <div
        style={{
          background: "grey",
          position: "relative",
          width: "70%",
          margin: "0 auto"
        }}
      >
        <LeftArrow
          fill="white"
          height="2rem"
          width="2rem"
          onClick={this.previous}
          style={{
            position: "absolute",
            top: "50%",
            left: "0",
            zIndex: "10000",
            transform: "translateY(-50%)"
          }}
        />

        <Carousel
          effect="scrollx"
          dots={false}
          ref={node => (this.carousel = node)}
        >
          {images &&
            images.map(img => (
              <div>
                <img src={img} alt="" />
              </div>
            ))}
        </Carousel>
        <RightArrow
          height="2rem"
          width="2rem"
          fill="white"
          onClick={this.previous}
          style={{
            position: "absolute",
            top: "50%",
            right: "0",
            zIndex: "10000",
            transform: "translateY(-50%)"
          }}
        />
      </div>
    );
  }
}

export default Slider;
