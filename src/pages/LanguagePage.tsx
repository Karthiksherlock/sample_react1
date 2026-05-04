import { useState } from "react";
import Header from "../components/language/Header";
import Tabs from "../components/language/Tabs";
import AddLanguageModal from "../components/language/AddLanguageModal.tsx";
import AddMicroCopyModal from "../components/language/AddMicroCopyModal.tsx";
import MicroCopyItem from "../components/language/MicroCopyItem.tsx";

function LanguagePage() {
  const [languages, setLanguages] = useState<string[]>(["English"]);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [search, setSearch] = useState("");
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);

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
    if (languages.includes(newLang)) return;

    setLanguages((prev) => [...prev, newLang]);
    setSelectedLanguage(newLang);

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

  const handleSaveMicroCopy = (newKey: string) => {
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

  const updateMicroCopyValue = (keyName: string, value: string) => {
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
    const s = search.trim().toLowerCase();

    const keyMatch = item.key.toLowerCase().includes(s);
    const valueMatch = item.values[selectedLanguage]?.toLowerCase().includes(s);

    return keyMatch || valueMatch;
  });

  return (
    <div>
      <Header
        onAddLanguage={() => setIsLangModalOpen(true)}
        onAddMicroCopy={() => setIsKeyModalOpen(true)}
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

      {filteredKeys.length === 0 && <p>No results</p>}

      {filteredKeys.map((item) => (
        <MicroCopyItem
          key={item.key}
          item={item}
          selectedLanguage={selectedLanguage}
          onChange={updateMicroCopyValue}
        />
      ))}

      <AddLanguageModal
        open={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        onSave={handleSaveLanguage}
      />

      <AddMicroCopyModal
        open={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onSave={handleSaveMicroCopy}
      />
    </div>
  );
}

export default LanguagePage;
