import styles from "./titleBoxInTitle.module.css";

type Props = {
  text: string;
  gradationText?: boolean;
  gsapClassName?: string;
};

export default function TitleBoxInTitle({
  text,
  gradationText = false,
  gsapClassName = "",
}: Props) {
  const gradationTextClass = gradationText
    ? `${styles.gradationText} gradationText`
    : "";

  return (
    // prettier-ignore
    <p
      className={`${styles.titleBoxInTitle} ${gsapClassName} ${gradationTextClass} titleBoxInTitle`}
    >
      {text}
    </p>
  );
}
