import styles from "@/components/page/sub/settings/settingsSidebar.module.css";

type SidebarSection = {
  title: string;
  items?: string[];
};

type SettingsSidebarProps = {
  menu: SidebarSection[];
  activeTitle: string;
};

export default function SettingsSidebar({ menu, activeTitle }: SettingsSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      {menu.map((section) => (
        <div key={section.title} className={styles.menuGroup}>
          <button
            type="button"
            className={`${styles.mainMenu} ${section.title === activeTitle ? styles.active : ""}`}
          >
            {section.title}
          </button>

          {section.items && (
            <ul className={styles.subMenu}>
              {section.items.map((item) => (
                <li key={item}>
                  <button type="button" className={styles.subMenuButton}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </aside>
  );
}
