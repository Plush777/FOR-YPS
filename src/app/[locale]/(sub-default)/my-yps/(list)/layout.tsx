import MyYpsContentsClient from "@/components/page/sub/layoutContents/myYps/MyYpsContentsClient";
import SubDefaultLayout from "@/components/layout/subDefault/SubDefaultLayout";

export default function ListLayout({ children, modal }: any) {
  return (
    <SubDefaultLayout isCanvas={true} isDetail={false} isWrite={true}>
      <MyYpsContentsClient initialMessages={[]} />
      {children}
      {modal}
    </SubDefaultLayout>
  );
}
