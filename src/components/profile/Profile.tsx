"use client";

import { useRef, useState } from "react";
import styles from "@/components/profile/profile.module.css";
import MenuDropDown from "@/components/menuDropdown/MenuDropDown";
import { useTranslations } from "next-intl";
import { logout } from "@/components/auth/AuthArea";
import ArrowDropDown from "../svg/ArrowDropDown";

interface Props {
  userData: any;
}

export default function Profile({ userData }: Props) {
  const [open, setOpen] = useState(false);
  const tMenu = useTranslations("auth.menuDropdown");
  const tAuth = useTranslations("auth");
  const menus = (tMenu.raw("menus") as string[]) || [];
  const logoutLabel = tAuth("logout");

  async function handleSelect(label: string) {
    if (label === logoutLabel) {
      await logout();
    }
    setOpen(false);
  }

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        ref={buttonRef}
        className={styles.userInfo}
        onClick={() => setOpen((v) => !v)}
      >
        {userData.avatar_url && (
          <>
            <img
              src={userData.avatar_url}
              alt={userData.name || "user"}
              className={styles.avatar}
            />

            <ArrowDropDown />
          </>
        )}
      </button>

      {open && (
        <MenuDropDown
          useType="profile"
          items={menus}
          onSelect={(label) => handleSelect(label)}
          onClose={() => setOpen(false)}
          triggerRef={buttonRef}
        />
      )}
    </div>
  );
}
