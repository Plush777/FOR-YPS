import SubSideHeader from "@/components/layout/header/subSide/SubSideHeader";
import styles from "@/app/[locale]/(sub-default)/subLayout.module.css";

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <SubSideHeader />
      <main className={styles.contents}>{children}</main>
    </div>
  );
}
