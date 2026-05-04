import { useState } from "react";
import Header from "../components/language/Header";
import Tabs from "../components/language/Tabs";
import AddLanguageModal from "../components/language/AddLanguageModal";

function LanguagePage() {
  const [languages, setLanguages] = useState<string[]>(["English"]);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [keys, setKeys] = useState<
    {
      key: string;
      values: { [lang: string]: string };
    }[]
  >([
    {
      key: "welcome",
      values: { English: "Hello" },
    },
  ]);

  const handleSaveLanguage = (newLang: string) => {
    setLanguages((prev) => [...prev, newLang]);

    setKeys((prev) =>
      prev.map((item) => ({
        ...item,
        values: {
          ...item.values,
          [newLang]: "",
        },
      })),
    );
  };

  const handleAddMicroCopy = () => {
    const newKey = prompt("Enter key name");
    if (!newKey) return;

    const values: { [lang: string]: string } = {};
    languages.forEach((lang) => {
      values[lang] = "";
    });

    setKeys((prev) => [
      ...prev,
      {
        key: newKey,
        values,
      },
    ]);
  };

  const updateValue = (keyName: string, value: string) => {
    setKeys((prev) =>
      prev.map((item) =>
        item.key === keyName
          ? {
              ...item,
              values: {
                ...item.values,
                [selectedLanguage]: value,
              },
            }
          : item,
      ),
    );
  };

  const filteredKeys = keys.filter((item) => {
    const keyMatch = item.key.toLowerCase().includes(search.toLowerCase());

    const valueMatch = item.values[selectedLanguage]
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return keyMatch || valueMatch;
  });

  return (
    <div>
      <Header
        onAddLanguage={() => setIsModalOpen(true)}
        onAddMicroCopy={handleAddMicroCopy}
      />

      <Tabs
        languages={languages}
        selected={selectedLanguage}
        onChange={setSelectedLanguage}
      />

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredKeys.map((item) => (
        <div key={item.key}>
          <strong>{item.key}</strong>
          <input
            type="text"
            value={item.values[selectedLanguage] || ""}
            onChange={(e) => updateValue(item.key, e.target.value)}
          />
        </div>
      ))}

      <AddLanguageModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLanguage}
      />
    </div>
  );
}

export default LanguagePage;
