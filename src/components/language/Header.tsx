type HeaderProps = {
  onAddLanguage: () => void;
  onAddMicroCopy: () => void;
};

function Header({ onAddLanguage, onAddMicroCopy }: HeaderProps) {
  return (
    <div>
      <h1>Languages</h1>

      <button onClick={onAddLanguage}>
        Add Language
      </button>

      <button onClick={onAddMicroCopy}>
        Add Micro-copy
      </button>
    </div>
  );
}

export default Header;