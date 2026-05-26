import { useEffect, useRef, useState } from "react";

export type NewLanguage = {
  name: string;
  iana_code: string;
  iso_code: string;
  font_family: string;
  font_url: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (language: NewLanguage) => void;
};

function AddLanguageModal({ open, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<NewLanguage>({
    name: "",
    iana_code: "",
    iso_code: "",
    font_family: "",
    font_url: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (key: keyof NewLanguage, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;

    onSave(formData);

    setFormData({
      name: "",
      iana_code: "",
      iso_code: "",
      font_family: "",
      font_url: "",
    });

    onClose();
  };

  return (
    <div className="modalOverlay">
      <div className="modalCard">
        <div className="modalHeader">
          <h2>Add a new Language</h2>
          <button className="secondaryButton" onClick={onClose}>
            x
          </button>
        </div>
        <div className="modalBody">
          <div className="formGroup">
            <label>Language Name</label>
            <input
              ref={inputRef}
              placeholder="Language Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label>IANA Code</label>
            <input
              placeholder="IANA Code"
              value={formData.iana_code}
              onChange={(e) => handleChange("iana_code", e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label>ISO Code</label>
            <input
              placeholder="ISO Code"
              value={formData.iso_code}
              onChange={(e) => handleChange("iso_code", e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label>Font Family</label>
            <input
              placeholder="Font Family"
              value={formData.font_family}
              onChange={(e) => handleChange("font_family", e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label>Font URL</label>
            <input
              placeholder="Font URL"
              value={formData.font_url}
              onChange={(e) => handleChange("font_url", e.target.value)}
            />
          </div>
        </div>

        <div className="modalFooter">
          <button className="primaryButton" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddLanguageModal;
