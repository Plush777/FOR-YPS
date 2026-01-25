import SubDefaultLayout from "@/components/layout/subDefault/SubDefaultLayout";

export default function ListLayout({ children }: any) {
  return (
    <SubDefaultLayout isCanvas={false} isDetail={false} isWrite={false}>
      {children}
    </SubDefaultLayout>
  );
}
