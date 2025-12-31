import type { ReactNode } from "react";
import PageBackground from "@/components/layout/pageBackground/PageBackground";
import SubContentsLayout from "@/components/page/sub/contents/SubContentsLayout";

interface Props {
  children: ReactNode;
  isVisual: boolean;
  title?: string;
  description?: string;
}

export default function SubPageLayout({
  children,
  isVisual,
  title,
  description,
}: Props) {
  return (
    <>
      {isVisual ? (
        <PageBackground styleType="sub">
          <SubContentsLayout title={title} description={description}>
            {children}
          </SubContentsLayout>
        </PageBackground>
      ) : (
        <PageBackground styleType="myyps">{children}</PageBackground>
      )}
    </>
  );
}
