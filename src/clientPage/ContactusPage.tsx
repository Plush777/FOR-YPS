import SubPageLayout from "@/components/subPage/SubPageLayout";
import { useTranslations } from "next-intl";

export default function ContactusPage() {
  const t = useTranslations("subPage.contactUs");

  return <SubPageLayout description={t("description")}>dsds</SubPageLayout>;
}
