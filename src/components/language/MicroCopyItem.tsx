type KeyItem = {
  key: string;
  values: {
    [language: string]: string;
  };
};

type Props = {
  item: KeyItem;
  selectedLanguage: string;
  onChange: (key: string, value: string) => void;
  onDelete: (key: string) => void;
};

function MicroCopyItem({
  item,
  selectedLanguage,
  onChange,
  onDelete,
}: Props) {
  return (
    <div className="micro-item">
      <div className="micro-key">{item.key}</div>

      <input
        className="micro-input"
        value={item.values[selectedLanguage] || ""}
        onChange={(e) => onChange(item.key, e.target.value)}
      />

      <button className="deletebtn" onClick={() => onDelete(item.key)}>
        Delete
      </button>
    </div>
  );
}

export default MicroCopyItem;