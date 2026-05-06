type Props = {
  onAddLanguage: () => void;
  onAddMicroCopy: () => void;
  onSave: () => void;
  onExport: () => void;
};

function Header({ onAddLanguage, onAddMicroCopy, onSave, onExport }: Props) {
  return (
    <div>
      <h2>Language Editor</h2>
      <p>Manage languages.json across supported locales</p>

      <button onClick={onExport}>Export JSON</button>
      <button onClick={onSave}>Save changes</button>
      <button onClick={onAddLanguage}>Add Language</button>
    </div>
  );
}

export default Header;
