import styles from "@/components/subPage/layoutContents/aboutLayoutContents.module.css";
import type { ReactNode } from "react";
import Video from "@/components/video/Video";
import { useTranslations } from "next-intl";

interface Props {
  description?: any;
  children: ReactNode;
}

export default function AboutLayoutContents({ description, children }: Props) {
  const t = useTranslations("subPage.about");

  return (
    <div className={styles.inner}>
      <section className={styles.visual}>
        <span className="hidden">{t("hiddenText1")}</span>
        <Video styleType="sub" />
        <div className={styles.visualTextArea}>
          <h2 className={`${styles.visualTitle} fadeIn delay1`}>About</h2>
          {description ? (
            <p className={`${styles.visualDescription} fadeIn delay2`}>
              {description}
            </p>
          ) : null}
        </div>
      </section>
      <section className={styles.contents}>
        <span className="hidden">{t("hiddenText2")}</span>

        <div className={styles.contentsInner}>{children}</div>
      </section>
    </div>
  );
}
