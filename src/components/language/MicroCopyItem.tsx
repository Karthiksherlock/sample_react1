type Item = {
  key: string;
  value: string;
};

type Props = {
  item: Item;
  index: number;
  onChange: (index: number, field: "key" | "value", value: string) => void;
  onDelete: (index: number) => void;
};

function MicroCopyItem({ item, index, onChange, onDelete }: Props) {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      <input
        placeholder="Key"
        value={item.key}
        onChange={(e) => onChange(index, "key", e.target.value)}
      />

      <textarea
        placeholder="Value"
        value={item.value}
        onChange={(e) => onChange(index, "value", e.target.value)}
      />

      <button onClick={() => onDelete(index)}>Delete</button>
    </div>
  );
}

export default MicroCopyItem;