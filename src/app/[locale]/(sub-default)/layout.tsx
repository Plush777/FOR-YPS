import BodyClassController from "@/components/common/bodyClassController/BodyClassController";
import Header from "@/components/layout/header/base/Header";

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BodyClassController className="sub-page" />
      <Header />
      {children}
    </>
  );
}
