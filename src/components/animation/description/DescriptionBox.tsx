import styles from "./descriptionBox.module.css";

type Props = {
  children: React.ReactNode;
  direction?: string;
  gsapClassName?: string;
};

export default function DescriptionBox({
  children,
  direction = "row",
  gsapClassName = "",
}: Props) {
  return (
    <div
      className={`${styles.descriptionBox} ${styles[direction]} ${gsapClassName}`}
    >
      {children}
    </div>
  );
}
