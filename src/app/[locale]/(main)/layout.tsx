import Header from "@/components/layout/header/base/Header";
import Main from "@/components/page/main/base/Main";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header name="main" />
      <Main isCanvas={false}>{children}</Main>
    </>
  );
}
