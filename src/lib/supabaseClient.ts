import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ 디버깅용 Auth 상태 리스너
supabase.auth.onAuthStateChange((event, session) => {
  console.log("🔄 Auth state changed:", event);
  if (session) {
    console.log("✅ Logged in:", session.user);
  } else {
    console.log("🚪 Logged out");
  }
});
