type Props = {
  item: { key: string; value: string };
  onChange: (oldKey: string, newKey: string, newValue: string) => void;
  onDelete: (key: string) => void;
};

function MicroCopyItem({ item, onChange, onDelete }: Props) {
  return (
    <div className="item">
      <input
        value={item.key}
        onChange={(e) =>
          onChange(item.key, e.target.value, item.value)
        }
      />

      <textarea
        value={item.value}
        onChange={(e) =>
          onChange(item.key, item.key, e.target.value)
        }
      />

      <button onClick={() => onDelete(item.key)}>🗑</button>
    </div>
  );
}

export default MicroCopyItem;