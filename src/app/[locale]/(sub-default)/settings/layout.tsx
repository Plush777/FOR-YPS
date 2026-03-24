import PageBackground from "@/components/layout/pageBackground/PageBackground";
import Inner from "@/components/layout/inner/Inner";

export default function SettingsLayout({ children }: any) {
  return (
    <PageBackground styleType="sub">
      <Inner type="common">{children}</Inner>
    </PageBackground>
  );
}
