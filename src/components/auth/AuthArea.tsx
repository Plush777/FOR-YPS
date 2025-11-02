"use client";

import { useEffect, useState } from "react";
import styles from "@/components/auth/authArea.module.css";
import Button from "../button/Button";
import { supabase } from "@/lib/supabaseClient";
import { useTranslations } from "next-intl";
import Profile from "../profile/Profile";

interface Props {
  onClickModal?: () => void;
}

type UserType = {
  name?: string;
  email?: string;
  avatar_url?: string;
};

export default function AuthArea({ onClickModal }: Props) {
  const tAuth = useTranslations("auth");

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true); // 👈 추가

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const meta = data.user.user_metadata;
        setUser({
          name: meta.name || data.user.email,
          email: data.user.email,
          avatar_url: meta.avatar_url || "",
        });
      } else {
        setUser(null);
      }
      setLoading(false); // 👈 로딩 완료
    }

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const meta = session.user.user_metadata;
          setUser({
            name: meta.name || session.user.email,
            email: session.user.email,
            avatar_url: meta.avatar_url || "",
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

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
