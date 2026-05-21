import { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: ( data: { key: string; value: { [language: string]: string } } ) => void;
  languages: string[];
};

function AddMicroCopyModal({ open, onClose, onSave, languages }: Props) {
  const [key, setKey] = useState("");

  const [values, setValues] = useState<{
    [language: string]: string;
  }>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  const handleSave = () => {
    if (!key.trim()) return;
    onSave({ key: key.trim(), value: values });
    setKey("");
    setValues({});
    onClose();
  };
  const handleValueChange = (
    language: string,
    value: string,
  ) => {
    setValues((prev) => ({
      ...prev,
      [language]: value,
    }));
  };

  return (
    <div>
      <h3>Add Micro-copy</h3>

      <input
        ref={inputRef}
        placeholder="Micro-copy key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <div className="languageValuesContainer">
        {languages.map((language) => (
          <div
            key={language}
            className="languageValueItem"
          >
            <label>{language}</label>

            <input
              placeholder={`Value for ${language}`}
              value={values[language] || ""}
              onChange={(e) =>
                handleValueChange(
                  language,
                  e.target.value,
                )
              }
            />
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default AddMicroCopyModal;
