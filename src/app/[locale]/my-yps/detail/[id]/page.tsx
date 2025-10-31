import { supabase } from "@/lib/supabaseClient";
import FullDetail from "@/clientPage/FullDetail";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: letter } = await supabase
    .from("letters")
    .select("id, username, content, created_at")
    .eq("id", id)
    .single();

  if (!letter) {
    return (
      <div style={{ padding: "40px" }}>해당 메시지를 찾을 수 없습니다.</div>
    );
  }

  return <FullDetail letter={letter} />;
}
