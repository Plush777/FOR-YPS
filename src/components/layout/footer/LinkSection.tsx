import styles from "@/components/layout/footer/footer.module.css";
import SvgOpenInNew from "@/components/common/svg/OpenInNew";

type Props = {
  title: string;
  type: string;
  data: any;
};

export default function LinkSection({ title, type, data }: Props) {
  return (
    <dl className={styles.footerLinkSection}>
      <dt className={styles.footerLinkSectionTitle}>{title}</dt>

      <dd>
        <ul className={styles.footerLinkList}>
          {data.map((item: any, i: number) => {
            return (
              <li
                className={`
                ${styles.footerLinkItem}
                ${type === "footerMenu" ? styles.left : ""}
              `}
                key={i}
              >
                <a
                  className={styles.footerLinkText}
                  href={item.url}
                  target="_blank"
                >
                  {item.name}
                </a>
                {type === "social" && <SvgOpenInNew />}
                {type === "footerLink" && <SvgOpenInNew />}
              </li>
            );
          })}
        </ul>
      </dd>
    </dl>
  );
}
