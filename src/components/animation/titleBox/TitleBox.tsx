import styles from "./titleBox.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function TitleBox({ children, className = "" }: Props) {
  return <div className={`${styles.titleBox} ${className}`}>{children}</div>;
}
