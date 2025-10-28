import { supabase } from "@/lib/supabaseClient";

export default async function LetterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ 여기서 params를 await 해야 함

  const { data: letter } = await supabase
    .from("letters")
    .select("id, username, content, created_at")
    .eq("id", id)
    .single();

  if (!letter) return <p>편지를 찾을 수 없습니다.</p>;

  return (
    <main style={{ padding: "40px" }}>
      <h2>{letter.username}의 편지</h2>
      <p style={{ whiteSpace: "pre-wrap" }}>{letter.content}</p>
      <p style={{ marginTop: "10px", fontSize: "14px", opacity: 0.7 }}>
        {new Date(letter.created_at).toLocaleString("ko-KR")}
      </p>
    </main>
  );
}
