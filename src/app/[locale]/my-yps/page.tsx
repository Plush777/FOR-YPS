import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import MyYpsPage from "@/clientPage/MyYpsPage";

export default function Page() {
  return (
    <>
      <Header name="default" />

      <Main>
        <MyYpsPage />
      </Main>
    </>
  );
}
