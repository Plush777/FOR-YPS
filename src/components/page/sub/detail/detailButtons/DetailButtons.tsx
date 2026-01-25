import styles from "@/components/page/sub/letterModal/letterModal.module.css";
import Share from "@/components/common/svg/Share";
import DotMore from "@/components/common/svg/DotMore";
import MenuDropDown from "@/components/layout/header/menuDropdown/MenuDropDown";
import Button from "@/components/button/base/Button";
import { useClipboard } from "@/hooks/feature/clipboard/useClipboard";

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
  data: any;
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
  data,
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
        color={useType === "modal" ? "transparent-gray" : "border2-white"}
        rounded="roundedNone"
      >
        <Share />
      </Button>
      <Button
        onlyIcon
        iconSize="lg"
        color={useType === "modal" ? "transparent-gray" : "border2-white"}
        ref={buttonRef}
        className={openState ? "active" : ""}
        onClick={onDropdownToogle}
        rounded="roundedNone"
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
          letterId={(data as any)?.id}
        />
      )}
    </div>
  );
}
