import SettingsPage from "@/clientPage/SettingsPage";
import { notFound } from "next/navigation";

type SettingsSection = "profile" | "account" | "service" | "notification";

type Params = Promise<{ locale: string; section: string }>;

const validSections: SettingsSection[] = [
  "profile",
  "account",
  "service",
  "notification",
];

export default async function Page({ params }: { params: Params }) {
  const { section } = await params;

  if (!validSections.includes(section as SettingsSection)) {
    notFound();
  }

  return (
    <SettingsPage
      currentSection={section as SettingsSection}
      isCommentFeatureEnabled={false}
      isNotificationMenuDisabled={false}
    />
  );
}
