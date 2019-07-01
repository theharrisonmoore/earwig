import styled from "styled-components";

export const Wrapper = styled.div`
  .item {
    position: absolute;
    left: 50%;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    opacity: 1;
    font-weight: 700;
    opacity: 1;
  }

  .item-enter {
    position: absolute;
    top: 0px;
    opacity: 1;
  }

  .item-enter-active {
    opacity: 1;
    transition: all 600ms ease-out;
    transform: translate(-50%, -450%) scale(1.5);
    position: absolute;
  }

  .item-enter-done {
    opacity: 0;
    position: absolute;
    transform: translate(-50%, -450%) scale(0.5);
    color: #fff;
  }
`;
