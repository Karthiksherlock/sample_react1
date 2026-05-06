type Props = {
  item: any;
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
    <div>
      <div>{item.key}</div>

      <input
        value={item.values[selectedLanguage] || ""}
        onChange={(e) =>
          onChange(item.key, e.target.value)
        }
      />

      <button onClick={() => onDelete(item.key)}>
        Delete
      </button>
    </div>
  );
}

export default MicroCopyItem;