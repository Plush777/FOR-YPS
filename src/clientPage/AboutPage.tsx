"use client";

import SubPageLayout from "@/components/subPage/layout/SubPageLayout";
import styles from "@/app/[locale]/about/page.module.css";
import { useTranslations } from "next-intl";
import TitleArea from "@/components/subPage/contents/TitleArea";
import ContentsArea from "@/components/subPage/contents/ContentsArea";

export default function AboutPage() {
  const t = useTranslations("subPage.about");

  return (
    <SubPageLayout styleType="common" description={t("description")}>
      <TitleArea title="About" />

      <ContentsArea>
        <ul className={styles.simpleList}>
          <li className={styles.simpleItem}>
            <a href="mailto:sky11916@naver.com">E-mail: sky11916@naver.com</a>
          </li>
          <li className={`${styles.simpleItem} underline`}>
            <a href="https://open.kakao.com/o/sIZ4nWQb" target="_blank">
              Kakaotalk: https://open.kakao.com/o/sIZ4nWQb
            </a>
          </li>
          <li className={`${styles.simpleItem} underline`}>
            <a href="https://open.kakao.com/o/sIZ4nWQb" target="_blank">
              Github: https://github.com/Plush777
            </a>
          </li>
          <li className={`${styles.simpleItem} underline`}>
            <a href="https://plush-tech.netlify.app/" target="_blank">
              My tech blog: https://plush-tech.netlify.app/
            </a>
          </li>
          <li className={`${styles.simpleItem} underline`}>
            <a href="https://velog.io/@sky/posts/" target="_blank">
              Velog: https://velog.io/@sky/posts/
            </a>
          </li>
        </ul>
      </ContentsArea>
    </SubPageLayout>
  );
}
