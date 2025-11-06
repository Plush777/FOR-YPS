import styles from "./sectionTitle.module.css";
import { forwardRef } from "react";

type Props = {
  text: string;
  className: string;
};

const SectionTitle = forwardRef<HTMLHeadingElement, Props>(
  ({ text, className = "" }, ref) => {
    return (
      <h2
        ref={ref}
        className={`${styles.sectionTitle} ${className} sectionTitle`}
      >
        {text}
      </h2>
    );
  }
);

SectionTitle.displayName = "SectionTitle";

export default SectionTitle;
