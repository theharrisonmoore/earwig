import ReactPixel from "react-facebook-pixel";

const FBPixelInit = () => {
  if (process.env.NODE_ENV === "production") {
    ReactPixel.init("577033549720607");
  }
};

const FBPixelTrack = (event, data) => {
  if (process.env.NODE_ENV === "production") {
    ReactPixel.track(event, data);
  }
};

export { FBPixelInit, FBPixelTrack };
