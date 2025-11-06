"use client";

import CircleQuestion from "@/components/common/svg/CircleQuestion";
import "../styles/globals.css";
import "../styles/notFound.css";
import ArrowLeft from "@/components/common/svg/ArrowLeft";

export default function GlobalNotFound() {
  return (
    <html lang="ko">
      <head>
        <title>404 - For YPS</title>
      </head>
      <body>
        <div className="column-center">
          <h1>404</h1>

          <div className="p-box">
            <p>이런! 해당 페이지를 찾을 수 없네요!</p>
            <p>해당 문제가 계속된다면, 개발자에게 문의 해보세요.</p>
          </div>

          <div className="button-box">
            <a href="/" className="home">
              <ArrowLeft />
              홈으로
            </a>
            <a
              href="https://open.kakao.com/o/ss7hM2Oh"
              className="inquiry"
              target="_blank"
            >
              <CircleQuestion />
              문의하기
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
