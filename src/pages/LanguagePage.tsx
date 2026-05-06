import { useEffect, useState } from "react";
import Header from "../components/language/Header";
import Tabs from "../components/language/Tabs";
import MicroCopyItem from "../components/language/MicroCopyItem";
import AddLanguageModal from "../components/language/AddLanguageModal";
import AddMicroCopyModal from "../components/language/AddMicroCopyModal";

function LanguagePage() {
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [keys, setKeys] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);

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

  const handleValueChange = (key: string, value: string) => {
    setKeys((prev) =>
      prev.map((item) =>
        item.key === key
          ? {
              ...item,
              values: {
                ...item.values,
                [selectedLanguage]: value,
              },
            }
          : item
      )
    );
  };

  const handleAddKey = (newKey: string) => {
    const exists = keys.some((k) => k.key === newKey);
    if (exists) return;

    const newItem: any = { key: newKey, values: {} };

    languages.forEach((lang) => {
      newItem.values[lang] = "";
    });

    setKeys((prev) => [...prev, newItem]);
  };

  const handleDeleteKey = (key: string) => {
    setKeys((prev) => prev.filter((item) => item.key !== key));
  };

  const handleAddLanguage = (newLang: string) => {
    const exists = languages.includes(newLang);
    if (exists) return;

    setLanguages((prev) => [...prev, newLang]);

    setKeys((prev) =>
      prev.map((item) => ({
        ...item,
        values: {
          ...item.values,
          [newLang]: "",
        },
      }))
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

  const handleExport = () => {
    const data = convertToApiFormat();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "languages.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const filteredKeys = keys.filter((item) => {
    const value = item.values[selectedLanguage] || "";
    return (
      item.key.toLowerCase().includes(search.toLowerCase()) ||
      value.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div>
      <Header
        onAddLanguage={() => setShowLanguageModal(true)}
        onAddMicroCopy={() => setShowKeyModal(true)}
        onSave={handleSave}
        onExport={handleExport}
      />

      <Tabs
        languages={languages}
        selectedLanguage={selectedLanguage}
        onSelect={setSelectedLanguage}
      />

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => setShowKeyModal(true)}>
        Add micro-copy
      </button>

      {filteredKeys.map((item) => (
        <MicroCopyItem
          key={item.key}
          item={item}
          selectedLanguage={selectedLanguage}
          onChange={handleValueChange}
          onDelete={handleDeleteKey}
        />
      ))}

      <AddLanguageModal
        open={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        onSave={handleAddLanguage}
      />

      <AddMicroCopyModal
        open={showKeyModal}
        onClose={() => setShowKeyModal(false)}
        onSave={handleAddKey}
      />
    </div>
  );
}

export default LanguagePage;