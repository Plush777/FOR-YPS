import styles from "@/components/page/main/card/cardWrapper.module.css";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function CardWrapper({ className = "", children }: Props) {
  return (
    <div className={`${styles.cardWrapper} ${className} cardWrapper`}>
      {children}
    </div>
  );
}
