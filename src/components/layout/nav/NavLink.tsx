"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

interface Props {
  slug: string;
  children: ReactNode;
}

export default function NavLink({ slug, children }: Props) {
  const segment = useSelectedLayoutSegment();
  const isActive = slug === segment;

  return (
    <Link href={slug} style={{ fontWeight: isActive ? "bold" : "normal" }}>
      {children}
    </Link>
  );
}
