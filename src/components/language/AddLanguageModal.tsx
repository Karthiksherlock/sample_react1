import { useState } from "react";

function AddLanguageModal({ onClose, onAdd }: any) {
  const initial = {
    name: "",
    iana_code: "",
    iso_code: "",
    font_family: "",
    font_url: "",
  };

  const [form, setForm] = useState(initial);

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    onAdd(form);
    setForm(initial);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h3>Add Language</h3>

        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="IANA code" value={form.iana_code} onChange={(e) => setForm({ ...form, iana_code: e.target.value })} />
        <input placeholder="ISO code" value={form.iso_code} onChange={(e) => setForm({ ...form, iso_code: e.target.value })} />
        <input placeholder="Font family" value={form.font_family} onChange={(e) => setForm({ ...form, font_family: e.target.value })} />
        <input placeholder="Font URL" value={form.font_url} onChange={(e) => setForm({ ...form, font_url: e.target.value })} />

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default AddLanguageModal;