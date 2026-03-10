"use client";

import { useEffect } from "react";

type Props = {
  className: "main-page" | "sub-page";
};

export default function BodyClassController({ className }: Props) {
  useEffect(() => {
    document.body.classList.remove("main-page", "sub-page");
    document.body.classList.add(className);

    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);

  return null;
}
