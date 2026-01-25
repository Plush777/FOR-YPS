import HomePage from "@/clientPage/HomePage";
import rssUrl from "@/data/rss/youtube.json";

export const revalidate = 3600;

export default async function Page() {
  const res = await fetch(rssUrl.youngposse.url, {
    next: { revalidate: 3600 },
  });

  const data = await res.json();

  return <HomePage initialItems={data.items} />;
}
