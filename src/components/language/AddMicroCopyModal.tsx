import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
};

function AddMicroCopyModal({ open, onClose, onSave }: Props) {
  const [value, setValue] = useState("");

  if (!open) return null;

  const handleSave = () => {
    if (!value.trim()) return;
    onSave(value.trim());
    setValue("");
    onClose();
  };

  return (
    <div>
      <h2>Add Micro-copy</h2>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button
        onClick={() => {
          setValue("");
          onClose();
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default AddMicroCopyModal;