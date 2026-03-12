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
import "react-toastify/dist/ReactToastify.css";

import "../../styles/globals.css";
import "../../styles/globalComponents.css";
import "../../styles/theme.css";

import Footer from "@/components/layout/footer/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import BodyClassController from "@/components/common/bodyClassController/BodyClassController";

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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 들어오는 'locale'이 유효한지 확인합니다.
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // 클라이언트에게 모든 메시지를 제공합니다.
  // side is the easiest way to get started
  const messages = await getMessages();

  const faviconUrlPrefix = "/icons/favicons";
  const supportedLocales = JSON.stringify(routing.locales);
  const bodyClassInitScript = `(() => {
    const locales = ${supportedLocales};
    const trimPath = (path) => {
      const normalized = path.replace(/\/+$/, "");
      return normalized || "/";
    };

    const resolveBodyClass = () => {
      const pathname = trimPath(window.location.pathname);
      const segments = pathname.split("/").filter(Boolean);
      return segments.length === 1 && locales.includes(segments[0])
        ? "main-page"
        : "sub-page";
    };

    const applyClass = () => {
      if (!document.body) {
        requestAnimationFrame(applyClass);
        return;
      }

      document.body.classList.remove("main-page", "sub-page");
      document.body.classList.add(resolveBodyClass());
    };

    applyClass();
  })();`;

  return (
    <html lang={locale} translate="no">
      <head>
        <script dangerouslySetInnerHTML={{ __html: bodyClassInitScript }} />
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
        <BodyClassController locales={routing.locales} />
        <NextIntlClientProvider messages={messages}>
          <div id="app">
            <AuthProvider>{children}</AuthProvider>
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
