import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Header from "../components/language/Header";
import Tabs from "../components/language/Tabs";
import AddLanguageModal, {
  type NewLanguage,
} from "../components/language/AddLanguageModal";
import "../LanguagePage.css";
import AddMicroCopyModal from "../components/language/AddMicroCopyModal";
import MicroCopyItem from "../components/language/MicroCopyItem";

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
    axios
      .get<LanguagesData>("/languages.json")
      .then((response) => {
        const data = response.data;
        setLanguagesData(data);

        const langs = Object.keys(data);
        if (langs.length > 0) {
          setSelectedLanguage(langs[0]);
        }
      })
      .catch((error) => {
        console.log("Error fetching languages:", error);
      });
  }, []);

  const languages = Object.keys(languagesData);

  const microCopies = languagesData[selectedLanguage]?.micro_copies;

  const filteredMicroCopies = useMemo(() => {
    return Object.entries(microCopies || {}).filter(([key, value]) => {
      return (
        key.toLowerCase().includes(search.toLowerCase()) ||
        value.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [microCopies, search]);

  const handleValueChange = useCallback(
    (key: string, value: string) => {
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
    },
    [selectedLanguage],
  );

  const handleDeleteKey = useCallback(
    (keyToDelete: string) => {
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
    },
    [selectedLanguage],
  );

  const handleAddKey = useCallback(
    (newKey: string) => {
      if (!newKey.trim()) return;

      const exists = microCopies?.[newKey] !== undefined;

      if (exists) return;

      setLanguagesData((prev) => ({
        ...prev,

        [selectedLanguage]: {
          ...prev[selectedLanguage],

          micro_copies: {
            ...prev[selectedLanguage].micro_copies,

            [newKey]: "",
          },
        },
      }));
    },
    [microCopies, selectedLanguage],
  );
  const handleSave = () => {
    console.log("Saving:", languagesData);

    setTimeout(() => {
      alert("Saved successfully!");
    }, 500);
  };
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(languagesData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "languages.json";

    a.click();

    URL.revokeObjectURL(url);
  };

  const handleAddLanguage = (newLanguage: NewLanguage) => {
    if (!newLanguage.name.trim()) return;

    const exists = languagesData[newLanguage.name] !== undefined;

    if (exists) return;

    setLanguagesData((prev) => ({
      ...prev,

      [newLanguage.name]: {
        ...newLanguage,

        micro_copies: {},
      },
    }));

    setSelectedLanguage(newLanguage.name);
  };
  return (
    <div className="page">
      <Header
        onAddLanguage={() => setShowLanguageModal(true)}
        onSave={handleSave}
        onExport={handleExport}
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
              <MicroCopyItem
                key={key}
                microCopyKey={key}
                value={value}
                onChange={handleValueChange}
                onDelete={handleDeleteKey}
              />
            ))}
          </div>
        </div>
      </div>

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
