import styles from "@/components/video/video.module.css";

type Props = {
  styleType?: string;
  src?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
};

export default function Video({
  styleType = "main",
  src = "/video/intro-video.mp4",
  autoPlay = true,
  muted = true,
  loop = true,
}: Props) {
  function videoStyleCondition() {
    if (styleType === "main") return styles.mainVideo;
    if (styleType === "sub") return styles.subVideo;

    return undefined;
  }

  return (
    <video
      src={src}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      className={videoStyleCondition()}
    />
  );
}
