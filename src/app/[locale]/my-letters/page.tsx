import Header from "@/components/layout/header/base/Header";
import Main from "@/components/page/main/base/Main";
import MyLettersPage from "@/clientPage/MyLettersPage";

export default function Page() {
  return (
    <>
      <Header name="sub" />
      <Main background="gray">
        <MyLettersPage />
      </Main>
    </>
  );
}
