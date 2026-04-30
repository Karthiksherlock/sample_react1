import { useState } from "react";
import Header from "../components/language/Header";

function LanguagePage() {
  const [languages, setLanguages] = useState<string[]>(["English"]);

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

  const handleAddLanguage = () => {
    const newLang = prompt("Enter language name");

    if (!newLang) return;

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

  // ➕ Add Micro-copy (KEY only)
  const handleAddMicroCopy = () => {
    const newKey = prompt("Enter key name");

    if (!newKey) return;

    // Create values for all languages
    const values: { [lang: string]: string } = {};

    languages.forEach((lang) => {
      values[lang] = "";
    });

    // Add new key
    setKeys((prev) => [
      ...prev,
      {
        key: newKey,
        values,
      },
    ]);
  };

  return (
    <div>
      {/* Header */}
      <Header
        onAddLanguage={handleAddLanguage}
        onAddMicroCopy={handleAddMicroCopy}
      />

      {/* Languages List */}
      <h2>Languages</h2>
      {languages.map((lang) => (
        <div key={lang}>{lang}</div>
      ))}

      {/* Keys + Values */}
      <h2>Micro-copies</h2>
      {keys.map((item) => (
        <div key={item.key}>
          <strong>{item.key}</strong>

          {languages.map((lang) => (
            <div key={lang}>
              {lang}: {item.values[lang]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default LanguagePage;
