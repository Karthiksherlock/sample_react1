import { useState, useEffect } from "react";
import Header from "../components/language/Header";
import Tabs from "../components/language/Tabs";
import AddLanguageModal from "../components/language/AddLanguageModal";
import AddMicroCopyModal from "../components/language/AddMicroCopyModal";
import MicroCopyItem from "../components/language/MicroCopyItem";

function LanguagePage() {
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [search, setSearch] = useState("");
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);

  const [keys, setKeys] = useState<
    {
      key: string;
      values: { [lang: string]: string };
    }[]
  >([]);

  useEffect(() => {
    fetch("/languages.json")
      .then((res) => res.json())
      .then((data) => {
        const langs = Object.keys(data);
        setLanguages(langs);
        setSelectedLanguage(langs[0]);

        const allKeys = new Set<string>();

        langs.forEach((lang) => {
          Object.keys(data[lang]).forEach((k) => {
            allKeys.add(k);
          });
        });

        const formatted = Array.from(allKeys).map((key) => {
          const values: any = {};

          langs.forEach((lang) => {
            values[lang] = data[lang][key] || "";
          });

          return { key, values };
        });

        setKeys(formatted);
      });
  }, []);

  const handleSaveLanguage = (newLang: string) => {
    const exists = languages.some(
      (l) => l.toLowerCase() === newLang.toLowerCase(),
    );
    if (exists) return;

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
    const exists = keys.some((item) => item.key === newKey);
    if (exists) return;

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

  const deleteMicroCopyValue = (keyName: string) => {
    setKeys((prev) =>
      prev.map((item) =>
        item.key === keyName
          ? {
              ...item,
              values: {
                ...item.values,
                [selectedLanguage]: "",
              },
            }
          : item,
      ),
    );
  };

  const convertToApiFormat = () => {
    const result: any = {};

    languages.forEach((lang) => {
      result[lang] = {};
    });

    keys.forEach((item) => {
      languages.forEach((lang) => {
        result[lang][item.key] = item.values[lang] || "";
      });
    });

    return result;
  };

  const handleSave = () => {
    const payload = convertToApiFormat();

    console.log("Saving to API:", payload);

    setTimeout(() => {
      alert("Saved successfully!");

      const data = payload;

      const langs = Object.keys(data);
      setLanguages(langs);
      setSelectedLanguage(langs[0]);

      const allKeys = new Set<string>();

      langs.forEach((lang) => {
        Object.keys(data[lang]).forEach((k) => {
          allKeys.add(k);
        });
      });

      const formatted = Array.from(allKeys).map((key) => {
        const values: any = {};

        langs.forEach((lang) => {
          values[lang] = data[lang][key] || "";
        });

        return { key, values };
      });

      setKeys(formatted);
    }, 500);
  };

  const s = search.trim().toLowerCase();

  const filteredKeys = keys.filter((item) => {
    const keyMatch = item.key.toLowerCase().includes(s);
    const valueMatch = item.values[selectedLanguage]?.toLowerCase().includes(s);
    return keyMatch || valueMatch;
  });

  return (
    <div>
      <Header
        onAddLanguage={() => setIsLangModalOpen(true)}
        onAddMicroCopy={() => setIsKeyModalOpen(true)}
        onSave={handleSave}
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
          onDelete={deleteMicroCopyValue}
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
