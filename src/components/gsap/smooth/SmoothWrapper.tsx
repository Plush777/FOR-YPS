import { RefObject } from "react";
import "../../../styles/gsap.css";

type Props = {
  children: React.ReactNode;
  ref: RefObject<HTMLDivElement | null>;
};

export default function SmoothWrapper({ children, ref }: Props) {
  return (
    <div id="smooth-wrapper" ref={ref}>
      <div id="smooth-content">
        <main>{children}</main>
      </div>
    </div>
  );
}
