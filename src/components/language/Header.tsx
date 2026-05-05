type HeaderProps = {
  onAddLanguage: () => void;
  onAddMicroCopy: () => void;
  onSave: () => void;
};

function Header({ onAddLanguage, onAddMicroCopy, onSave }: HeaderProps) {
  return (
    <div>
      <h1>Languages</h1>
      <button onClick={onAddLanguage}>Add Language</button>
      <button onClick={onAddMicroCopy}>Add Micro-copy</button>
      <button onClick={onSave}>Save Changes</button>
    </div>
  );
}

export default Header;