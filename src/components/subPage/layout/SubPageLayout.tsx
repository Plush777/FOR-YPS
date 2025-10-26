import type { ReactNode } from "react";
import PageBackground from "@/components/pageBackground/PageBackground";
import AboutLayoutContents from "@/components/subPage/layoutContents/AboutLayoutContents";

interface Props {
  children: ReactNode;
  isVisual: boolean;
  description?: string;
}

export default function SubPageLayout({
  children,
  isVisual,
  description,
}: Props) {
  return (
    <>
      {isVisual ? (
        <PageBackground styleType="sub">
          <AboutLayoutContents description={description}>
            {children}
          </AboutLayoutContents>
        </PageBackground>
      ) : (
        <PageBackground styleType="myyps">{children}</PageBackground>
      )}
    </>
  );
}
