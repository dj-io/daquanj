import type { SVGProps } from "react";

const Medium = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1000 1000"
    {...props}
  >
    <circle cx="275" cy="500" r="225" />
    <ellipse cx="675" cy="500" rx="175" ry="375" />
    <ellipse cx="925" cy="500" rx="75" ry="375" />
  </svg>
);

export default Medium;
