import styles from "./textBox.module.css";

type Props = {
  children: React.ReactNode;
  childrenStyleClassName?: string;
  horizontal?: string;
  vertical?: string;
  isHeightFull?: Boolean;
  isRowGap?: string;
  gsapClassName?: string;
};

export default function TextBox({
  children,
  childrenStyleClassName = "",
  horizontal = "center",
  vertical = "center",
  isHeightFull = true,
  isRowGap = "md",
  gsapClassName = "",
}: Props) {
  function horizonAlign() {
    if (horizontal === "start") return styles.horizontalStart;
    if (horizontal === "center") return styles.horizontalCenter;
    if (horizontal === "end") return styles.horizontalEnd;
  }

  function verticalAlign() {
    if (vertical === "start") return styles.verticalStart;
    if (vertical === "center") return styles.verticalCenter;
    if (vertical === "end") return styles.verticalEnd;
  }

  function rowGap() {
    if (isRowGap === "md") return styles.rowGapMd;
    if (isRowGap === "sm") return styles.rowGapSm;
  }

  return (
    <div
      className={`
        ${styles.textBox} 
        ${isHeightFull ? styles.heightFull : ""}
        ${rowGap()}
        ${horizonAlign()}
        ${verticalAlign()}
        ${gsapClassName}
        ${childrenStyleClassName}
        textBox
      `}
    >
      {children}
    </div>
  );
}
