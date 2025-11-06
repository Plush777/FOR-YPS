import styles from "./description.module.css";

type Props = {
  text?: string;
  fadeClassName?: string;
  html?: string;
};

export default function Description({ text, fadeClassName = "", html }: Props) {
  return (
    <p
      dangerouslySetInnerHTML={html ? { __html: html } : undefined}
      className={`${styles.introDescription} ${fadeClassName} description`}
    >
      {text}
    </p>
  );
}
