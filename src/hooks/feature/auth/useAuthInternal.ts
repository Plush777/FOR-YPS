"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export type AuthUserProfile = {
  id: string;
  name?: string;
  email?: string;
  avatar_url?: string;
} | null;

export function useAuthInternal() {
  const [user, setUser] = useState<AuthUserProfile>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      const authUser = data.user;

      if (!mounted) return;

      if (authUser) {
        const meta = authUser.user_metadata || {};

        setUser({
          id: authUser.id,
          name: meta.name || authUser.email,
          email: authUser.email,
          avatar_url:
            meta.avatar_url || meta.picture || meta.profile_image || "",
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    }

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;

        if (session?.user) {
          const meta = session.user.user_metadata || {};
          setUser({
            id: session.user.id,
            name: meta.name || session.user.email,
            email: session.user.email,
            avatar_url:
              meta.avatar_url || meta.picture || meta.profile_image || "",
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
