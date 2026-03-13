import { cn } from "@/lib/utils";
import React from "react";
import styles from "@/components/lib/nurui/border-button/borderButton.module.css";

export default function BorderButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(className, styles.w)}>
      <span className={styles.s}></span>
      <span className={styles.p}>
        <span>{children}</span>
      </span>
    </div>
  );
}
