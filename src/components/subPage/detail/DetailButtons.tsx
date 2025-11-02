import styles from "@/components/letterModal/letterModal.module.css";
import Share from "@/components/svg/Share";
import DotMore from "@/components/svg/DotMore";
import MenuDropDown from "@/components/menuDropdown/MenuDropDown";
import Button from "@/components/button/Button";
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
}: Props) {
  const { copyUrl } = useClipboard();

  function useTypeStyleCondition() {
    if (useType === "modal") return styles.modalType;
    if (useType === "detail") return styles.detailType;

    return "";
  }

  function useTypeButtonStyleCondiiton() {
    if (useType === "modal") {
      return (
        <>
          <Button
            onClick={() => copyUrl()}
            onlyIcon={true}
            iconSize="lg"
            color="transparent-gray"
          >
            <Share />
          </Button>
          <Button
            onlyIcon={true}
            iconSize="lg"
            color="transparent-gray"
            ref={buttonRef}
            onClick={onDropdownToogle}
          >
            <DotMore />
          </Button>
        </>
      );
    }

    if (useType === "detail") {
      return (
        <>
          <Button
            onClick={() => copyUrl()}
            rounded="roundedNone"
            onlyIcon={true}
            iconSize="lg"
            color="border2-white"
          >
            <Share />
          </Button>
          <Button
            rounded="roundedNone"
            onlyIcon={true}
            iconSize="lg"
            color="border2-white"
            ref={buttonRef}
            onClick={onDropdownToogle}
          >
            <DotMore />
          </Button>
        </>
      );
    }

    return null;
  }

  return (
    <div
      className={`
        ${styles.modalBodyButtons} 
        ${useTypeStyleCondition()}
      `}
    >
      {useTypeButtonStyleCondiiton()}

      {openState && (
        <MenuDropDown
          useType="letterModal"
          items={dropdownMenus}
          onSelect={onSelect}
          onClose={onClose}
          triggerRef={buttonRef}
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
}
