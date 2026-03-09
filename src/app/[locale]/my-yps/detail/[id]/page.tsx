import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DetailClient from "@/components/page/sub/detail/detailClient/DetailClient";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = await createClient(); // ✅ await

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: letter } = await supabase
    .from("letters")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!letter) redirect("/404");

  // console.log(user.user_metadata);
  // console.log(letter);

  return <DetailClient letter={letter} currentUser={user.user_metadata} />;
}
