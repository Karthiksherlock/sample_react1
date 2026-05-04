type Props = {
  item: {
    key: string;
    values: { [lang: string]: string };
  };
  selectedLanguage: string;
  onChange: (key: string, value: string) => void;
  onDelete: (key: string) => void;
};

function MicroCopyItem({ item, selectedLanguage, onChange, onDelete }: Props) {
  return (
    <div>
      <strong>{item.key}</strong>
      <input
        type="text"
        value={item.values[selectedLanguage] || ""}
        onChange={(e) =>
          onChange(item.key, e.target.value)
        }
      />
      <button
        onClick={() => {
          if (confirm("Delete this key?")) {
            onDelete(item.key);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default MicroCopyItem;