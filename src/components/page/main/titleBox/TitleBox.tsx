import styles from "./titleBox.module.css";

type Props = {
  children: React.ReactNode;
  direction?: string;
  gsapClassName?: string;
  childrenType?: string;
};

export default function TitleBox({
  children,
  gsapClassName = "",
  direction,
}: Props) {
  return (
    <div
      className={`
        ${styles.titleBox} 
        ${gsapClassName}
        titleBox
        ${direction === "column" ? `${styles.column} column` : ""}
      `}
    >
      {children}
    </div>
  );
}
