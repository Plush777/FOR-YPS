import styles from "@/components/error/errorSection.module.css";
import { useTranslations } from "next-intl";
import Button from "../button/Button";

type Props = {};

export default function ErrorSection({}: Props) {
  const t = useTranslations("mainPage.errorSection");

  return (
    <section className={styles.errorWrap}>
      <div className={styles.errorInner}>
        <div className={styles.errorTextBox}>
          <p className={styles.errorText}>{t("text1")}</p>
          <p className={styles.errorText}>{t("text2")}</p>
        </div>

        <Button styleType="roundedMd" size="md" text={t("text3")} />
      </div>
    </section>
  );
}
