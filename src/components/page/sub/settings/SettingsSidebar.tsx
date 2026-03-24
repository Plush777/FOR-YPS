import Link from "next/link";
import styles from "@/components/page/sub/settings/settingsSidebar.module.css";

type SidebarItem = {
  title: string;
  href?: string;
  disabled?: boolean;
};

type SidebarSection = {
  title: string;
  href?: string;
  items?: SidebarItem[];
};

type SettingsSidebarProps = {
  menu: SidebarSection[];
  activePath: string;
};

export default function SettingsSidebar({ menu, activePath }: SettingsSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      {menu.map((section) => {
        const isMainActive = section.href ? activePath === section.href : false;

        return (
          <div key={section.title} className={styles.menuGroup}>
            {section.href ? (
              <Link
                href={section.href}
                className={`${styles.mainMenu} ${isMainActive ? styles.active : ""}`}
              >
                {section.title}
              </Link>
            ) : (
              <p className={styles.mainMenu}>{section.title}</p>
            )}

            {section.items && (
              <ul className={styles.subMenu}>
                {section.items.map((item) => {
                  const isActive = item.href === activePath;

                  return (
                    <li key={item.title}>
                      {item.href && !item.disabled ? (
                        <Link href={item.href} className={`${styles.subMenuButton} ${isActive ? styles.subActive : ""}`}>
                          {item.title}
                        </Link>
                      ) : (
                        <span className={`${styles.subMenuButton} ${styles.disabled}`}>
                          {item.title}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </aside>
  );
}
