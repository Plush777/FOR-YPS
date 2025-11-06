import styles from "@/components/button/fixedButton/fixedButton.module.css";
import Pencil from "@/components/common/svg/Pencil";
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
          color="gray"
          onlyIcon={true}
          iconSize="xl"
          onClick={onClickModal}
        >
          <span className="hidden">작성하기</span>
          <Pencil />
        </Button>
      )}
    </div>
  );
}
