import styles from "./titleBox.module.css";

type Props = {
  children: React.ReactNode;
  direction?: string;
  gsapClassName?: string;

  childrenType?: string;
};

export default function TitleBox({
  children,
  direction = "row",
  gsapClassName = "",
}: Props) {
  return (
    <div
      className={`
        ${styles.titleBox} 
       
        ${styles[direction]} 
        ${gsapClassName}
        titleBox
      `}
    >
      {children}
    </div>
  );
}
