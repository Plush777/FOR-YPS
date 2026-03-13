"use client";

import styles from "@/components/layout/header/auth/authArea.module.css";
import { supabase } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";
import Profile from "@/components/layout/header/profile/Profile";
import { useAuth } from "@/contexts/AuthContext";
import Login from "@/components/common/svg/Login";

interface Props {
  onClickModal?: () => void;
}

export default function AuthArea({ onClickModal }: Props) {
  const tAuth = useTranslations("auth");
  const { user, loading } = useAuth();

  if (loading) {
    return <div className={styles.profileSkeleton}></div>;
  }

  return (
    <div className={styles.wrap}>
      {user ? (
        <Profile userData={user} />
      ) : (
        <button
          type="button"
          className={styles.loginButton}
          onClick={onClickModal}
          aria-label={tAuth("login")}
          title={tAuth("login")}
        >
          <span className={styles.loginIcon}>
            <Login />
          </span>
        </button>
      )}
    </div>
  );
}

export async function logout() {
  await supabase.auth.signOut();
}
