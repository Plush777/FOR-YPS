import styles from "@/components/page/sub/letterModal/letterModal.module.css";
import Share from "@/components/common/svg/Share";
import DotMore from "@/components/common/svg/DotMore";
import MenuDropDown from "@/components/layout/header/menuDropdown/MenuDropDown";
import Button from "@/components/button/base/Button";
import { useClipboard } from "@/hooks/useClipboard";

interface Props {
  useType: "modal" | "detail";
  onDropdownToogle: () => void;
  onSelect: () => void;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  dropdownMenus: string[];
  openState: boolean;
  isLoggedIn: boolean;
  isMyLetter: boolean;
  onEdit: () => void;
}

export default function DetailButtons({
  useType,
  onDropdownToogle,
  onSelect,
  onClose,
  buttonRef,
  dropdownMenus,
  openState,
  isLoggedIn,
  isMyLetter,
  onEdit,
}: Props) {
  const { copyUrl } = useClipboard();

  return (
    <div
      className={`${styles.modalBodyButtons} ${
        useType === "modal" ? styles.modalType : styles.detailType
      }`}
    >
      <Button
        onClick={() => copyUrl()}
        onlyIcon
        iconSize="lg"
        color="transparent-gray"
      >
        <Share />
      </Button>
      <Button
        onlyIcon
        iconSize="lg"
        color="transparent-gray"
        ref={buttonRef}
        className={openState ? "active" : ""}
        onClick={onDropdownToogle}
      >
        <DotMore />
      </Button>

      {openState && (
        <MenuDropDown
          useType="letterModal"
          items={dropdownMenus}
          onClose={onClose}
          triggerRef={buttonRef}
          isLoggedIn={isLoggedIn}
          isMyLetter={isMyLetter}
          onSelect={onSelect}
          onEdit={onEdit} // ✅ 전달
        />
      )}
    </div>
  );
}
