import Button from "@/components/button/base/Button";
import SvgHamburger from "@/components/common/svg/HamburgerMenu";
import styles from "@/components/button/hamburger/Hamburger.module.css";

type Props = {
  onToggle: () => void;
};

export default function Hamburger({ onToggle }: Props) {
  return (
    <div className={styles.wrap}>
      <Button
        color="transparent-white"
        onlyIcon={true}
        iconSize="onlySizeXl"
        onClick={onToggle}
      >
        <SvgHamburger />
      </Button>
    </div>
  );
}
