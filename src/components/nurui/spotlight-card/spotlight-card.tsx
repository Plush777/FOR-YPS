"use client";

import React, { ReactNode } from "react";
import styles from "./spotlight-card.module.css";

interface GlowCardProps {
  children?: ReactNode;
  className?: string;
}

const GlowCard: React.FC<GlowCardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
          ${styles.wrap}
          ${className}
          spotlightCard
        `}
    >
      {children}
    </div>
  );
};

export { GlowCard };
