import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import SubPageLayout from "@/components/subPage/layout/SubPageLayout";
import MyYpsContentsClient from "@/components/subPage/layoutContents/MyYpsContentsClient";

export default function ListLayout({ children, modal }: any) {
  return (
    <>
      <Header name="default" />
      <Main background="gray">
        <SubPageLayout isVisual={false}>
          <MyYpsContentsClient initialMessages={[]} />
          {children}
          {modal}
        </SubPageLayout>
      </Main>
    </>
  );
}
