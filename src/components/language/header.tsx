import { Languages, Download, Save, Plus } from "lucide-react";
import Button from "../Common/Button";

interface HeaderProps {
  onExport: () => void;
  onSave: () => void;
  onAddLanguage: () => void;
  saving?: boolean;
}

export default function Header({ onExport, onSave, onAddLanguage, saving }: HeaderProps) {
  return (
    <header className="lp-header">
      <div className="lp-header__left">
        <div className="lp-header__icon">
          <Languages size={28} />
        </div>
        <div>
          <h1 className="lp-header__title">Language Editor</h1>
          <p className="lp-header__subtitle">
            Manage <code>languages.json</code> across supported locales
          </p>
        </div>
      </div>

      <div className="lp-header__actions">
        <Button variant="secondary" icon={<Download size={16} />} onClick={onExport}>
          Export JSON
        </Button>
        <Button variant="primary" icon={<Save size={16} />} onClick={onSave} disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
        <Button variant="primary" icon={<Plus size={16} />} onClick={onAddLanguage}>
          Add Language
        </Button>
      </div>
    </header>
  );
}
