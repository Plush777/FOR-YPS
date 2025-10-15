import socialData from "../../data/social/social.json";
import styles from "@/components/footer/footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerLinkBox}>
          <Image
            width={150}
            height={60}
            src="/icons/logo/logo-for-yps-white.svg"
            alt="FOR YPS 푸터 로고"
          />

          <ul className={styles.footerLinkList}>
            {socialData.item.map((item, i) => {
              return (
                <li className={styles.footerLinkItem} key={i}>
                  <a
                    className={styles.footerLinkText}
                    href={item.url}
                    target="_blank"
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
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
      </div>
    </footer>
  );
}
