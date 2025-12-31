"use client";

import styles from "@/components/layout/header/auth/authArea.module.css";
import Button from "@/components/button/base/Button";
import { supabase } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";
import Profile from "@/components/layout/header/profile/Profile";
import { useGetMyProfile } from "@/hooks/feature/profile/useGetMyProfile";

interface Props {
  onClickModal?: () => void;
}

export default function AuthArea({ onClickModal }: Props) {
  const tAuth = useTranslations("auth");
  const { user, loading } = useGetMyProfile();

  if (loading) return null; // 👈 로딩 중엔 아무 것도 렌더링하지 않음

  console.log(user);

  return (
    <div className={styles.wrap}>
      {user ? (
        <Profile userData={user} />
      ) : (
        <Button
          onlyIcon={false}
          size="sm"
          rounded="roundedFull"
          color="white"
          text={tAuth("login")}
          onClick={onClickModal}
          className={styles.loginButton}
        />
      )}
    </div>
  );
}

export async function logout() {
  await supabase.auth.signOut();
}
