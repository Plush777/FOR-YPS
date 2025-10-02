"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import styles from "./intro.module.css";
import ColoredLogoHoriz from "@/components/svg/ColoredLogoHoriz";

export default function IntroPage() {
  const t = useTranslations("IntroPage");

  return (
    <div className={styles.introBackground}>
      <video
        src="/video/intro-video.mp4"
        autoPlay
        muted
        loop
        className={styles.introVideo}
      />

      <section className={`${styles.introSection} ${styles.first}`}>
        <div className={styles.introSectionLogoBox}>
          <ColoredLogoHoriz />
        </div>

        <div className={styles.introTitleBox}>
          <p className={styles.introDescription}>{t("description1")}</p>
          <p className={styles.introDescription}>{t("description2")}</p>
          <p className={styles.introDescription}>{t("description3")}</p>
        </div>
      </section>

      <section className={styles.introSection}>
        <Link href="/home">{t("link")}</Link>
      </section>
    </div>
  );
}
