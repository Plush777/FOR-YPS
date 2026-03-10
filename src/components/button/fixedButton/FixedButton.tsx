import styles from "@/components/button/fixedButton/fixedButton.module.css";
import Plus from "@/components/common/svg/Plus";
import Button from "@/components/button/base/Button";

interface Props {
  type: string;
  onClickModal: () => void;
}

export default function FixedButton({ type, onClickModal }: Props) {
  return (
    <div className={styles.fixedButtonWrap}>
      {type === "write" && (
        <Button
          color="outlineWhite"
          onlyIcon={true}
          iconSize="write"
          onClick={onClickModal}
        >
          <span className="hidden">작성하기</span>
          <Plus />
        </Button>
      )}
    </div>
  );
}
