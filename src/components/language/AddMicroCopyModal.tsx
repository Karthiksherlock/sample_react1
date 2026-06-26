import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import "./AddMicroCopyModal.css";
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
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
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
    <div className="microCopyModalOverlay">
      <div className="microCopyModalCard">
        <div className="microCopyModalHeader">
          <h2>Add a new Micro-copy</h2>
          <p className="microCopyHeaderDescription">
            Add a key and its translated values for the each language.
          </p>
          <button className="microCopyCloseButton" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="microCopyModalBody">
          <div className="microCopyFormGroup">
            <label>Enter micro-copy key</label>
            <input
              ref={inputRef}
              placeholder="e.g. WelcomeText"
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                setError("");
              }}
            />
          </div>
          {error && <p className="KeyErrorText">{error}</p>}
          <div className="sectionDivider" />
          <div className="translationSection">
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
        </div>
        <div className="microCopyModalFooter">
          <button className="microCopySecondaryButton" onClick={onClose}>
            Cancel
          </button>

          <button className="microCopyPrimaryButton" onClick={handleSave}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMicroCopyModal;
