import styles from "./titleBoxInTitle.module.css";

type Props = {
  text: string;
  regularText?: boolean;
  gradationText?: boolean;
  gsapClassName?: string;
};

export default function TitleBoxInTitle({
  text,
  regularText = false,
  gradationText = false,
  gsapClassName = "",
}: Props) {
  const regularTextClass = regularText ? styles.regularText : "";
  const gradationTextClass = gradationText ? styles.gradationText : "";

  return (
    <p
      className={`${styles.titleBoxInTitle} ${regularTextClass} ${gsapClassName} ${gradationTextClass}`}
    >
      {text}
    </p>
  );
}
