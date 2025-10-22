"use client";

import { useEffect, useState } from "react";
import styles from "./glowing-card.module.css";

type Props = {
  children: React.ReactNode;
};

export default function GlowingCard({ children }: Props) {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 1) % 360);
    }, 10); // smooth rotation
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.wrap} glowingCard`}>
      <div className={styles.inner}>
        {children}

        <div
          className={styles.box}
          style={{
            borderImage: `conic-gradient(from ${angle}deg, #669900, #99cc33, #ccee66, #006699, #3399cc, #990066, #cc3399, #ff6600, #ff9900, #ffcc00, #669900) 1`,
            borderStyle: "solid",
          }}
        />
      </div>
    </div>
  );
}
