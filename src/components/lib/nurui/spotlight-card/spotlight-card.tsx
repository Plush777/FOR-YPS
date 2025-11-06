"use client";

import React, { ReactNode } from "react";
import styles from "./spotlight-card.module.css";

interface GlowCardProps {
  className?: string;
  topContents?: ReactNode;
  bottomContents?: ReactNode;
  cardTitle?: string;
  titleContents?: ReactNode;
}

const GlowCard: React.FC<GlowCardProps> = ({
  className = "",
  topContents,
  bottomContents,
  cardTitle,
  titleContents,
}) => {
  return (
    <div
      className={`
          ${styles.wrap}
          ${className}
          spotlightCard
        `}
    >
      <div className={`${styles.cardTop} cardTop`}>{topContents}</div>

      <div className={`${styles.cardBottom} cardBottom`}>
        <div className={`${styles.cardTitleArea} cardTitleArea`}>
          {titleContents}
          <strong className={`${styles.cardTitle} cardTitle`}>
            {cardTitle}
          </strong>
        </div>
        {bottomContents}
      </div>
    </div>
  );
};

export { GlowCard };
