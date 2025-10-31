import letterModalStyles from "@/components/letterModal/letterModal.module.css";
import Share from "@/components/svg/Share";
import DotMore from "@/components/svg/DotMore";
import MenuDropDown from "@/components/menuDropdown/MenuDropDown";
import subTopStyles from "@/components/subPage/contents/subTop.module.css";

interface Props {
  useType: string;
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
    if (useType === "modal") {
      return {
        buttons: {
          wrap: letterModalStyles.modalBodyButtons,
          button: letterModalStyles.modalBodyButton,
        },
      };
    }

    if (useType === "detail") {
      return {
        buttons: {
          wrap: `${letterModalStyles.modalBodyButtons}`,
          button: `${subTopStyles.subTopButton}`,
        },
      };
    }
  }

  const useTypeStyles = useTypeStyleCondition();

  return (
    <div className={useTypeStyles?.buttons.wrap}>
      <button type="button" className={useTypeStyles?.buttons.button}>
        <Share />
      </button>
      <button
        type="button"
        ref={buttonRef}
        onClick={onDropdownToogle}
        className={useTypeStyles?.buttons.button}
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
