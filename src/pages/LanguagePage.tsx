import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Plus, Search } from "lucide-react";
import Header from "../components/language/Header";
import Tabs from "../components/language/Tabs";
import MicroCopyItem from "../components/language/MicroCopyItem";
import AddLanguageModal from "../components/language/AddLanguageModal";
import type { NewLanguage } from "../components/language/AddLanguageModal";
import Button from "../components/Common/Button";
import "./LanguagePage.css";

export interface Language {
  name: string;
  iana: string;
  iso: string;
  fontFamily?: string;
  fontUrl?: string;
  values: Record<string, string>;
}
export interface LanguagesFile {
  languages: Language[];
}

async function fetchLanguages(): Promise<LanguagesFile> {
  const res = await fetch("/languages.json");
  return res.json();
}

async function saveLanguages(data: LanguagesFile): Promise<LanguagesFile> {
  console.log("Saving languages:", data);
  return data;
}

export default function LanguagePage() {
  const [data, setData] = useState<LanguagesFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeIana, setActiveIana] = useState<string>("");
  const [search, setSearch] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false); // collapsed by default
  const [modalOpen, setModalOpen] = useState(false);

  // Initial load
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const json = await fetchLanguages();
        setData(json);
        setActiveIana(json.languages[0]?.iana ?? "");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const activeLang = useMemo(
    () => data?.languages.find((l) => l.iana === activeIana) ?? null,
    [data, activeIana]
  );

  // All keys are global across languages — derive from union of every language's keys.
  const allKeys = useMemo(() => {
    if (!data) return [];
    const set = new Set<string>();
    data.languages.forEach((l) => Object.keys(l.values).forEach((k) => set.add(k)));
    return Array.from(set);
  }, [data]);

  const filteredKeys = useMemo(() => {
    if (!activeLang) return [];
    const q = search.trim().toLowerCase();
    if (!q) return allKeys;
    return allKeys.filter((k) => {
      const v = activeLang.values[k] ?? "";
      return k.toLowerCase().includes(q) || v.toLowerCase().includes(q);
    });
  }, [allKeys, activeLang, search]);

  // Mutations
  const updateLang = (iana: string, patch: Partial<Language>) => {
    setData((d) => {
      if (!d) return d;
      return {
        ...d,
        languages: d.languages.map((l) => (l.iana === iana ? { ...l, ...patch } : l)),
      };
    });
  };

  const setValue = (iana: string, key: string, value: string) => {
    setData((d) => {
      if (!d) return d;
      return {
        ...d,
        languages: d.languages.map((l) =>
          l.iana === iana ? { ...l, values: { ...l.values, [key]: value } } : l
        ),
      };
    });
  };

  const addKeyGlobally = () => {
    const raw = window.prompt("Enter a new micro-copy key (e.g. GeneralSubmit):");
    if (!raw) return;
    const key = raw.trim();
    if (!key) return;
    if (allKeys.includes(key)) {
      alert(`Key "${key}" already exists.`);
      return;
    }
    setData((d) => {
      if (!d) return d;
      return {
        ...d,
        languages: d.languages.map((l) => ({
          ...l,
          values: { ...l.values, [key]: "" }, // create across ALL languages, empty value
        })),
      };
    });
  };

  const deleteKeyGlobally = (key: string) => {
    if (!window.confirm(`Delete key "${key}" from ALL languages?`)) return;
    setData((d) => {
      if (!d) return d;
      return {
        ...d,
        languages: d.languages.map((l) => {
          const next = { ...l.values };
          delete next[key];
          return { ...l, values: next };
        }),
      };
    });
  };

  const addLanguage = (lang: NewLanguage) => {
    setData((d) => {
      if (!d) return d;
      if (d.languages.some((l) => l.iana === lang.iana)) {
        alert(`A language with IANA "${lang.iana}" already exists.`);
        return d;
      }
      // New language inherits the global key set with empty values.
      const values: Record<string, string> = {};
      allKeys.forEach((k) => (values[k] = ""));
      const next: LanguagesFile = {
        ...d,
        languages: [...d.languages, { ...lang, values }],
      };
      setActiveIana(lang.iana);
      return next;
    });
  };

  const handleExport = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "languages.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const updated = await saveLanguages(data);
      setData(updated); // sync UI with API response
      if (!updated.languages.some((l) => l.iana === activeIana)) {
        setActiveIana(updated.languages[0]?.iana ?? "");
      }
    } catch (err) {
      console.error(err);
      alert((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="lp-loading">Loading languages…</div>;
  }
  if (!data || !activeLang) {
    return <div className="lp-loading">No languages found.</div>;
  }

  const tabs = data.languages.map((l) => ({
    iana: l.iana,
    name: l.name,
    count: Object.keys(l.values).length,
  }));

  return (
    <div className="lp">
      <div className="lp__container">
        <Header
          onExport={handleExport}
          onSave={handleSave}
          onAddLanguage={() => setModalOpen(true)}
          saving={saving}
        />

        {/* Tabs row + Add Micro-copy button at top */}
        <div className="lp-tabsbar">
          <Tabs tabs={tabs} activeIana={activeIana} onChange={setActiveIana} />
          <Button variant="primary" icon={<Plus size={16} />} onClick={addKeyGlobally}>
            Add micro-copy
          </Button>
        </div>

        {/* Collapsible language details */}
        <section className="lp-card">
          <button
            type="button"
            className="lp-card__head lp-card__head--toggle"
            onClick={() => setDetailsOpen((v) => !v)}
            aria-expanded={detailsOpen}
          >
            <span className="lp-card__title">Language details</span>
            <ChevronDown
              size={20}
              style={{
                transform: detailsOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 150ms ease",
              }}
            />
          </button>

          {detailsOpen && (
            <div className="lp-card__body">
              <div className="field">
                <label>Name</label>
                <input
                  value={activeLang.name}
                  onChange={(e) => updateLang(activeLang.iana, { name: e.target.value })}
                />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>IANA code</label>
                  <input
                    value={activeLang.iana}
                    onChange={(e) => {
                      const newIana = e.target.value;
                      updateLang(activeLang.iana, { iana: newIana });
                      setActiveIana(newIana);
                    }}
                  />
                </div>
                <div className="field">
                  <label>ISO code</label>
                  <input
                    value={activeLang.iso}
                    onChange={(e) => updateLang(activeLang.iana, { iso: e.target.value })}
                  />
                </div>
              </div>
              <div className="field">
                <label>Font family</label>
                <input
                  value={activeLang.fontFamily ?? ""}
                  onChange={(e) => updateLang(activeLang.iana, { fontFamily: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Font URL</label>
                <input
                  value={activeLang.fontUrl ?? ""}
                  onChange={(e) => updateLang(activeLang.iana, { fontUrl: e.target.value })}
                />
              </div>
            </div>
          )}
        </section>

        {/* Micro-copies */}
        <section className="lp-card">
          <div className="lp-card__head">
            <div className="lp-card__title">
              Micro-copies <span className="lp-card__badge">{filteredKeys.length} keys</span>
            </div>
            <div className="lp-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search keys or values…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="lp-card__body lp-card__body--list">
            {filteredKeys.length === 0 ? (
              <div className="lp-empty">
                No keys match your search. Use <strong>Add micro-copy</strong> at the top to create one.
              </div>
            ) : (
              filteredKeys.map((key) => (
                <MicroCopyItem
                  key={key}
                  keyName={key}
                  value={activeLang.values[key] ?? ""}
                  onValueChange={(v) => setValue(activeLang.iana, key, v)}
                  onDelete={() => deleteKeyGlobally(key)}
                />
              ))
            )}
          </div>
        </section>
      </div>

      <AddLanguageModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={addLanguage}
      />
    </div>
  );
}
