import { useEffect, useState } from "react";
import Header from "../components/language/Header";
import Tabs from "../components/language/Tabs";
import AddLanguageModal from "../components/language/AddLanguageModal";
import AddMicroCopyModal from "../components/language/AddMicroCopyModal";
import "../LanguagePage.css";

type Language = {
  name: string;
  iana_code: string;
  iso_code: string;
  font_family: string;
  font_url: string;
  micro_copies: {
    [key: string]: string;
  };
};

type LanguagesData = {
  [language: string]: Language;
};

function LanguagePage() {
  const [languagesData, setLanguagesData] = useState<LanguagesData>({});

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [search, setSearch] = useState("");

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);

  useEffect(() => {
    fetch("/languages.json")
      .then((res) => res.json())
      .then((data: LanguagesData) => {
        setLanguagesData(data);

        const langs = Object.keys(data);

        if (langs.length > 0) {
          setSelectedLanguage(langs[0]);
        }
      });
  }, []);

  const languages = Object.keys(languagesData);

  const microCopies = languagesData[selectedLanguage]?.micro_copies || {};

  const filteredMicroCopies = Object.entries(microCopies).filter(
    ([key, value]) => {
      return (
        key.toLowerCase().includes(search.toLowerCase()) ||
        value.toLowerCase().includes(search.toLowerCase())
      );
    },
  );

  const handleValueChange = (key: string, value: string) => {
    setLanguagesData((prev) => ({
      ...prev,

      [selectedLanguage]: {
        ...prev[selectedLanguage],

        micro_copies: {
          ...prev[selectedLanguage].micro_copies,

          [key]: value,
        },
      },
    }));
  };

  const handleDeleteKey = (keyToDelete: string) => {
    setLanguagesData((prev) => {
      const updatedMicroCopies = {
        ...prev[selectedLanguage].micro_copies,
      };

      delete updatedMicroCopies[keyToDelete];

      return {
        ...prev,

        [selectedLanguage]: {
          ...prev[selectedLanguage],

          micro_copies: updatedMicroCopies,
        },
      };
    });
  };

  return (
    <div className="page">
      <Header
        onAddLanguage={() => setShowLanguageModal(true)}
        onSave={() => {}}
        onExport={() => {}}
      />

      <Tabs
        languages={languages}
        selectedLanguage={selectedLanguage}
        onSelect={setSelectedLanguage}
      />

      <div className="main">
        <div className="languagebox">
          <p>Language details</p>
        </div>

        <div className="microcopybox">
          <div className="microcopyheader">
            <h3>Micro-copies</h3>

            <div className="microcopyactions">
              <input
                type="text"
                placeholder="🔍 Search keys or values..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button onClick={() => setShowKeyModal(true)}>
                + Add micro-copy
              </button>
            </div>
          </div>

          <div className="list">
            {filteredMicroCopies.map(([key, value]) => (
              <div key={key} className="micro-item">
                <div className="micro-key">{key}</div>

                <input
                  className="micro-input"
                  value={value}
                  onChange={(e) => handleValueChange(key, e.target.value)}
                />

                <button
                  className="deletebtn"
                  onClick={() => handleDeleteKey(key)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddLanguageModal
        open={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        onSave={() => {}}
      />

      <AddMicroCopyModal
        open={showKeyModal}
        onClose={() => setShowKeyModal(false)}
        onSave={() => {}}
      />
    </div>
  );
}

export default LanguagePage;
