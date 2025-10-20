import { ReactNode } from "react";

type Props = {
  buttonType?: "button" | "submit" | "reset";
  styleType?: string;
  size?: string;
  color?: string;
  text?: string;
  iconName?: string;
  gsapClassName?: string;
  children?: ReactNode;
};

export default function Button({
  buttonType = "button",
  styleType = "roundedFull",
  size = "lg",
  color = "white",
  text = "",
  iconName = "",
  gsapClassName = "",
  children,
}: Props) {
  const iconNameCondition = iconName !== "" ? "hasIcon" : "";

  function styleTypeCondition() {
    if (styleType === "roundedFull") return "roundedFull";
    if (styleType === "roundedLg") return "roundedLg";
    if (styleType === "roundedMd") return "roundedMd";

    return undefined;
  }

  function sizeTypeCondition() {
    if (size === "lg") return "buttonSizeLg";
    if (size === "md") return "buttonSizeMd";
    if (size === "sm") return "buttonSizeSm";

    return undefined;
  }

  function buttonColorCondition() {
    if (color === "white") return "buttonBgWhite";

    return undefined;
  }

  return (
    <button
      type={buttonType}
      className={`button ${styleTypeCondition()} ${sizeTypeCondition()} ${buttonColorCondition()} ${iconNameCondition} ${gsapClassName}`}
    >
      {text !== "" ? <span>{text}</span> : <></>}
      {children}
    </button>
  );
}
