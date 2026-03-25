import Image from "next/image";
import logo from "../../../../public/icons/logo/logo-for-yps.svg";
import { Link } from "@/i18n/routing";

import SubSideHeader from "@/components/layout/header/subSide/SubSideHeader";
import AuthArea from "@/components/layout/header/auth/AuthArea";
import styles from "@/app/[locale]/(sub-default)/subLayout.module.css";

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <div id={styles.headerGlass}></div>
      <header className={styles.contentsHeader}>
        <h1>
          <Link href="/">
            <Image
              width={110}
              height={36}
              src={logo}
              alt="for yps logo"
              priority
            />
          </Link>
        </h1>

        <AuthArea />
      </header>

      <main className={styles.contents}>
        <SubSideHeader />
        {children}
      </main>
    </div>
  );
}
