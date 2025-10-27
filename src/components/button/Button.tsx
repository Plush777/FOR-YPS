import { ReactNode } from "react";

type Props = {
  buttonType?: "button" | "submit" | "reset";
  styleType?: string;
  size?: string;
  color?: string;
  text?: string;
  iconName?: string;
  className?: string;
  gsapClassName?: string;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  buttonType = "button",
  styleType = "roundedFull",
  size = "lg",
  color = "white",
  text = "",
  iconName = "",
  className = "",
  gsapClassName = "",
  children,
  onClick,
  disabled = false,
}: Props) {
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
    if (color === "fill-white") return "buttonFillWhite";
    if (color === "yellow") return "buttonBgYellow";
    if (color === "green") return "buttonBgGreen";

    return undefined;
  }

  return (
    <button
      type={buttonType}
      className={`button ${styleTypeCondition()} ${sizeTypeCondition()} ${buttonColorCondition()} ${className} icon-${iconName} ${gsapClassName}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text !== "" ? <span>{text}</span> : <></>}
      {children}
    </button>
  );
}
