import styles from "@/components/page/sub/layoutContents/myYps/myYpsContents.module.css";
import { useTranslations } from "next-intl";

interface Props {
  isBackground?: boolean;
}

export default function EmptyLetter({ isBackground }: Props) {
  const t = useTranslations("subPage.myYps.letter");

  return (
    <div className={styles.emptyWrap}>
      <p
        className={`${styles.emptyText} ${
          isBackground ? styles.emptyTextBlack : styles.emptyTextWhite
        }`}
      >
        {t.rich("emptyText", {
          br: () => <br />,
        })}
      </p>
    </div>
  );
}
