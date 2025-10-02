import styles from "./nav.module.css";
import { Link } from "@/i18n/routing";
import navData from "@/data/nav/nav.json";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navData.navList.map((item, index: number) => (
          <li key={index} className={styles.navListItem}>
            <Link
              className={styles.navListItemText}
              href={item.link}
              title={item.name}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
