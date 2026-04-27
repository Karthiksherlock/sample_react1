import { Globe } from "lucide-react";

export interface TabItem {
  iana: string;
  name: string;
  count: number;
}

interface TabsProps {
  tabs: TabItem[];
  activeIana: string;
  onChange: (iana: string) => void;
}

export default function Tabs({ tabs, activeIana, onChange }: TabsProps) {
  return (
    <div className="lp-tabs" role="tablist">
      {tabs.map((t) => {
        const active = t.iana === activeIana;
        return (
          <button
            key={t.iana}
            role="tab"
            aria-selected={active}
            className={`lp-tab ${active ? "lp-tab--active" : ""}`}
            onClick={() => onChange(t.iana)}
          >
            <Globe size={16} />
            <span>{t.name}</span>
            <span className="lp-tab__badge">{t.count}</span>
          </button>
        );
      })}
    </div>
  );
}
