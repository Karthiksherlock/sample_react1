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
    <div>
      <h3>Add Language</h3>

      <input
        ref={inputRef}
        placeholder="Language Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <input
        placeholder="IANA Code"
        value={formData.iana_code}
        onChange={(e) => handleChange("iana_code", e.target.value)}
      />

      <input
        placeholder="ISO Code"
        value={formData.iso_code}
        onChange={(e) => handleChange("iso_code", e.target.value)}
      />

      <input
        placeholder="Font Family"
        value={formData.font_family}
        onChange={(e) => handleChange("font_family", e.target.value)}
      />

      <input
        placeholder="Font URL"
        value={formData.font_url}
        onChange={(e) => handleChange("font_url", e.target.value)}
      />

      <button onClick={handleSave}>Save</button>

      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default AddLanguageModal;
