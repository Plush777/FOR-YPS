import styles from "./descriptionBox.module.css";

type Props = {
  children: React.ReactNode;
  childrenStyleClassName?: string;
  direction?: string;
  gsapClassName?: string;
};

export default function DescriptionBox({
  children,
  childrenStyleClassName = "",
  direction = "row",
  gsapClassName = "",
}: Props) {
  return (
    <div
      className={`${styles.descriptionBox} ${styles[direction]} ${gsapClassName} ${childrenStyleClassName} descriptionBox`}
    >
      {children}
    </div>
  );
}
