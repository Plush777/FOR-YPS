import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import SubPageLayout from "@/components/subPage/layout/SubPageLayout";
import MyYpsContents from "@/components/subPage/layoutContents/MyYpsContents";
import { supabase } from "@/lib/supabaseClient";
import type { Letter } from "@/types/letter";

export default async function MyYpsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  // ✅ 서버 컴포넌트로 리스트 데이터를 미리 불러오기
  const { data: messages } = await supabase
    .from("letters")
    .select("id, username, content, created_at")
    .order("created_at", { ascending: false });

  return (
    <>
      <Header name="default" />
      <Main background="gray">
        <SubPageLayout isVisual={false}>
          {/* ✅ 리스트는 항상 유지 */}
          <MyYpsContents items={messages ?? []} isLoading={false} />

          {/* ✅ 상세 페이지(혹은 기타 children) */}
          {children}

          {/* ✅ 모달 라우트 */}
          {modal}
        </SubPageLayout>
      </Main>
    </>
  );
}
