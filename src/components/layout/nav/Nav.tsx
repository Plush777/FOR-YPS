import styles from "./nav.module.css";
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
              className={`${styles.navListItemText} navListItemText`}
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
