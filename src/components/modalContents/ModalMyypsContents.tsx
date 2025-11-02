import { ChangeEvent, useState } from "react";
import modalStyles from "@/components/modal/modal.module.css";
import Button from "@/components/button/Button";
import TextareaCounter from "@/components/form/textareaCounter/TextareaCounter";

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
      <TextareaCounter
        isUsername={true}
        username={username}
        placeholder={placeholder}
        maxLength={CHARACTER_LIMIT}
        value={value}
        onChange={handleChange}
      />

      <div className={modalStyles.buttonArea}>
        <Button
          onlyIcon={false}
          color="white"
          size="md"
          rounded="roundedFull"
          text={buttonText}
          disabled={isDisabled}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
}
