"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type Props = {
  locales: readonly string[];
};

const trimPath = (path: string) => {
  const normalized = path.replace(/\/+$/, "");
  return normalized || "/";
};

const resolveBodyClass = (pathname: string, locales: readonly string[]) => {
  const segments = trimPath(pathname).split("/").filter(Boolean);
  return segments.length === 1 && locales.includes(segments[0])
    ? "main-page"
    : "sub-page";
};

export default function BodyClassController({ locales }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    const className = resolveBodyClass(pathname, locales);
    document.body.classList.remove("main-page", "sub-page");
    document.body.classList.add(className);
  }, [locales, pathname]);

  return null;
}
