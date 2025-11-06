import HomePage from "@/clientPage/HomePage";
import Header from "@/components/layout/header/base/Header";
import rssUrl from "@/data/rss/youtube.json";
import Main from "@/components/page/main/base/Main";

export const revalidate = 3600;

export default async function Page() {
  const res = await fetch(rssUrl.youngposse.url, {
    next: { revalidate: 3600 },
  });

  const data = await res.json();

  return (
    <>
      <Header name="main" />

      <Main>
        <HomePage initialItems={data.items} />
      </Main>
    </>
  );
}
