import { useEffect, useState } from "react";
import Header from "../components/language/Header";
import Tabs from "../components/language/Tabs";
import MicroCopyItem from "../components/language/MicroCopyItem";
import AddLanguageModal from "../components/language/AddLanguageModal";
import Button from "../components/Common/Button";
import "./LanguagePage.css";

type Language = {
  name: string;
  iana_code: string;
  iso_code: string;
  font_family: string;
  font_url: string;
};

type LanguageMap = Record<string, Language>;
type MicroCopyMap = Record<string, Record<string, string>>;

function LanguagePage() {
  const [languages, setLanguages] = useState<LanguageMap>({});
  const [microCopies, setMicroCopies] = useState<MicroCopyMap>({});
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const mockLanguages: LanguageMap = {
      English: {
        name: "English",
        iana_code: "en",
        iso_code: "en",
        font_family: "Noto Sans",
        font_url: "",
      },
      Tamil: {
        name: "Tamil",
        iana_code: "ta",
        iso_code: "ta",
        font_family: "Noto Sans Tamil",
        font_url: "",
      },
    };

    const mockKeys: MicroCopyMap = {
      WelcomeText: { English: "Welcome", Tamil: "வணக்கம்" },
      Continue: { English: "Continue", Tamil: "தொடரவும்" },
    };

    setLanguages(mockLanguages);
    setMicroCopies(mockKeys);
    setSelectedLanguage("English");
  };

  const handleAddKey = () => {
    const key = prompt("Enter key");
    if (!key) return;

    setMicroCopies((prev) => {
      const updated: MicroCopyMap = { ...prev };

      updated[key] = {};
      Object.keys(languages).forEach((lang) => {
        updated[key][lang] = "";
      });

      return updated;
    });
  };

  const handleValueChange = (key: string, value: string) => {
    setMicroCopies((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [selectedLanguage]: value,
      },
    }));
  };

  const handleDelete = (key: string) => {
    const updated = { ...microCopies };
    delete updated[key];
    setMicroCopies(updated);
  };

  const handleAddLanguage = (lang: Language) => {
    setLanguages((prev) => ({
      ...prev,
      [lang.name]: lang,
    }));

    setMicroCopies((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        updated[key][lang.name] = "";
      });
      return updated;
    });

    setSelectedLanguage(lang.name);
  };

  const handleExport = () => {
    const blob = new Blob(
      [JSON.stringify({ languages, microCopies }, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "languages.json";
    a.click();
  };

  const handleSave = () => {
    alert("Mock API Save");
  };

  const currentLanguage =
    languages[selectedLanguage] || Object.values(languages)[0];

  if (!currentLanguage) return null;

  return (
    <div className="page">
      <Header
        onAddLanguage={() => setShowModal(true)}
        onExport={handleExport}
        onSave={handleSave}
      />

      <Tabs
        languages={Object.values(languages)}
        selectedLanguage={selectedLanguage}
        onSelect={setSelectedLanguage}
      />

      <div className="top-bar">
        <Button onClick={handleAddKey}>+ Add Key</Button>

        <input
          placeholder="Search keys..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="details">
        <div
          className="details-toggle"
          onClick={() => setShowDetails(!showDetails)}
        >
          Language Details {showDetails ? "▲" : "▼"}
        </div>

        {showDetails && (
          <div className="details-box">
            <input value={currentLanguage.name} readOnly />
            <input value={currentLanguage.iana_code} readOnly />
            <input value={currentLanguage.iso_code} readOnly />
            <input value={currentLanguage.font_family} readOnly />
            <input value={currentLanguage.font_url} readOnly />
          </div>
        )}
      </div>

      <div className="list">
        {Object.entries(microCopies)
          .filter(([key]) =>
            key.toLowerCase().includes(search.toLowerCase())
          )
          .map(([key, langValues]) => {
            const values = langValues as Record<string, string>;

            return (
              <MicroCopyItem
                key={key}
                label={key}
                value={values[selectedLanguage] || ""}
                onChange={(val: string) => handleValueChange(key, val)}
                onDelete={() => handleDelete(key)}
              />
            );
          })}
      </div>

      {showModal && (
        <AddLanguageModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onCreate={handleAddLanguage}
        />
      )}
    </div>
  );
}

export default LanguagePage;