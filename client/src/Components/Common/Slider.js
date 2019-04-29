import React from "react";
import { Carousel } from "antd";
import "./Slider.css";

import { ReactComponent as LeftArrow } from "../../assets/leftarrowicon.svg";

import { ReactComponent as RightArrow } from "../../assets/right-arrow.icon.svg";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.carousel = React.createRef();
  }

  next = () => {
    this.carousel.next();
  };

  previous = () => {
    this.carousel.prev();
  };
  render() {
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
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
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
