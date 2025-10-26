"use client";

import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import MyYpsPage from "@/clientPage/MyYpsPage";
import HeartCanvas from "@/components/canvas/HeartCanvas";
import { Modal } from "@/components/modal/Modal";

export default function Page() {
  return (
    <>
      <Header name="default" />

      <Main background="gray">
        <MyYpsPage />
        <Modal useType="fixedButton" />

        <HeartCanvas hMin={360} hMax={360} bgColor="transparent" count={40} />
      </Main>
    </>
  );
}
