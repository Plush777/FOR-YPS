import styles from "./description.module.css";

type Props = {
  text: string;
  fadeClassName?: string;
};

export default function Description({ text, fadeClassName = "" }: Props) {
  return (
    <p className={`${styles.introDescription} ${fadeClassName} description`}>
      {text}
    </p>
  );
}
