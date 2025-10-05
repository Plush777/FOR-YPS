import styles from "./description.module.css";

type Props = {
  text: string;
  gsapClassName?: string;
  size?: string;
  color?: string;
  isDot?: boolean;
};

export default function Description({
  text,
  gsapClassName = "",
  size = "md",
  color = "white",
  isDot = true,
}: Props) {
  return (
    <p
      className={`
        ${styles.introDescription} 
        ${gsapClassName} 
        ${styles[size]} 
        ${styles[color]} 
        ${styles[isDot ? "dot" : ""]}`}
    >
      {text}
    </p>
  );
}
