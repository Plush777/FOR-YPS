import { ChangeEvent, useState } from "react";
import modalStyles from "@/components/modal/modal.module.css";
import Button from "@/components/button/Button";

interface Props {
  placeholder: string;
  username: string;
  buttonText: string;
  onSubmit?: (message: string) => Promise<void> | void;
}

export default function ModalMyypsContents({
  placeholder,
  username,
  buttonText,
  onSubmit,
}: Props) {
  const CHARACTER_LIMIT = 400;
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const nextValue = event.target.value.slice(0, CHARACTER_LIMIT);
    setValue(nextValue);
  };

  const handleSubmit = async () => {
    const trimmedValue = value.trim();
    if (!onSubmit || trimmedValue.length === 0 || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit(trimmedValue);
      setValue("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = !onSubmit || value.trim().length === 0 || isSubmitting;

  return (
    <>
      <textarea
        className={modalStyles.motionTextarea}
        placeholder={placeholder}
        maxLength={CHARACTER_LIMIT}
        value={value}
        onChange={handleChange}
      ></textarea>

      <div className={modalStyles.motionTextareaInfo}>
        <div className={modalStyles.fromArea}>
          <span className={modalStyles.fromText}>from</span>
          <span className={modalStyles.fromName}>{username}</span>
        </div>

        <div className={modalStyles.textareaCounter}>
          {value.length} / {CHARACTER_LIMIT}
        </div>
      </div>

      <div className={modalStyles.buttonArea}>
        <Button
          size="md"
          styleType="roundedFull"
          text={buttonText}
          disabled={isDisabled}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
}
