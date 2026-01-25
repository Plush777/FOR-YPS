import Header from "@/components/layout/header/base/Header";

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header name="default" />
      {children}
    </>
  );
}
