import { Download,Save,Plus,Languages} from "lucide-react";

type Props = {
  onAddLanguage: () => void;
  onSave: () => void;
  onExport: () => void;
};

function Header({
  onAddLanguage,
  onSave,
  onExport,
}: Props) {
  return (
    <div className="header">
      <div className="headerLeft">
        <div className="logoBox">
          <Languages size={24} />
        </div>

        <div>
          <h2>Language Editor</h2>

          <p>
            Manage languages.json across
            supported locales
          </p>
        </div>
      </div>

      <div className="headeractions">
        <button onClick={onExport}>
          <Download size={18} />
          Export JSON
        </button>

        <button onClick={onSave}>
          <Save size={18} />
          Save changes
        </button>

        <button onClick={onAddLanguage}>
          <Plus size={18} />
          Add Language
        </button>
      </div>
    </div>
  );
}

export default Header;