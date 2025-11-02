import { ReactNode } from "react";
import styles from "@/components/button/button.module.css";

// 공통 Props
type CommonProps = {
  buttonType?: "button" | "submit" | "reset";
  rounded?: "roundedFull" | "roundedLg" | "roundedMd" | "roundedNone";
  text?: string;
  iconName?: "naver" | "google" | "kakao" | "";
  className?: string;
  gsapClassName?: string;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ref?: React.RefObject<HTMLButtonElement | null>;
  minWidth?: "lg" | "md" | "sm" | "xs";
};

// onlyIcon = true 경우
type OnlyIconProps = {
  onlyIcon: true;
  color?:
    | "white"
    | "fill-white"
    | "yellow"
    | "green"
    | "gray"
    | "gray2"
    | "transparent-white"
    | "transparent-gray"
    | "border2-white";
  iconSize: "xl" | "lg" | "md" | "sm" | "onlySizeXl"; // ✅ required
  size?: string; // ✅ optional
};

// onlyIcon = false 경우
type WithTextProps = {
  onlyIcon: false;
  color:
    | "white"
    | "fill-white"
    | "yellow"
    | "green"
    | "gray"
    | "gray2"
    | "transparent-white"
    | "transparent-gray"
    | "border2-white";
  iconSize?: "xl" | "lg" | "md" | "sm" | "onlySizeXl"; // ✅ optional
  size: string; // ✅ required
};

export type ButtonProps = CommonProps & (OnlyIconProps | WithTextProps);

export default function Button({
  buttonType = "button",
  rounded = "roundedFull",
  size = "lg",
  onlyIcon,
  color = "white",
  text = "",
  iconName = "",
  iconSize = "md",
  className = "",
  gsapClassName = "",
  children,
  onClick,
  disabled = false,
  ref,
  minWidth,
}: ButtonProps) {
  function roundedTypeCondition() {
    if (rounded === "roundedFull") return styles.roundedFull;
    if (rounded === "roundedLg") return styles.roundedLg;
    if (rounded === "roundedMd") return styles.roundedMd;
    if (rounded === "roundedNone") return "";

    return "";
  }

  function sizeTypeCondition() {
    if (!onlyIcon) {
      if (size === "lg") return styles.buttonSizeLg;
      if (size === "md") return styles.buttonSizeMd;
      if (size === "sm") return styles.buttonSizeSm;
      if (size === "xs") return styles.buttonSizeXs;
    }

    return "";
  }

  function minWidthTypeCondition() {
    if (minWidth === "lg") return styles.buttonMinWidthLg;
    if (minWidth === "md") return styles.buttonMinWidthMd;
    if (minWidth === "sm") return styles.buttonMinWidthSm;
    if (minWidth === "xs") return styles.buttonMinWidthXs;

    return "";
  }

  function buttonColorCondition() {
    if (color === "white") return styles.buttonBgWhite;
    if (color === "fill-white") return styles.buttonFillWhite;
    if (color === "yellow") return styles.buttonBgYellow;
    if (color === "green") return styles.buttonBgGreen;
    if (color === "gray") return styles.buttonBgGray;
    if (color === "gray2") return styles.buttonBgGray2;
    if (color === "transparent-white") return styles.buttonTransparentWhite;
    if (color === "transparent-gray") return styles.buttonTransparentGray;
    if (color === "border2-white") return styles.buttonBorder2White;

    return "";
  }

  function iconCondition() {
    if (iconName === "naver") return styles.iconNaver;
    if (iconName === "google") return styles.iconGoogle;
    if (iconName === "kakao") return styles.iconKakao;

    return "";
  }

  function onlyIconSizeCondition() {
    if (onlyIcon) {
      if (iconSize === "xl") return styles.iconSizeXl;
      if (iconSize === "lg") return styles.iconSizeLg;
      if (iconSize === "md") return styles.iconSizeMd;
      if (iconSize === "sm") return styles.iconSizeSm;

      if (iconSize === "onlySizeXl") return styles.iconSizeOnly36;
    }

    return "";
  }

  return (
    <button
      type={buttonType}
      ref={ref}
      className={`
        ${styles.button} 
        ${iconCondition()} ${onlyIconSizeCondition()} ${minWidthTypeCondition()}
        ${roundedTypeCondition()} ${sizeTypeCondition()} ${buttonColorCondition()} ${className} ${gsapClassName}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text !== "" && <span>{text}</span>}
      {children}
    </button>
  );
}
