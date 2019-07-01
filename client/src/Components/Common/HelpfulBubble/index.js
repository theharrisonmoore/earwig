import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { Wrapper } from "./HelpfulBubble.style";

class HelpfulBubble extends Component {
  state = {
    numbers: []
  };

  componentDidUpdate(prevProps) {
    const prevNumber = prevProps.number;
    const { number } = this.props;
    const { numbers } = this.state;

    if ((number === 0 || number) && prevNumber !== number) {
      this.setState({ numbers: [...numbers, number] }, () => {
        setTimeout(() => {
          const updatedState = this.state;
          // eslint-disable-next-line no-unused-vars
          const [toDelete, ...rest] = updatedState.numbers;

          this.setState({ numbers: [...rest] });
        }, 1000);
      });
    }
  }

  render() {
    const { color } = this.props;
    const { numbers } = this.state;
    return (
      <Wrapper>
        <TransitionGroup>
          {numbers.map(item => (
            <CSSTransition key={item} timeout={600} classNames="item item">
              <div style={{ backgroundColor: color }} className="item">
                {item}
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Wrapper>
    );
  }
}

export default HelpfulBubble;
