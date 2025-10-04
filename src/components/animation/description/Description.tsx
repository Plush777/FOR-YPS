import styles from "./description.module.css";

type Props = {
  text: string;
  className?: string;
};

export default function Description({ text, className }: Props) {
  return <p className={`${styles.introDescription} ${className}`}>{text}</p>;
}
