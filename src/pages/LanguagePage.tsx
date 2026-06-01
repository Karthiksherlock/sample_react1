import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Header from "../components/language/Header";
import Tabs from "../components/language/Tabs";
import AddLanguageModal, {
  type NewLanguage,
} from "../components/language/AddLanguageModal";
import "../App.css";
import AddMicroCopyModal from "../components/language/AddMicroCopyModal";
import MicroCopyItem from "../components/language/MicroCopyItem";
import { Search, ChevronDown } from "lucide-react";

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
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showLanguageDetails, setShowLanguageDetails] = useState(false);

  const languages = Object.keys(languagesData);
  const microCopies = languagesData[selectedLanguage]?.micro_copies;
  const selectedLanguageData = languagesData[selectedLanguage];
  const totalKeys = Object.keys(microCopies || {}).length;

  const filteredMicroCopies = useMemo(() => {
    return Object.entries(microCopies || {}).filter(([key, value]) => {
      return (
        key.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        value.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    });
  }, [microCopies, debouncedSearch]);

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

  const handleDeleteMicroCopyKey = useCallback((keyToDelete: string) => {
    setLanguagesData((prev) => {
      const updatedLanguages = {
        ...prev,
      };
      Object.keys(updatedLanguages).forEach((language) => {
        const updatedMicroCopies = {
          ...updatedLanguages[language].micro_copies,
        };
        delete updatedMicroCopies[keyToDelete];

        updatedLanguages[language] = {
          ...updatedLanguages[language],

          micro_copies: updatedMicroCopies,
        };
      });
      return updatedLanguages;
    });
  }, []);

  const handleAddMicroCopyKey = useCallback(
    (data: {
      key: string;
      value: {
        [language: string]: string;
      };
    }) => {
      const newKey = data.key;
      if (!newKey.trim()) return;

      const exists = microCopies?.[newKey] !== undefined;

      if (exists) return;

      setLanguagesData((prev) => {
        const updatedLanguages = {
          ...prev,
        };

        Object.keys(updatedLanguages).forEach((language) => {
          updatedLanguages[language] = {
            ...updatedLanguages[language],

            micro_copies: {
              ...updatedLanguages[language].micro_copies,

              [newKey]: data.value[language] || "",
            },
          };
        });
        return updatedLanguages;
      });
    },
    [microCopies],
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
    if (!newLanguage.iana_code.trim()) return;
    if (!newLanguage.iso_code.trim()) return;

    const exists = languagesData[newLanguage.name] !== undefined;

    if (exists) return;
    const firstLanguage = Object.keys(languagesData)[0];

    const existingKeys = languagesData[firstLanguage]?.micro_copies || {};

    const emptyMicroCopies = Object.keys(existingKeys).reduce(
      (acc, key) => {
        acc[key] = "";
        return acc;
      },
      {} as {
        [key: string]: string;
      },
    );

    setLanguagesData((prev) => ({
      ...prev,

      [newLanguage.name]: {
        ...newLanguage,

        micro_copies: emptyMicroCopies,
      },
    }));

    setSelectedLanguage(newLanguage.name);
  };
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get<LanguagesData>("/languages.json");
        const data = response.data;
        setLanguagesData(data);
        const langs = Object.keys(data);
        if (langs.length > 0) {
          setSelectedLanguage(langs[0]);
        }
      } catch (error) {
        console.log("Error fetching languages:", error);
      }
    };
    fetchLanguages();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 2000);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="page">
      <Header
        onAddLanguage={() => setShowLanguageModal(true)}
        onSave={handleSave}
        onExport={handleExport}
      />

      <div className="tabsHeader">
        <Tabs
          languages={languages}
          languagesData={languagesData}
          selectedLanguage={selectedLanguage}
          onSelect={setSelectedLanguage}
        />

        <button
          className="addMicroCopyTopButton"
          onClick={() => setShowKeyModal(true)}
        >
          + Add Micro-copy
        </button>
      </div>

      <div className="main">
        <div className="languagebox">
          <div
            className="languageheader"
            onClick={() => setShowLanguageDetails(!showLanguageDetails)}
          >
            <h3>Language details</h3>
            <ChevronDown
              size={20}
              className={showLanguageDetails ? "chevronOpen" : "chevronClosed"}
            />
          </div>

          {showLanguageDetails && (
            <div className="languagedetails">
              {[
                ["Name", "name"],
                ["IANA Code", "iana_code"],
                ["ISO Code", "iso_code"],
                ["Font Family", "font_family"],
                ["Font URL", "font_url"],
              ].map(([label, key]) => (
                <div className="detailitem" key={key}>
                  <label>{label}</label>
                  <p>
                    {String(
                      selectedLanguageData?.[key as keyof Language] || "",
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="microcopybox">
          <div className="microcopyheader">
            <div className="microcopyTitle">
              <h3>Micro-copies</h3>
              <span className="keyBadge">{totalKeys} keys</span>
            </div>
            <div className="microcopyactions">
              <div className="searchBox">
                <Search size={18} className="searchIcon" />

                <input
                  type="text"
                  placeholder="     Search keys or values..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="list">
            {filteredMicroCopies.map(([key, value]) => (
              <MicroCopyItem
                key={key}
                microCopyKey={key}
                value={value}
                onChange={handleValueChange}
                onDelete={handleDeleteMicroCopyKey}
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
        onSave={handleAddMicroCopyKey}
        languages={languages}
      />
    </div>
  );
}

export default LanguagePage;
