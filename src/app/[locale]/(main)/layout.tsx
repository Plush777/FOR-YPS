import Header from "@/components/layout/header/base/Header";
import Main from "@/components/page/main/base/Main";

import BodyClassController from "@/components/common/bodyClassController/BodyClassController";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BodyClassController className="main-page" />
      <Header />
      <Main isCanvas={false}>{children}</Main>
    </>
  );
}
