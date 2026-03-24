"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

import SettingsSidebar from "@/components/page/sub/settings/SettingsSidebar";
import { useAuth } from "@/contexts/AuthContext";
import styles from "@/clientPage/settingsPage.module.css";

type SettingsSection = "profile" | "account" | "service" | "notification";

type SettingsPageProps = {
  currentSection: SettingsSection;
  isCommentFeatureEnabled?: boolean;
  isNotificationMenuDisabled?: boolean;
};

const localeOptions = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "jp", label: "日本語" },
  { code: "zh-CN", label: "简体中文" },
  { code: "zh-TW", label: "繁體中文" },
];

export default function SettingsPage({
  currentSection,
  isCommentFeatureEnabled = false,
  isNotificationMenuDisabled = false,
}: SettingsPageProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [isLocalePopupOpen, setIsLocalePopupOpen] = useState(false);

  const basePath = `/${locale}/settings`;

  const sidebarMenu = [
    { title: "프로필", href: `${basePath}/profile` },
    {
      title: "설정",
      href: `${basePath}/account`,
      items: [
        { title: "계정 설정", href: `${basePath}/account` },
        { title: "서비스 설정", href: `${basePath}/service` },
        {
          title: "알림 설정",
          href: `${basePath}/notification`,
          disabled: isNotificationMenuDisabled,
        },
      ],
    },
  ];

  const activePath = `${basePath}/${currentSection}`;
  const nicknameValue = user?.name || user?.email || "";
  const selectedLocaleLabel = localeOptions.find((item) => item.code === locale)?.label || locale;

  const moveLocale = (nextLocale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return;

    segments[0] = nextLocale;
    router.push(`/${segments.join("/")}`);
    setIsLocalePopupOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        <SettingsSidebar menu={sidebarMenu} activePath={activePath} />

        <div className={styles.content}>
          <header className={styles.titleBox}>
            <h1 className={styles.title}>설정</h1>
            <p className={styles.subtitle}>계정 관리와 상세 설정을 할 수 있어요.</p>
          </header>

          <div className={styles.container}>
            {currentSection === "profile" && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>프로필 설정</h2>

                <div className={styles.row}>
                  <div className={styles.rowLabel}>프로필 이미지</div>
                  <div className={styles.rowContent}>
                    <div className={styles.profileImage} aria-hidden />
                    <button type="button" className={styles.primaryButton}>
                      이미지 변경
                    </button>
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.rowLabel}>닉네임</div>
                  <div className={styles.rowContentInline}>
                    <input className={styles.input} value={nicknameValue} readOnly />
                    <button type="button" className={styles.primaryButton}>
                      닉네임 변경
                    </button>
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.rowLabel}>소개글</div>
                  <div className={styles.rowContent}>
                    <textarea className={styles.textarea} value="나를 소개하는 문장을 입력해 주세요." readOnly />
                    <button type="button" className={styles.primaryButton}>
                      소개글 변경
                    </button>
                  </div>
                </div>
              </section>
            )}

            {currentSection === "account" && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>계정 설정</h2>

                <div className={styles.row}>
                  <div className={styles.rowLabel}>소셜 로그인 정보</div>
                  <div className={styles.badge}>Google / Kakao 연동됨</div>
                </div>

                <div className={styles.row}>
                  <div className={styles.rowLabel}>이메일 수신 동의</div>
                  <label className={styles.toggleLabel}>
                    <span>공지/이벤트 수신 알림</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                </div>

                <div className={styles.row}>
                  <div className={styles.rowLabel}>탈퇴</div>
                  <button type="button" className={styles.withdrawButton}>
                    회원 탈퇴
                  </button>
                </div>
              </section>
            )}

            {currentSection === "service" && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>서비스 설정</h2>

                <div className={styles.row}>
                  <div className={styles.rowLabel}>언어 설정</div>
                  <button
                    type="button"
                    className={styles.localeSelectButton}
                    onClick={() => setIsLocalePopupOpen(true)}
                  >
                    <span>{selectedLocaleLabel}</span>
                    <span className={styles.localeArrow}>▾</span>
                  </button>
                </div>

                <div className={styles.row}>
                  <div className={styles.rowLabel}>내 편지 모아보기</div>
                  <button type="button" className={styles.secondaryButton}>
                    편지함 바로가기
                  </button>
                </div>

                <div className={styles.row}>
                  <div className={styles.rowLabel}>댓글 허용 여부</div>
                  <label className={styles.toggleLabel}>
                    <span>댓글 허용</span>
                    <input type="checkbox" defaultChecked={false} />
                  </label>
                </div>

                <div className={styles.row}>
                  <div className={styles.rowLabel}>신고 내역</div>
                  <button type="button" className={styles.secondaryButton}>
                    내역 보기
                  </button>
                </div>
              </section>
            )}

            {currentSection === "notification" && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>알림 설정</h2>

                <div className={`${styles.row} ${!isCommentFeatureEnabled ? styles.disabled : ""}`}>
                  <div className={styles.rowLabel}>댓글 알림</div>
                  <label className={styles.toggleLabel}>
                    <span>{isCommentFeatureEnabled ? "댓글 알림 받기" : "댓글 기능 준비 중"}</span>
                    <input type="checkbox" disabled={!isCommentFeatureEnabled} />
                  </label>
                </div>

                <div className={`${styles.row} ${!isCommentFeatureEnabled ? styles.disabled : ""}`}>
                  <div className={styles.rowLabel}>답글 알림</div>
                  <label className={styles.toggleLabel}>
                    <span>{isCommentFeatureEnabled ? "답글 알림 받기" : "댓글 기능 준비 중"}</span>
                    <input type="checkbox" disabled={!isCommentFeatureEnabled} />
                  </label>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {isLocalePopupOpen && (
        <div className={styles.localePopupBackdrop} role="presentation" onClick={() => setIsLocalePopupOpen(false)}>
          <div className={styles.localePopup} role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <h3 className={styles.localePopupTitle}>언어 선택</h3>

            <ul className={styles.localeList}>
              {localeOptions.map((item) => (
                <li key={item.code}>
                  <button
                    type="button"
                    className={`${styles.localeOption} ${item.code === locale ? styles.localeActive : ""}`}
                    onClick={() => moveLocale(item.code)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <button type="button" className={styles.localeCloseButton} onClick={() => setIsLocalePopupOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
