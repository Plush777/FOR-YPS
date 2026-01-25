import SubDefaultLayout from "@/components/layout/subDefault/SubDefaultLayout";

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SubDefaultLayout isCanvas={true} isDetail={true} isWrite={false}>
      {children}
    </SubDefaultLayout>
  );
}
