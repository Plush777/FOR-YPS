import MyYpsContentsClient from "@/components/page/sub/layoutContents/myYps/MyYpsContentsClient";
import SubPageLayout from "@/components/page/sub/layout/SubPageLayout";

export default function ListLayout({ children, modal }: any) {
  return (
    <SubPageLayout pageName="myYps">
      <MyYpsContentsClient initialMessages={[]} />
      {children}
      {modal}
    </SubPageLayout>
  );
}
