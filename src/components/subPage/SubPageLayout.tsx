import styles from "@/components/subPage/subPageLayout.module.css";
import type { ReactNode } from "react";
import TopDownButton from "@/components/topDownButton/TopDownButton";
import Video from "@/components/video/Video";
import PageBackground from "@/components/pageBackground/PageBackground";
import { useTranslations } from "next-intl";

interface Props {
  children: ReactNode;
  description?: string;
}

export default function SubPageLayout({ children, description }: Props) {
  const t = useTranslations("subPage.contactUs");

  return (
    <PageBackground styleType="sub">
      <div className={styles.inner}>
        <section className={styles.visual}>
          <h2 className="hidden">{t("hiddenText1")}</h2>
          <Video styleType="sub" />
          <div className={styles.visualTextArea}>
            <h3 className={styles.visualTitle}>Contact us</h3>
            {description ? (
              <p className={styles.visualDescription}>{description}</p>
            ) : null}
          </div>
        </section>
        <section className={styles.contents}>
          <h2 className="hidden">{t("hiddenText2")}</h2>
          {children}
        </section>
      </div>

      <TopDownButton />
    </PageBackground>
  );
}
