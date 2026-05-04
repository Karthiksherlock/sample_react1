type Props = {
  item: {
    key: string;
    values: { [lang: string]: string };
  };
  selectedLanguage: string;
  onChange: (key: string, value: string) => void;
};

function MicroCopyItem({ item, selectedLanguage, onChange }: Props) {
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
    </div>
  );
}

export default MicroCopyItem;