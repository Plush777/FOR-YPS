import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import MoneyCursor from "@/components/lib/nurui/money-cursor/money-cursor";
import { ToastContainer } from "react-toastify";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/globalComponents.css";

import Footer from "@/components/layout/footer/Footer";

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

  const faviconUrlPrefix = "/icons/favicons";

  return (
    <html lang={locale} translate="no">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="174x192"
          href={`${faviconUrlPrefix}/apple-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="36x40"
          href={`${faviconUrlPrefix}/android-icon-36x36.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x53"
          href={`${faviconUrlPrefix}/android-icon-48x48.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x35"
          href={`${faviconUrlPrefix}/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/ico"
          sizes="32x35"
          href={`${faviconUrlPrefix}/favicon.ico`}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content={`${faviconUrlPrefix}/ms-icon-144x144.png`}
        />
        <meta
          name="msapplication-TileImage"
          content={`${faviconUrlPrefix}/ms-icon-70x70.png`}
        />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div id="app">
            {children}
            <Footer />
          </div>
          <ToastContainer position="top-center" autoClose={2000} />
          <MoneyCursor />
          <div id="portal" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
