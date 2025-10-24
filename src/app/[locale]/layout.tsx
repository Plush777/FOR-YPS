import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import MoneyCursor from "@/components/nurui/money-cursor/money-cursor";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/globals.css";
import "../../styles/globalComponents.css";

import Footer from "@/components/footer/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "mainPage" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: "FOR YPS",
      description: t("meta.description"),
      // url: `https://for-yps.com/${locale}`,
      siteName: "FOR YPS",
      images: [
        {
          url: "/og/og-image.png",
          width: 1200,
          height: 630,
          alt: "FOR YPS OpenGraph",
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: ["/og/og-image.png"],
      creator: "@youngposseup",
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  // 들어오는 'locale'이 유효한지 확인합니다.
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // 클라이언트에게 모든 메시지를 제공합니다.
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} translate="no">
      <body>
        <NextIntlClientProvider messages={messages}>
          <div id="app">
            {children}
            <Footer />
          </div>
          <MoneyCursor />
          <div id="portal" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
