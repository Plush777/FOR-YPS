import AboutPage from "@/clientPage/AboutPage";
import Header from "@/components/layout/header/base/Header";
import Main from "@/components/page/main/base/Main";

export default function Page() {
  return (
    <>
      <Header name="sub" />

      <Main>
        <AboutPage />
      </Main>
    </>
  );
}
