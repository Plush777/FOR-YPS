import styles from "@/components/subPage/layoutContents/myYpsContents.module.css";
import { useTranslations } from "next-intl";

export default function EmptyLetter() {
  const t = useTranslations("subPage.myYps.letter");

  return (
    <div className={styles.emptyWrap}>
      <p className={styles.emptyText}>
        {t.rich("emptyText", {
          br: () => <br />,
        })}
      </p>
    </div>
  );
}
