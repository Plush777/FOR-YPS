import SubSideHeader from "@/components/layout/header/subSide/SubSideHeader";
import AuthArea from "@/components/layout/header/auth/AuthArea";
import styles from "@/app/[locale]/(sub-default)/subLayout.module.css";

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <SubSideHeader />
      <main className={styles.contents}>
        <header className={styles.contentsHeader}>
          <AuthArea />
        </header>
        {children}
      </main>
    </div>
  );
}
