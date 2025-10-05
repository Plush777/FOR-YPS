import styles from "./description.module.css";

type Props = {
  text: string;
  gsapClassName?: string;
};

export default function Description({ text, gsapClassName = "" }: Props) {
  return (
    <p className={`${styles.introDescription} ${gsapClassName} description`}>
      {text}
    </p>
  );
}
