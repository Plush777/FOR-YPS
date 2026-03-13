import styles from "./nav.module.css";

import BorderButton from "@/components/lib/nurui/border-button/Border-button";
import HeaderWriteArrowRight from "@/components/common/svg/HeaderWriteArrowRight";

import { Link } from "@/i18n/routing";

type NavItem = {
  name: string;
  link: string;
};

type Props = {
  data: NavItem[];
};

export default function Nav({ data }: Props) {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {data.map((item, index: number) => (
          <li key={index} className={styles.navListItem}>
            <Link
              className={styles.navListItemText}
              href={item.link}
              title={item.name}
            >
              {item.name}
              <HeaderWriteArrowRight />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
