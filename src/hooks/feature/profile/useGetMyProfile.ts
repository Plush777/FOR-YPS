"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export type SupabaseUserProfile = {
  id?: string;
  name?: string;
  email?: string;
  avatar_url?: string;
} | null;

export function useGetMyProfile() {
  const [user, setUser] = useState<SupabaseUserProfile>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      const authUser = data.user;

      if (authUser) {
        const meta = authUser.user_metadata;
        setUser({
          id: authUser.id,
          name: meta.name || authUser.email,
          email: authUser.email,
          avatar_url: meta.avatar_url || "",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    }

    fetchUser();

    // ✅ 로그인/로그아웃 시 자동 업데이트
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const meta = session.user.user_metadata;
          setUser({
            id: session.user.id,
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

  return { user, loading };
}
