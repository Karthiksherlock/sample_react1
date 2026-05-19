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
    <div className="microCopyCard">
      <div className="microCopyContent">
        <div className="microCopyKeySection">
          <label>KEY</label>

          <div className="microCopyKeyBox">
            {microCopyKey}
          </div>
        </div>

        <div className="microCopyValueSection">
          <label>VALUE</label>

          <textarea
            className="microCopyTextarea"
            value={value}
            onChange={(e) =>
              onChange(
                microCopyKey,
                e.target.value,
              )
            }
          />
        </div>
      </div>

      <button
        className="deleteButton"
        onClick={() =>
          onDelete(microCopyKey)
        }
      >
        🗑
      </button>
    </div>
  );
}

export default MicroCopyItem;