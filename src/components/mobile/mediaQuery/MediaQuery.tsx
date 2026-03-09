/* 클라이언트 컴포넌트용 미디어쿼리 (header 같은 서버 컴포넌트 사용 금지) */

import React, { useState, useEffect } from "react";
import { ReactNode } from "react";

interface MediaQueryProps {
  children: ReactNode;
}

const M1024: React.FC<MediaQueryProps> = ({ children }) => {
  const [is1024, setIs1024] = useState(false);

  useEffect(() => {
    const checkMediaQuery = () => {
      setIs1024(window.matchMedia("(max-width: 1024px)").matches);
    };

    checkMediaQuery();
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    mediaQuery.addEventListener("change", checkMediaQuery);

    return () => mediaQuery.removeEventListener("change", checkMediaQuery);
  }, []);

  return <React.Fragment>{is1024 && children}</React.Fragment>;
};

const Min768: React.FC<MediaQueryProps> = ({ children }) => {
  const [is768, setIs768] = useState(false);

  useEffect(() => {
    const checkMediaQuery = () => {
      setIs768(window.matchMedia("(min-width: 768px)").matches);
    };

    checkMediaQuery();
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addEventListener("change", checkMediaQuery);

    return () => mediaQuery.removeEventListener("change", checkMediaQuery);
  }, []);

  return <React.Fragment>{is768 && children}</React.Fragment>;
};

const M768: React.FC<MediaQueryProps> = ({ children }) => {
  const [is768, setIs768] = useState(false);

  useEffect(() => {
    const checkMediaQuery = () => {
      setIs768(window.matchMedia("(max-width: 768px)").matches);
    };

    checkMediaQuery();
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    mediaQuery.addEventListener("change", checkMediaQuery);

    return () => mediaQuery.removeEventListener("change", checkMediaQuery);
  }, []);

  return <React.Fragment>{is768 && children}</React.Fragment>;
};

const M500: React.FC<MediaQueryProps> = ({ children }) => {
  const [is500, setIs500] = useState(false);

  useEffect(() => {
    const checkMediaQuery = () => {
      setIs500(window.matchMedia("(max-width: 500px)").matches);
    };

    checkMediaQuery();
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    mediaQuery.addEventListener("change", checkMediaQuery);

    return () => mediaQuery.removeEventListener("change", checkMediaQuery);
  }, []);

  return <React.Fragment>{is500 && children}</React.Fragment>;
};

const M375: React.FC<MediaQueryProps> = ({ children }) => {
  const [is375, setIs375] = useState(false);

  useEffect(() => {
    const checkMediaQuery = () => {
      setIs375(window.matchMedia("(max-width: 375px)").matches);
    };

    checkMediaQuery();
    const mediaQuery = window.matchMedia("(max-width: 375px)");
    mediaQuery.addEventListener("change", checkMediaQuery);

    return () => mediaQuery.removeEventListener("change", checkMediaQuery);
  }, []);

  return <React.Fragment>{is375 && children}</React.Fragment>;
};

export { M1024, Min768, M768, M500, M375 };
