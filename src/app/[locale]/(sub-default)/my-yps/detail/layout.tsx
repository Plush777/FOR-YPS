import Inner from "@/components/layout/inner/Inner";
import PageBackground from "@/components/layout/pageBackground/PageBackground";

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageBackground styleType="sub">
      <Inner type="common">{children}</Inner>
    </PageBackground>
  );
}
