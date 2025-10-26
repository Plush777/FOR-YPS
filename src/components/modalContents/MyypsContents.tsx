import modalStyles from "@/components/modal/modal.module.css";
import Button from "@/components/button/Button";

interface Props {
  placeholder: string;
  username: string;
  buttonText: string;
}

export default function MyypsContents({
  placeholder,
  username,
  buttonText,
}: Props) {
  return (
    <>
      <textarea
        className={modalStyles.modionTextarea}
        placeholder={placeholder}
      ></textarea>

      <div className={modalStyles.fromArea}>
        <span className={modalStyles.fromText}>from</span>
        <span className={modalStyles.fromName}>{username}</span>
      </div>

      <div className={modalStyles.buttonArea}>
        <Button size="md" styleType="roundedFull" text={buttonText} />
      </div>
    </>
  );
}
