import styles from "./titleBoxInTitle.module.css";

type Props = {
  text?: string;
  gradationText?: boolean;
  gsapClassName?: string;
  html?: string;
};

export default function TitleBoxInTitle({
  text,
  gradationText = false,
  gsapClassName = "",
  html,
}: Props) {
  const gradationTextClass = gradationText
    ? `${styles.gradationText} gradationText`
    : "";

  return (
    // prettier-ignore
    <p
      dangerouslySetInnerHTML={html ? {__html: html} : undefined}
      className={`${styles.titleBoxInTitle} ${gsapClassName} ${gradationTextClass} titleBoxInTitle`}
    >
      {text}
    </p>
  );
}
