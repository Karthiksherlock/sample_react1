type Props = {
  microCopyKey: string;
  value: string;

  onChange: (
    key: string,
    value: string,
  ) => void;

  onDelete: (key: string) => void;
};

function MicroCopyItem({
  microCopyKey,
  value,
  onChange,
  onDelete,
}: Props) {
  return (
    <div className="micro-item">
      <div className="micro-key">
        {microCopyKey}
      </div>

      <input
        className="micro-input"
        value={value}
        onChange={(e) =>
          onChange(
            microCopyKey,
            e.target.value,
          )
        }
      />

      <button
        className="deletebtn"
        onClick={() =>
          onDelete(microCopyKey)
        }
      >
        Delete
      </button>
    </div>
  );
}

export default MicroCopyItem;