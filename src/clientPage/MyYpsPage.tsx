import SubPageLayout from "@/components/subPage/layout/SubPageLayout";
import MyYpsContents from "@/components/subPage/layoutContents/MyYpsContents";

export default function MyYpsPage() {
  return (
    <SubPageLayout isVisual={false}>
      <MyYpsContents />
    </SubPageLayout>
  );
}
