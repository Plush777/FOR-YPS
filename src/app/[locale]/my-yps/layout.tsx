import { headers } from "next/headers";

export default async function MyYpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hdr = await headers();
  const pathname = hdr.get("x-invoke-path") ?? "";
  const isDetailPage = pathname.includes("/my-yps/detail/");

  return (
    <>
      {!isDetailPage && children}
      {isDetailPage && children}
    </>
  );
}
