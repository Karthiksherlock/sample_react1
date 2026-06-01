import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    key: string;
    value: { [language: string]: string };
  }) => void;
  languages: string[];
};

function AddMicroCopyModal({ open, onClose, onSave, languages }: Props) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

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
  const keyRegex = /^[a-zA-Z0-9_-]+$/;
  const handleSave = () => {
    const trimmedKey = key.trim();

    if (!trimmedKey) {
      setError("Key is required");
      return;
    }

    if (!keyRegex.test(trimmedKey)) {
      setError(
        "Only letters, numbers, underscores (_) and hyphens (-) are allowed",
      );
      return;
    }

    setError("");
    onSave({ key: trimmedKey, value: values });
    setKey("");
    setValues({});
    onClose();
  };
  const handleValueChange = (language: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [language]: value,
    }));
  };

  return (
  <div className="modalOverlay">
    <div className="modalCard addMicroCopyModalCard">
        <div className="modalHeader">
          <h2>Add a new Micro-copy</h2>
          <button className="modalCloseButton" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modalBody">
          <div className="formGroup">
            <label>Enter micro-copy key</label>
            <input
              ref={inputRef}
              placeholder=" e.g. WelcomeText"
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                setError("");
              }}
            />
          </div>
          {error && <p className="KeyErrorText">{error}</p>}
          <h3 className="sectionTitle">Translation Values</h3>
          <div className="languageValuesContainer scrollableValues">
            {languages.map((language) => (
              <div key={language} className="languageValueItem">
                <label>{language}</label>
                <textarea
                  placeholder={`Value for ${language}`}
                  value={values[language] || ""}
                  onChange={(e) =>
                    handleValueChange(language, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className="modalFooter">
          <button className="secondaryButton" onClick={onClose}>
            Cancel
          </button>

          <button className="primaryButton" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMicroCopyModal;
