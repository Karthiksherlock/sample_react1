import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (lang: string) => void;
};

function AddLanguageModal({ open, onClose, onSave }: Props) {
  const [value, setValue] = useState("");

  if (!open) return null;

  const handleSave = () => {
    if (!value.trim()) return;
    onSave(value);
    setValue("");
    onClose();
  };

  return (
    <div>
      <h2>Add Language</h2>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default AddLanguageModal;