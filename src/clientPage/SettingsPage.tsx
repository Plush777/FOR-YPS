import styles from "@/clientPage/settingsPage.module.css";

export default function SettingsPage() {
  return (
    <section className={styles.settingsWrap}>
      <div className={styles.topRow}>
        <div className={styles.avatarArea}>
          <div className={styles.avatar}></div>
          <button type="button" className={styles.uploadButton}>
            이미지 업로드
          </button>
          <button type="button" className={styles.removeButton}>
            이미지 제거
          </button>
        </div>

        <div className={styles.profileInfo}>
          <h3 className={styles.profileName}>ddd</h3>
          <button type="button" className={styles.inlineLink}>
            수정
          </button>
        </div>
      </div>

      <ul className={styles.settingList}>
        <li className={styles.settingItem}>
          <div>
            <strong className={styles.label}>블로그 제목</strong>
            <p className={styles.description}>개인 페이지의 좌측 상단에 나타나는 페이지 제목입니다.</p>
          </div>
          <button type="button" className={styles.inlineLink}>
            수정
          </button>
        </li>

        <li className={styles.settingItem}>
          <div>
            <strong className={styles.label}>소셜 정보</strong>
            <p className={styles.description}>포스트 및 블로그에서 보여지는 프로필 공개용 소셜 정보입니다.</p>
          </div>
          <button type="button" className={styles.inlineLink}>
            정보 추가
          </button>
        </li>

        <li className={styles.settingItem}>
          <div>
            <strong className={styles.label}>이메일 주소</strong>
            <p className={styles.description}>회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다.</p>
          </div>
          <button type="button" className={styles.inlineLink}>
            변경
          </button>
        </li>
      </ul>
    </section>
  );
}
