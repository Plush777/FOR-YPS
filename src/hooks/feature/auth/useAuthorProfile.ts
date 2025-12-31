"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type AuthorProfile = {
  name?: string;
  avatar_url?: string;
} | null;

export function useAuthorProfile(userId?: string) {
  const [profile, setProfile] = useState<AuthorProfile>(null);

  useEffect(() => {
    if (!userId) return;

    async function fetchProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("name, avatar_url")
        .eq("id", userId)
        .single();

      if (!error) setProfile(data);
    }

    fetchProfile();
  }, [userId]);

  return profile;
}
