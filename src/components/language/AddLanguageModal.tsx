import { useState } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";
import Button from "../Common/Button";

export interface NewLanguage {
  name: string;
  iana: string;
  iso: string;
  fontFamily: string;
  fontUrl: string;
}

interface AddLanguageModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (lang: NewLanguage) => void;
}

export default function AddLanguageModal({ open, onClose, onCreate }: AddLanguageModalProps) {
  const [name, setName] = useState("");
  const [iana, setIana] = useState("");
  const [iso, setIso] = useState("");
  const [fontFamily, setFontFamily] = useState("Noto Sans");
  const [fontUrl, setFontUrl] = useState("");

  if (!open) return null;

  const reset = () => {
    setName("");
    setIana("");
    setIso("");
    setFontFamily("Noto Sans");
    setFontUrl("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !iana.trim()) return;
    onCreate({
      name: name.trim(),
      iana: iana.trim(),
      iso: iso.trim() || iana.trim(),
      fontFamily: fontFamily.trim(),
      fontUrl: fontUrl.trim(),
    });
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" aria-label="Close" onClick={handleClose}>
          <X size={18} />
        </button>
        <h2 className="modal__title">Add a new language</h2>
        <p className="modal__subtitle">
          Provide the metadata. You can add micro-copies after creating it.
        </p>

        <form onSubmit={handleSubmit} className="modal__form">
          <div className="field">
            <label>Name</label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. French"
              required
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label>IANA code</label>
              <input value={iana} onChange={(e) => setIana(e.target.value)} placeholder="fr" required />
            </div>
            <div className="field">
              <label>ISO code</label>
              <input value={iso} onChange={(e) => setIso(e.target.value)} placeholder="fr" />
            </div>
          </div>

          <div className="field">
            <label>Font family</label>
            <input value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} placeholder="Noto Sans" />
          </div>

          <div className="field">
            <label>Font URL</label>
            <input
              value={fontUrl}
              onChange={(e) => setFontUrl(e.target.value)}
              placeholder="https://fonts.googleapis.com/..."
            />
          </div>

          <div className="modal__actions">
            <Button variant="ghost" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create language
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
