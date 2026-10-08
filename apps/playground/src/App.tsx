import { useState } from "react";
import {
  Button,
  EasyUIProvider,
  getAccentPalette,
  isHexColor,
  type EasyUIRadius,
  type EasyUITheme,
} from "@easyui/react";

type Preset = { id: string; label: string; accent: string | undefined };

const PRESETS: Preset[] = [
  { id: "ink", label: "Ink", accent: undefined },
  { id: "blue", label: "Blue", accent: "#2563eb" },
  { id: "violet", label: "Violet", accent: "#7c3aed" },
  { id: "emerald", label: "Emerald", accent: "#059669" },
  { id: "amber", label: "Amber", accent: "#d97706" },
  { id: "rose", label: "Rose", accent: "#e11d48" },
];

const RADII: EasyUIRadius[] = ["none", "sm", "md", "lg", "full"];

const FONTS = {
  geist: { label: "Geist", value: undefined },
  system: { label: "System", value: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" },
} as const;

type FontKey = keyof typeof FONTS;

export function App() {
  const [accent, setAccent] = useState<string | undefined>(undefined);
  const [draft, setDraft] = useState("#171717"); // starts on the default ink accent
  const [radius, setRadius] = useState<EasyUIRadius>("md");
  const [font, setFont] = useState<FontKey>("geist");
  const [theme, setTheme] = useState<EasyUITheme>("light");

  const palette = accent ? getAccentPalette(accent) : null;
  const passes = palette ? palette.contrast >= 4.5 : true;

  function applyDraft(value: string) {
    setDraft(value);
    if (isHexColor(value)) setAccent(value);
  }

  return (
    <EasyUIProvider
      className="page"
      accent={accent}
      radius={radius}
      fontFamily={FONTS[font].value}
      theme={theme}
    >
      <header className="page__header">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__name">easyui</span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "Dark mode" : "Light mode"}
        </Button>
      </header>

      <main className="page__main">
        <section className="intro">
          <p className="eyebrow">Playground</p>
          <h1 className="title">Pick a brand color. Everything follows.</h1>
          <p className="lede">
            Change the accent, radius, or font below. Each component reads these from the theme, so
            nothing needs to be edited to rebrand.
          </p>
        </section>

        <div className="layout">
          <aside className="panel" aria-label="Theme controls">
            <fieldset className="field">
              <legend className="field__label">Accent</legend>
              <div className="swatches">
                {PRESETS.map((p) => {
                  const active = accent === p.accent;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      className="swatch"
                      aria-pressed={active}
                      aria-label={`${p.label} accent`}
                      title={p.label}
                      data-active={active || undefined}
                      style={{ background: p.accent ?? "var(--eui-color-fg)" }}
                      onClick={() => {
                        setAccent(p.accent);
                        setDraft(p.accent ?? "#171717");
                      }}
                    />
                  );
                })}
              </div>
              <div className="color-input">
                <input
                  type="color"
                  aria-label="Custom accent color"
                  value={isHexColor(draft) ? normalize(draft) : "#2563eb"}
                  onChange={(e) => applyDraft(e.target.value)}
                />
                <input
                  type="text"
                  aria-label="Accent hex value"
                  aria-invalid={!isHexColor(draft) || undefined}
                  value={draft}
                  spellCheck={false}
                  onChange={(e) => applyDraft(e.target.value)}
                />
              </div>
              <p className={passes ? "hint" : "hint hint--warn"} aria-live="polite">
                {palette
                  ? `Text on accent: ${palette.accentForeground} · contrast ${palette.contrast.toFixed(
                      1,
                    )}:1${passes ? "" : " (below AA)"}`
                  : "Default ink. Enter a hex value or choose a preset."}
              </p>
            </fieldset>

            <fieldset className="field">
              <legend className="field__label">Corner radius</legend>
              <div className="segmented" role="radiogroup" aria-label="Corner radius">
                {RADII.map((r) => (
                  <button
                    key={r}
                    type="button"
                    role="radio"
                    aria-checked={radius === r}
                    className="segmented__item"
                    onClick={() => setRadius(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="field">
              <legend className="field__label">Font</legend>
              <div className="segmented" role="radiogroup" aria-label="Font">
                {(Object.keys(FONTS) as FontKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={font === key}
                    className="segmented__item"
                    onClick={() => setFont(key)}
                  >
                    {FONTS[key].label}
                  </button>
                ))}
              </div>
            </fieldset>
          </aside>

          <div className="preview">
            <section className="card" aria-labelledby="buttons-heading">
              <h2 id="buttons-heading" className="card__title">
                Buttons
              </h2>

              <div className="row">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Delete</Button>
              </div>

              <div className="row">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>

              <div className="row">
                <Button loading>Saving</Button>
                <Button disabled>Disabled</Button>
              </div>
            </section>

            <section className="card" aria-labelledby="sample-heading">
              <p className="eyebrow">Team</p>
              <h2 id="sample-heading" className="card__title card__title--lg">
                Invite Maya to the Ledger workspace
              </h2>
              <p className="muted">
                She'll get editor access to 3 projects. You can change her role after she joins.
              </p>
              <div className="row row--end">
                <Button variant="ghost">Cancel</Button>
                <Button variant="secondary">Copy link</Button>
                <Button>Send invite</Button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </EasyUIProvider>
  );
}

function normalize(hex: string): string {
  const v = hex.replace(/^#/, "");
  return "#" + (v.length === 3 ? v.split("").map((c) => c + c).join("") : v).toLowerCase();
}
