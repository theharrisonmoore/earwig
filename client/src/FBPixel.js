import ReactPixel from "react-facebook-pixel";

const FBPixelInit = () => ReactPixel.init("577033549720607");
const FBPixelTrack = (event, data) => ReactPixel.track(event, data);

export { FBPixelInit, FBPixelTrack };
