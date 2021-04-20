import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgDog(props) {
  return (
    <Svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="dog"
      style={{fill: props.color}}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      {...props}
    >
      <Path
        fill="currentColor"
        d="M298.06 224L448 277.55V496a16 16 0 01-16 16h-64a16 16 0 01-16-16V384H192v112a16 16 0 01-16 16h-64a16 16 0 01-16-16V282.09C58.84 268.84 32 233.66 32 192a32 32 0 0164 0 32.06 32.06 0 0032 32zM544 112v32a64 64 0 01-64 64h-32v35.58l-128-45.71V48c0-14.25 17.22-21.39 27.31-11.31L374.59 64h53.63c10.91 0 23.75 7.92 28.62 17.69L464 96h64a16 16 0 0116 16zm-112 0a16 16 0 10-16 16 16 16 0 0016-16z"
      />
    </Svg>
  );
}

export default SvgDog;
