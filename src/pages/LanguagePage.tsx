import { useState } from "react";
import Header from "../components/language/Header";
import Tabs from "../components/language/Tabs";
import MicroCopyItem from "../components/language/MicroCopyItem";
function LanguagePage() {
  const [languages, setLanguages] = useState([
    { code: "en", name: "English" },
    { code: "te", name: "Telugu" },
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showModal, setShowModal] = useState(false);
  const [microCopies, setMicroCopies] = useState([
    { key: "", value: "" },
  ]);
  const handleChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const updated = [...microCopies];
    updated[index][field] = value;
    setMicroCopies(updated);
  };

  const handleAdd = () => {
    setMicroCopies([...microCopies, { key: "", value: "" }]);
  };

  const handleDelete = (index: number) => {
    const updated = microCopies.filter((_, i) => i !== index);
    setMicroCopies(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Header onAddLanguage={() => setShowModal(true)} />

      {/* Tabs */}
      <Tabs
        languages={languages}
        selectedLanguage={selectedLanguage}
        onSelect={setSelectedLanguage}
      />
      <h3>Micro Copies</h3>

      <button onClick={handleAdd}>+ Add</button>

      <div style={{ marginTop: "10px" }}>
        {microCopies.map((item, index) => (
          <MicroCopyItem
            key={index}
            item={item}
            index={index}
            onChange={handleChange}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Selected Language Display */}
      <div>
        <h3>Selected Language: {selectedLanguage}</h3>
      </div>
    </div>
  );
}

export default LanguagePage;