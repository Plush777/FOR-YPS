import styles from "./imageArea.module.css";

type Props = {
  src: string;
  alt: string;
  type?: string;
};

export default function ImageArea({ src, alt, type = "icon" }: Props) {
  function imageSizeClass() {
    if (type === "icon") return styles.iconSize;
    if (type === "bg") return styles.bgSize;

    return undefined;
  }

  return (
    <figure className={`${styles.imageArea} ${imageSizeClass()}`}>
      <img src={src} alt={alt} />
      <figcaption>{alt}</figcaption>
    </figure>
  );
}
