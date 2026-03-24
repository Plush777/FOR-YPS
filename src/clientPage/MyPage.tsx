import styles from "@/clientPage/myPage.module.css";

type CalendarCell = {
  day: number;
  image?: string;
  extra?: string;
};

const weekLabels = ["일", "월", "화", "수", "목", "금", "토"];

const calendarCells: CalendarCell[] = [
  { day: 1, image: "/images/common/img-letter-fixed.png" },
  { day: 2, image: "/images/common/img-letter-fixed.png" },
  { day: 3, image: "/images/common/img-letter-fixed.png" },
  { day: 4, image: "/images/common/img-letter-fixed.png" },
  { day: 5, image: "/images/common/img-letter-fixed.png" },
  { day: 6, image: "/images/common/img-letter-fixed.png" },
  { day: 7, image: "/images/common/img-letter-fixed.png" },
  { day: 8, image: "/images/common/img-letter-fixed.png" },
  { day: 9, image: "/images/common/img-letter-fixed.png" },
  { day: 10, image: "/images/common/img-letter-fixed.png" },
  { day: 11, image: "/images/common/img-letter-fixed.png" },
  { day: 12, image: "/images/common/img-letter-fixed.png" },
  { day: 13, image: "/images/common/img-letter-fixed.png" },
  { day: 14, image: "/images/common/img-letter-fixed.png", extra: "+1" },
  { day: 15, image: "/images/common/img-letter-fixed.png" },
  { day: 16, image: "/images/common/img-letter-fixed.png" },
  { day: 17, image: "/images/common/img-letter-fixed.png" },
  { day: 18, image: "/images/common/img-letter-fixed.png" },
  { day: 19, image: "/images/common/img-letter-fixed.png" },
  { day: 20, image: "/images/common/img-letter-fixed.png" },
  { day: 21, image: "/images/common/img-letter-fixed.png" },
  { day: 22, image: "/images/common/img-letter-fixed.png" },
  { day: 23, image: "/images/common/img-letter-fixed.png" },
  { day: 24, image: "/images/common/img-letter-fixed.png" },
  { day: 25 },
  { day: 26 },
  { day: 27 },
  { day: 28 },
  { day: 29 },
  { day: 30 },
  { day: 31 },
  { day: 1 },
  { day: 2 },
  { day: 3 },
  { day: 4 },
];

export default function MyPage() {
  return (
    <div className={styles.page}>
      <section className={styles.profileCard}>
        <div className={styles.profileTop}>
          <img className={styles.avatar} src="/images/common/img-letter-fixed.png" alt="프로필" />
          <div>
            <h2 className={styles.nickname}>정선혜사랑스럽구귀엽구너무잘해 최고야👍</h2>
            <p className={styles.meta}>48 팔로잉 · 29 팔로워 · 15 레벨</p>
          </div>
        </div>

        <p className={styles.status}>☀️혜 (SUNHYE)</p>

        <div className={styles.favoriteRow}>
          <p>📌 입덕 시기</p>
          <strong>Growing Pain pt.1 : FREE (D+211)</strong>
        </div>

        <div className={styles.favoriteRow}>
          <p>💘 최애/차애 멤버</p>
          <strong>정선혜</strong>
        </div>
      </section>

      <section className={styles.calendarSection}>
        <div className={styles.weekHeader}>
          {weekLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <ul className={styles.grid}>
          {calendarCells.map((cell, index) => (
            <li key={`${cell.day}-${index}`} className={styles.cell}>
              {cell.image ? (
                <>
                  <img src={cell.image} alt={`${cell.day}일 업로드`} />
                  <span className={styles.day}>{cell.day}</span>
                  {cell.extra && <em className={styles.extra}>{cell.extra}</em>}
                </>
              ) : (
                <>
                  <span className={`${styles.day} ${styles.emptyDay}`}>{cell.day}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
