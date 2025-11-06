"use client";

import SubPageLayout from "@/components/page/sub/layout/SubPageLayout";
import styles from "@/app/[locale]/about/page.module.css";
import { useTranslations } from "next-intl";
import TitleArea from "@/components/page/sub/titleArea/TitleArea";
import ContentsArea from "@/components/page/sub/contents/ContentsArea";

export default function AboutPage() {
  const t = useTranslations("subPage.about");

  return (
    <SubPageLayout isVisual={true} description={t("description")}>
      <TitleArea title="About" />

      <ContentsArea>
        <ul className={styles.simpleList}>
          <li className={styles.simpleItem}>
            <a href="mailto:sky11916@naver.com">E-mail: sky11916@naver.com</a>
          </li>
          <li className={styles.simpleItem}>
            <a href="https://open.kakao.com/o/ss7hM2Oh" target="_blank">
              Kakaotalk:&nbsp;
              <span className="underline">
                https://open.kakao.com/o/ss7hM2Oh
              </span>
            </a>
          </li>
          <li className={styles.simpleItem}>
            <a href="https://github.com/Plush777" target="_blank">
              Github:&nbsp;
              <span className="underline">https://github.com/Plush777</span>
            </a>
          </li>
          <li className={styles.simpleItem}>
            <a href="https://plush-tech.netlify.app/" target="_blank">
              My tech blog:&nbsp;
              <span className="underline">https://plush-tech.netlify.app/</span>
            </a>
          </li>
          <li className={styles.simpleItem}>
            <a
              href="https://blog.naver.com/sky11916/223996312001"
              target="_blank"
            >
              My music blog:&nbsp;
              <span className="underline">
                https://blog.naver.com/sky11916/223996312001
              </span>
            </a>
          </li>
          <li className={styles.simpleItem}>
            <a href="https://velog.io/@sky/posts/" target="_blank">
              Velog:&nbsp;
              <span className="underline">https://velog.io/@sky/posts/</span>
            </a>
          </li>
          <li className={styles.simpleItem}>
            <a
              href="https://www.instagram.com/hsulp_?igsh=MXBraXBvcmtrZXF0aA=="
              target="_blank"
            >
              Instagram:&nbsp;
              <span className="underline">@HSULP_</span>
            </a>
          </li>
        </ul>
      </ContentsArea>
    </SubPageLayout>
  );
}
