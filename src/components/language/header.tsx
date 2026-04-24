type HeaderProps = {
  onAddLanguage: () => void;
};

function Header({ onAddLanguage }: HeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <h2>Language Editor</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        <button>Export JSON</button>
        <button>Save Changes</button>
        <button onClick={onAddLanguage}>+ Add Language</button>
      </div>
    </div>
  );
}

export default Header;