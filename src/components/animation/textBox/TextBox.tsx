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
    if (horizontal === "start") return "horizontalStart";
    if (horizontal === "center") return "horizontalCenter";
    if (horizontal === "end") return "horizontalEnd";
  }

  function verticalAlign() {
    if (vertical === "start") return "verticalStart";
    if (vertical === "center") return "verticalCenter";
    if (vertical === "end") return "verticalEnd";
  }

  function rowGap() {
    if (isRowGap === "md") return "rowGapMd";
    if (isRowGap === "sm") return "rowGapSm";
    if (isRowGap === "xs") return "rowGapXs";
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
