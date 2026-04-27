import { Trash2 } from "lucide-react";

interface MicroCopyItemProps {
  keyName: string;
  value: string;
  onValueChange: (value: string) => void;
  onDelete: () => void;
}

export default function MicroCopyItem({
  keyName,
  value,
  onValueChange,
  onDelete,
}: MicroCopyItemProps) {
  return (
    <div className="mc-item">
      <div className="mc-item__col">
        <label className="mc-item__label">KEY</label>
        <div className="mc-item__key" title={keyName}>
          {keyName}
        </div>
      </div>
      <div className="mc-item__col mc-item__col--grow">
        <label className="mc-item__label">VALUE</label>
        <textarea
          className="mc-item__value"
          value={value}
          rows={2}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder="Enter translation…"
        />
      </div>
      <button
        type="button"
        className="mc-item__delete"
        aria-label={`Delete ${keyName}`}
        onClick={onDelete}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
