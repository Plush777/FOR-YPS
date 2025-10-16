import styles from "@/components/animation/titleBoxWrapper/titleBoxWrapper.module.css";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sectionName: string;
};

export default function TitleBoxWrapper({ children, sectionName }: Props) {
  function sectionNameCondition() {
    if (sectionName === "fifth") return styles.fifthHeight;
    if (sectionName === "sixth") return styles.sixHeight;

    return undefined;
  }

  return (
    <div className={`${styles.titleBoxWrapper} ${sectionNameCondition()}`}>
      {children}
    </div>
  );
}
