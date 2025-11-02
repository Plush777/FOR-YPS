import styles from "@/components/loadMoreButton/loadMoreButton.module.css";
import { useTranslations } from "next-intl";
import ArrowDownLoadMore from "@/components/svg/ArrowDownLoadMore";
import Button from "@/components/button/Button";

interface Props {
  showAllLoadedNotice: boolean;
  onLoadMore: () => void;
  isLoadMoreLoading: boolean;
}

export default function LoadMoreButton({
  showAllLoadedNotice,
  onLoadMore,
  isLoadMoreLoading,
}: Props) {
  const t = useTranslations("subPage.myYps.letter.state");

  return (
    <div className={styles.loadMoreWrap}>
      {/* ✅ 클릭했을 때 결과가 없었던 경우에만 안내문 노출 */}
      {showAllLoadedNotice ? (
        <p className={styles.loadMoreEndText}>{t("loadEndText")}</p>
      ) : (
        <Button
          onlyIcon={false}
          size="xs"
          color="gray2"
          className={styles.loadMoreButton}
          onClick={onLoadMore}
          disabled={isLoadMoreLoading}
        >
          {isLoadMoreLoading ? (
            t("loadText")
          ) : (
            <>
              {t("defaultText")}
              <ArrowDownLoadMore />
            </>
          )}
        </Button>
      )}
    </div>
  );
}
