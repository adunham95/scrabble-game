import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgWhale(props) {
  return (
    <Svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="whale"
      style={{fill: props.color}}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      {...props}
    >
      <Path
        fill="currentColor"
        d="M544 160c-243.05 0-315.29 224-380.12 224-19.78 0-35.88-16.09-35.88-35.87v-97.99l49.75-30.51A32.007 32.007 0 00192 193v-80.98c0-12.78-14.24-20.4-24.88-13.31L96 146.13 24.88 98.71C14.24 91.63 0 99.25 0 112.03V193c0 10.7 5.35 20.69 14.25 26.62L64 250.14v97.99C64 403.2 108.8 448 163.88 448H576c35.35 0 64-28.65 64-64V256c0-52.94-43.06-96-96-96zM432 288c8.84 0 16 7.16 16 16s-7.16 16-16 16-16-7.16-16-16 7.16-16 16-16z"
      />
    </Svg>
  );
}

export default SvgWhale;
