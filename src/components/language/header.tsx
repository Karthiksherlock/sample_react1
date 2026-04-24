type Props = {
  onAddLanguage: () => void;
  onExport: () => void;
  onSave: () => void;
};

function Header({ onAddLanguage, onExport, onSave }: Props) {
  return (
    <div className="header">
      <h2>Language Editor</h2>

      <div className="actions">
        <button onClick={onExport}>Export JSON</button>
        <button onClick={onSave}>Save changes</button>
        <button className="primary" onClick={onAddLanguage}>
          + Add Language
        </button>
      </div>
    </div>
  );
}

export default Header;