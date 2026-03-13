import styles from "@/components/layout/header/base/header.module.css";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import logo from "../../../../../public/icons/logo/logo-for-yps.svg";

export default function HeaderLeft() {
  return (
    <div className={styles.headerLeft}>
      <h1>
        <Link href="/">
          <Image
            width={120}
            height={36}
            src={logo}
            alt="for yps logo"
            priority
          />
        </Link>
      </h1>
    </div>
  );
}
