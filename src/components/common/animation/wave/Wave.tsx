import styles from "@/components/common/animation/wave/wave.module.css";

export default function Wave() {
  return (
    <div className={styles.wrap}>
      <svg
        className="editorial"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 
    58-18 88-18s
    58 18 88 18 
    58-18 88-18 
    58 18 88 18
    v44h-352z"
          />
        </defs>
        <g className={styles.parallax}>
          <use xlinkHref="#gentle-wave" x={50} y={0} fill="#4579e2" />
          <use xlinkHref="#gentle-wave" x={50} y={3} fill="#3461c1" />
          <use xlinkHref="#gentle-wave" x={50} y={6} fill="#2d55aa" />
        </g>
      </svg>
    </div>
  );
}
