import TextareaCounter from "@/components/form/textareaCounter/TextareaCounter";
import Textarea from "@/components/form/textarea/Textarea";
import styles from "@/components/subPage/layoutContents/myYpsContents.module.css";
import { useTranslations } from "next-intl";
import Button from "@/components/button/Button";
import TextCounter from "../form/textCounter/TextCounter";

interface Props {
  useType: string;
  style?: React.CSSProperties;
  item: any;
  isEllipsis?: boolean;
  editMode?: boolean;
  editedText?: string;
  setEditedText?: (v: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export default function LetterCard({
  useType,
  style,
  item,
  isEllipsis = true,
  editMode = false,
  editedText,
  setEditedText,
  onSave,
  onCancel,
}: Props) {
  function cardSizeCondition() {
    if (useType === "detail") return styles.detailSize;
    if (useType === "cardList") return styles.cardListSize;
    if (useType === "modal") return styles.modalSize;
    return "";
  }

  const CHARACTER_LIMIT = 400;
  const tLetterPopup = useTranslations("subPage.myYps.letterPopup");

  return (
    <div className={`${styles.item} ${isEllipsis ? styles.hasEllipsis : ""}`}>
      <div
        className={`${styles.letterInner} ${cardSizeCondition()}`}
        style={style}
      >
        {editMode ? (
          <>
            <TextareaCounter>
              <Textarea
                placeholder={tLetterPopup("placeholder")}
                maxLength={CHARACTER_LIMIT}
                value={editedText ?? ""}
                onChange={(e) => setEditedText?.(e.target.value)}
              />
              <TextCounter
                value={editedText ?? ""}
                maxLength={CHARACTER_LIMIT}
              />
            </TextareaCounter>

            <div className={styles.buttonGroup}>
              <Button
                size="xs"
                color="white"
                onlyIcon={false}
                text="저장하기"
                minWidth="sm"
                onClick={onSave}
              />
              <Button
                size="xs"
                color="gray"
                onlyIcon={false}
                text="취소"
                minWidth="sm"
                onClick={onCancel}
              />
            </div>
          </>
        ) : (
          <>
            <p className={styles.text}>{item.content}</p>
            {isEllipsis && (
              <div className={styles.metaArea}>
                <span className={`${styles.username} ${styles.metaText}`}>
                  By {item.username}
                </span>
                <span className={`${styles.date} ${styles.metaText}`}>
                  {new Date(item.created_at).toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
