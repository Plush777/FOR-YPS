import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import styles from "./scrollDownArrow.module.css";
import { useRef } from "react";

export default function ScrollDownArrow() {
  const scrollDownArrow = useRef<SVGSVGElement>(null);
  useGSAP(() => {
    gsap.to(scrollDownArrow.current, {
      y: 8,
      duration: 0.5,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  });

  return (
    <svg
      viewBox="0 0 512 512"
      className={styles.scrollDownArrow}
      ref={scrollDownArrow}
    >
      <path
        fill="white"
        d="M483.2,192.2c-20.5-20.5-53.5-20.8-73.7-0.6L257,344.1L104.5,191.6c-20.2-20.2-53.2-19.9-73.7,0.6  c-20.5,20.5-20.8,53.5-0.6,73.7l190,190c10.1,10.1,23.4,15.1,36.8,15c13.3,0.1,26.7-4.9,36.8-15l190-190  C503.9,245.7,503.7,212.7,483.2,192.2z"
      />
    </svg>
  );
}
