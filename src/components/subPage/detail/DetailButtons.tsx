import styles from "@/components/letterModal/letterModal.module.css";
import Share from "@/components/svg/Share";
import DotMore from "@/components/svg/DotMore";
import MenuDropDown from "@/components/menuDropdown/MenuDropDown";

interface Props {
  useType: "modal" | "detail";
  onDropdownToogle: () => void;
  onSelect: () => void;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  dropdownMenus: string[];
  openState: boolean;
}

export default function DetailButtons({
  useType,
  onDropdownToogle,
  onSelect,
  onClose,
  buttonRef,
  dropdownMenus,
  openState,
}: Props) {
  function useTypeStyleCondition() {
    if (useType === "modal") return styles.modalType;
    if (useType === "detail") return styles.detailType;

    return "";
  }

  return (
    <div
      className={`
        ${styles.modalBodyButtons} 
        ${useTypeStyleCondition()}
      `}
    >
      <button type="button" className={styles.modalBodyButton}>
        <Share />
      </button>
      <button
        type="button"
        ref={buttonRef}
        onClick={onDropdownToogle}
        className={styles.modalBodyButton}
      >
        <DotMore />
      </button>

      {openState && (
        <MenuDropDown
          useType="letterModal"
          items={dropdownMenus}
          onSelect={onSelect}
          onClose={onClose}
          triggerRef={buttonRef}
        />
      )}
    </div>
  );
}
