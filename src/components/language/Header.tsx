type Props = {
  onAddLanguage: () => void;
  onSave: () => void;
  onExport: () => void;
};

function Header({ onAddLanguage, onSave, onExport }: Props) {
  return (
    <div className="header">
      <div>
        <h2>Language Editor</h2>
        <p>Manage languages.json across supported locales</p>
      </div>

      <div className="headeractions">
        <button onClick={onExport}>Export JSON</button>
        <button onClick={onSave}>Save changes</button>
        <button onClick={onAddLanguage}>Add Language</button>
      </div>
    </div>
  );
}

export default Header;