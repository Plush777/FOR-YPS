import { useTranslations } from "next-intl";
import styles from "@/components/footer/footer.module.css";
import SvgOpenInNew from "@/components/svg/OpenInNew";
import Image from "next/image";
import LinkSection from "./LinkSection";

export default function Footer() {
  const t = useTranslations("IntroPage.footer");

  console.log(t.raw("footerMenu"));

  return (
    <footer className={`${styles.footer} footer`}>
      <div className={styles.footerInner}>
        <div className={styles.footerLinkBox}>
          <div className={styles.footerLinkBoxInner}>
            <div className={styles.footerLogoArea}>
              <Image
                width={150}
                height={60}
                src="/icons/logo/logo-for-yps-white.svg"
                alt="FOR YPS 푸터 로고"
              />

              <div className={styles.footerNoticeBox}>
                <p className={styles.footerNotice}>{t("notice")}</p>
                <p className={styles.footerNotice}>{t("notice2")}</p>
              </div>
            </div>

            <div className={styles.footerLinkWrapper}>
              <LinkSection
                type="social"
                title={t("title1")}
                data={t.raw("social")}
              />
              <LinkSection
                type="footerLink"
                title={t("title2")}
                data={t.raw("footerLink")}
              />
              <LinkSection
                type="footerMenu"
                title={t("title3")}
                data={t.raw("footerMenu")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottomBox}>
        <p className={`${styles.warningText} ${styles.copyright}`}>
          © for yps ALL RIGHTS RESERVED.
        </p>
      </div>

      <div className={styles.footerBottomBox}>
        <p className={`${styles.warningText} ${styles.copyContents}`}>
          해당 사이트의 이미지 및 로고 (사이트 로고 제외) 에 대한 저작권은
          (주)디에스피미디어에게 있습니다.
        </p>
      </div>
    </footer>
  );
}
