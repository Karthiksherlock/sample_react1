import { Trash2 } from "lucide-react";

interface MicroCopyItemProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
}

export default function MicroCopyItem({
  label,
  value,
  onChange,
  onDelete,
}: MicroCopyItemProps) {
  return (
    <div className="mc-item">
      <div className="mc-item__col">
        <label className="mc-item__label">KEY</label>
        <div className="mc-item__key" title={label}>
          {label}
        </div>
      </div>
      <div className="mc-item__col mc-item__col--grow">
        <label className="mc-item__label">VALUE</label>
        <textarea
          className="mc-item__value"
          value={value}
          rows={2}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter translation…"
        />
      </div>
      <button
        type="button"
        className="mc-item__delete"
        aria-label={`Delete ${label}`}
        onClick={onDelete}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
