import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
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
  const [errors, setErrors] = useState({
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
    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };
  const validateForm = () => {
    const newErrors = {
      name: "",
      iana_code: "",
      iso_code: "",
      font_family: "",
      font_url: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Language name is required";
      isValid = false;
    }

    if (!formData.iana_code.trim()) {
      newErrors.iana_code = "IANA code is required";
      isValid = false;
    }

    if (!formData.iso_code.trim()) {
      newErrors.iso_code = "ISO code is required";
      isValid = false;
    }

    if (!formData.font_family.trim()) {
      newErrors.font_family = "Font family is required";
      isValid = false;
    }

    if (!formData.font_url.trim()) {
      newErrors.font_url = "Font URL is required";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;
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
          <button className="modalCloseButton" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modalBody">
          <div className="formGroup">
            <label>
              Language Name <span className="requiredMark">*</span>
            </label>
            <input
              ref={inputRef}
              placeholder="e.g French"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && (
              <p className="fieldErrorText">{errors.name}</p>
          )}
          </div>
          <div className="formGroup">
            <label>
              IANA Code <span className="requiredMark">*</span>
            </label>
            <input
              placeholder="e.g. fr-FR"
              value={formData.iana_code}
              onChange={(e) => handleChange("iana_code", e.target.value)}
            />
            {errors.iana_code && (
              <p className="fieldErrorText">{errors.iana_code}</p>
            )}
          </div>
          <div className="formGroup">
            <label>
              ISO Code <span className="requiredMark">*</span>
            </label>
            <input
              placeholder="e.g. fr"
              value={formData.iso_code}
              onChange={(e) => handleChange("iso_code", e.target.value)}
            />
            {errors.iso_code && (
              <p className="fieldErrorText">{errors.iso_code}</p>
          )}
          </div>
          <div className="formGroup">
            <label>
              Font Family <span className="requiredMark">*</span>
            </label>
            <input
              placeholder="e.g. Arial"
              value={formData.font_family}
              onChange={(e) => handleChange("font_family", e.target.value)}
            />
            {errors.font_family && (
              <p className="fieldErrorText">{errors.font_family}</p>
        )}
          </div>
          <div className="formGroup">
            <label>
              Font URL <span className="requiredMark">*</span>
            </label>
            <input
              placeholder="e.g. https://fonts.googleapis.com/css2?family=Roboto&display=swap"
              value={formData.font_url}
              onChange={(e) => handleChange("font_url", e.target.value)}
            />
            {errors.font_url && (
              <p className="fieldErrorText">{errors.font_url}</p>
            )}
          </div>
        </div>

        <div className="modalFooter">
          <button className="secondaryButton" onClick={onClose}>
            cancel
          </button>
          <button className="primaryButton" onClick={handleSave}>
            Create Language
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddLanguageModal;
