import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import DetailClient from "@/components/page/sub/detail/detailClient/DetailClient";

type Params = Promise<{ locale: string; id: string }>; // locale 세그먼트가 있으니 같이 선언(권장)

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: letter, error } = await supabase
    .from("letters")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !letter) notFound();

  return <DetailClient letter={letter} currentUser={user} />;
}
