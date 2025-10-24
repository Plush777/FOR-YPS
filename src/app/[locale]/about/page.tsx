import AboutPage from "@/clientPage/AboutPage";
import Header from "@/components/header/Header";
import Main from "@/components/main/Main";

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
