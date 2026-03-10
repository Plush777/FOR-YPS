import { useTranslations } from "next-intl";
import styles from "@/components/layout/footer/footer.module.css";
import Image from "next/image";
import LinkSection from "./LinkSection";

import logo from "../../../../public/icons/logo/logo-for-yps.svg";

export default function Footer() {
  const t = useTranslations("mainPage.footer");

  return (
    <footer className={`${styles.footer} footer`}>
      <div className={styles.footerInner}>
        <div className={styles.footerLinkBox}>
          <div className={styles.footerLinkBoxInner}>
            <div className={styles.footerLogoArea}>
              <Image width={150} height={60} src={logo} alt="FOR YPS" />

              <div className={styles.footerNoticeBox}>
                <p className={styles.footerNotice}>{t("notice")}</p>
                <p className={styles.footerNotice}>{t("notice2")}</p>
              </div>

              <div className={styles.asciiArea}>
                <Image
                  src="/footer/img-footer-ascii-white.png"
                  alt=""
                  width={240}
                  height={195}
                  className={styles.asciiWhiteImg}
                />
                <Image
                  src="/footer/img-footer-ascii-black.png"
                  alt=""
                  width={240}
                  height={195}
                  className={styles.asciiBlackImg}
                />
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

      <div className={styles.footerBottomArea}>
        <div className={styles.footerBottomBox}>
          <p className={`${styles.warningText} ${styles.copyright}`}>
            © for yps ALL RIGHTS RESERVED.
          </p>
        </div>

        <div className={`${styles.footerBottomBox} ${styles.hasCaution}`}>
          <p className={`${styles.warningText} ${styles.copyContents}`}>
            {t("caution1")}
          </p>
          <p className={`${styles.warningText} ${styles.copyContents}`}>
            {t("caution2")}
          </p>
        </div>
      </div>
    </footer>
  );
}
