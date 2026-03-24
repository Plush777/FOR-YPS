"use client";

import SettingsSidebar from "@/components/page/sub/settings/SettingsSidebar";
import { useAuth } from "@/contexts/AuthContext";
import styles from "@/clientPage/settingsPage.module.css";
import { useLocale } from "next-intl";

type SettingsSection = "profile" | "account" | "service" | "notification";

type SettingsPageProps = {
  currentSection: SettingsSection;
  isCommentFeatureEnabled?: boolean;
  isNotificationMenuDisabled?: boolean;
};

export default function SettingsPage({
  currentSection,
  isCommentFeatureEnabled = false,
  isNotificationMenuDisabled = false,
}: SettingsPageProps) {
  const locale = useLocale();
  const { user } = useAuth();

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
    </div>
  );
}
