import { useState } from "react";
import { CodePreview } from "../../components/CodePreview";
import { PropsTable } from "../../components/PropsTable";
import { DocsBadge } from "../../components/DocsBadge";
import { COMPONENTS } from "../../data/components";

/* ─── Inline primitives (matching lib patterns) ─────────────────────────────── */
const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(" ");

const Btn = ({ variant = "primary", size = "md", shape = "default", isLoading = false, label, leftIcon, rightIcon, fullWidth = false, className = "", disabled = false, onClick }: any) => {
  const v: Record<string, string> = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus-visible:ring-blue-500",
    secondary: "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
    outline: "bg-transparent border border-blue-500 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950",
    danger: "bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:border-red-800 dark:text-red-400",
    "danger-solid": "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    link: "bg-transparent text-blue-600 hover:underline px-0 dark:text-blue-400",
  };
  const s: Record<string, string> = { xs: "h-7 px-2.5 text-xs gap-1 rounded-md", sm: "h-8 px-3 text-sm gap-1.5 rounded-md", md: "h-9 px-4 text-sm gap-2 rounded-lg", lg: "h-11 px-5 text-base gap-2 rounded-lg", xl: "h-12 px-6 text-base gap-2.5 rounded-xl" };
  const shapes: Record<string, string> = { default: "", pill: "!rounded-full", icon: "!px-0 !w-9 !h-9 !rounded-lg" };
  return (
    <button disabled={disabled || isLoading} onClick={onClick}
      className={cn("inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed", v[variant], s[size], shapes[shape], fullWidth && "w-full", className)}>
      {isLoading && <svg className="animate-spin w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" className="opacity-25"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"/></svg>}
      {leftIcon && <span>{leftIcon}</span>}
      {!isLoading && label}
      {isLoading && !label && null}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

/* ─── Page template ──────────────────────────────────────────────────────────── */
const PageHeader = ({ slug, children }: { slug: string; children?: React.ReactNode }) => {
  const meta = COMPONENTS.find(c => c.slug === slug)!;
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{meta.name}</h1>
        <DocsBadge status={meta.status} />
      </div>
      <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl">{meta.description}</p>
      {children}
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">{title}</h2>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   BUTTON
═══════════════════════════════════════════════════════════════════════════════ */
export const ButtonPage = () => {
  const [loading, setLoading] = useState(false);
  const meta = COMPONENTS.find(c => c.slug === "button")!;
  return (
    <div>
      <PageHeader slug="button" />
      <Section title="Variants">
        <CodePreview
          preview={
            <div className="flex flex-wrap gap-3">
              {(["primary","secondary","ghost","outline","danger","danger-solid","success","link"] as const).map(v => (
                <Btn key={v} variant={v} label={v.charAt(0).toUpperCase()+v.slice(1)} />
              ))}
            </div>
          }
          code={`import { Button } from "@aryanjain/ui";\n\n<Button variant="primary" label="Primary" />\n<Button variant="secondary" label="Secondary" />\n<Button variant="ghost" label="Ghost" />\n<Button variant="outline" label="Outline" />\n<Button variant="danger" label="Danger" />\n<Button variant="success" label="Success" />`}
        />
      </Section>
      <Section title="Sizes">
        <CodePreview
          preview={
            <div className="flex flex-wrap items-center gap-3">
              {(["xs","sm","md","lg","xl"] as const).map(s => (
                <Btn key={s} size={s} label={s.toUpperCase()} />
              ))}
            </div>
          }
          code={`<Button size="xs" label="XS" />\n<Button size="sm" label="SM" />\n<Button size="md" label="MD" />\n<Button size="lg" label="LG" />\n<Button size="xl" label="XL" />`}
        />
      </Section>
      <Section title="Shapes">
        <CodePreview
          preview={
            <div className="flex flex-wrap items-center gap-3">
              <Btn label="Default" />
              <Btn shape="pill" label="Pill" />
              <Btn shape="icon" label="★" />
            </div>
          }
          code={`<Button shape="default" label="Default" />\n<Button shape="pill" label="Pill" />\n<Button shape="icon" label="★" />`}
        />
      </Section>
      <Section title="Loading State">
        <CodePreview
          preview={
            <div className="flex flex-wrap gap-3">
              <Btn isLoading label="Saving…" />
              <Btn variant="secondary" isLoading label="Processing…" />
              <Btn
                label={loading ? undefined : "Click to Load"}
                isLoading={loading}
                onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
              />
            </div>
          }
          code={`<Button isLoading label="Saving…" />\n<Button variant="secondary" isLoading label="Processing…" />`}
        />
      </Section>
      <Section title="Icons">
        <CodePreview
          preview={
            <div className="flex flex-wrap gap-3">
              <Btn label="Download" leftIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>} />
              <Btn variant="outline" label="Next" rightIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>} />
              <Btn variant="success" label="Full Width" fullWidth />
            </div>
          }
          code={`<Button label="Download" leftIcon={<DownloadIcon />} />\n<Button variant="outline" label="Next" rightIcon={<ArrowIcon />} />\n<Button fullWidth label="Full Width" />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   BADGE
═══════════════════════════════════════════════════════════════════════════════ */
const BadgeComp = ({ variant = "default", size = "sm", dot = false, children }: any) => {
  const v: Record<string, string> = {
    default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    primary: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
    success: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
    warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
    danger:  "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  };
  const dotC: Record<string, string> = { default: "bg-gray-400", primary: "bg-blue-500", success: "bg-green-500", warning: "bg-yellow-500", danger: "bg-red-500" };
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-medium rounded-full", v[variant], size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1")}>
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full", dotC[variant])} />}
      {children}
    </span>
  );
};

export const BadgePage = () => {
  const meta = COMPONENTS.find(c => c.slug === "badge")!;
  return (
    <div>
      <PageHeader slug="badge" />
      <Section title="Variants">
        <CodePreview
          preview={<div className="flex flex-wrap gap-2">{(["default","primary","success","warning","danger"] as const).map(v => <BadgeComp key={v} variant={v}>{v.charAt(0).toUpperCase()+v.slice(1)}</BadgeComp>)}</div>}
          code={`<Badge variant="default">Default</Badge>\n<Badge variant="primary">Primary</Badge>\n<Badge variant="success">Success</Badge>\n<Badge variant="warning">Warning</Badge>\n<Badge variant="danger">Danger</Badge>`}
        />
      </Section>
      <Section title="With Dot">
        <CodePreview
          preview={<div className="flex flex-wrap gap-2">{(["default","primary","success","warning","danger"] as const).map(v => <BadgeComp key={v} variant={v} dot>{v.charAt(0).toUpperCase()+v.slice(1)}</BadgeComp>)}</div>}
          code={`<Badge variant="success" dot>Active</Badge>\n<Badge variant="danger" dot>Error</Badge>`}
        />
      </Section>
      <Section title="Sizes">
        <CodePreview
          preview={<div className="flex items-center gap-3"><BadgeComp size="sm">Small</BadgeComp><BadgeComp size="md">Medium</BadgeComp></div>}
          code={`<Badge size="sm">Small</Badge>\n<Badge size="md">Medium</Badge>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   INPUT
═══════════════════════════════════════════════════════════════════════════════ */
const InputComp = ({ label, hint, error, size = "md", placeholder, leftIcon, rightIcon, type = "text", disabled = false }: any) => {
  const sz: Record<string, string> = { sm: "h-8 px-3 text-sm", md: "h-10 px-3 text-sm", lg: "h-12 px-4 text-base" };
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <div className="relative">
        {leftIcon && <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">{leftIcon}</span>}
        <input type={type} disabled={disabled} placeholder={placeholder}
          className={cn("w-full rounded-lg border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50", sz[size], leftIcon && "pl-9", rightIcon && "pr-9", error ? "border-red-500" : "border-gray-300 dark:border-gray-600")} />
        {rightIcon && <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 pointer-events-none">{rightIcon}</span>}
      </div>
      {hint && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export const InputPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "input")!;
  return (
    <div>
      <PageHeader slug="input" />
      <Section title="Basic">
        <CodePreview
          preview={<div className="max-w-sm"><InputComp label="Email address" placeholder="you@example.com" hint="We'll never share your email." /></div>}
          code={`<Input label="Email address" placeholder="you@example.com" hint="We'll never share your email." />`}
        />
      </Section>
      <Section title="Error State">
        <CodePreview
          preview={<div className="max-w-sm"><InputComp label="Password" type="password" error="Password must be at least 8 characters." /></div>}
          code={`<Input label="Password" type="password" error="Password must be at least 8 characters." />`}
        />
      </Section>
      <Section title="With Icons">
        <CodePreview
          preview={
            <div className="max-w-sm space-y-3">
              <InputComp label="Search" placeholder="Search…" leftIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z"/></svg>} />
              <InputComp label="Website" placeholder="https://" rightIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>} />
            </div>
          }
          code={`<Input label="Search" placeholder="Search…" leftIcon={<SearchIcon />} />\n<Input label="Website" placeholder="https://" rightIcon={<ExternalLinkIcon />} />`}
        />
      </Section>
      <Section title="Sizes">
        <CodePreview
          preview={<div className="max-w-sm space-y-3"><InputComp size="sm" placeholder="Small" /><InputComp size="md" placeholder="Medium" /><InputComp size="lg" placeholder="Large" /></div>}
          code={`<Input size="sm" placeholder="Small" />\n<Input size="md" placeholder="Medium" />\n<Input size="lg" placeholder="Large" />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   CHECKBOX
═══════════════════════════════════════════════════════════════════════════════ */
export const CheckboxPage = () => {
  const [checked, setChecked] = useState(false);
  const meta = COMPONENTS.find(c => c.slug === "checkbox")!;
  return (
    <div>
      <PageHeader slug="checkbox" />
      <Section title="Basic">
        <CodePreview
          preview={
            <div className="space-y-3">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} className="w-4 h-4 rounded border-2 border-gray-300 accent-blue-600 cursor-pointer" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Accept terms and conditions</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-2 accent-blue-600 cursor-pointer" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Subscribe to newsletter</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-not-allowed opacity-50">
                <input type="checkbox" disabled className="w-4 h-4 rounded border-2 border-gray-300 cursor-not-allowed" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Disabled option</span>
              </label>
            </div>
          }
          code={`<Checkbox label="Accept terms and conditions" />\n<Checkbox label="Subscribe to newsletter" defaultChecked />\n<Checkbox label="Disabled" disabled />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   SWITCH
═══════════════════════════════════════════════════════════════════════════════ */
export const SwitchPage = () => {
  const [on, setOn] = useState(false);
  const meta = COMPONENTS.find(c => c.slug === "switch")!;
  const SwitchUI = ({ checked, onChange, label, size = "md", color = "primary" }: any) => {
    const trackSz: Record<string, string> = { sm: "w-8 h-4", md: "w-11 h-6", lg: "w-14 h-7" };
    const thumbSz: Record<string, string> = { sm: "w-3 h-3 peer-checked:translate-x-4", md: "w-4 h-4 peer-checked:translate-x-5", lg: "w-5 h-5 peer-checked:translate-x-7" };
    const colors: Record<string, string> = { primary: "peer-checked:bg-blue-600", success: "peer-checked:bg-green-600", danger: "peer-checked:bg-red-600" };
    return (
      <label className="flex items-center gap-3 cursor-pointer">
        <span className="relative inline-flex items-center">
          <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="peer sr-only" />
          <span className={cn("block rounded-full transition-colors bg-gray-300 dark:bg-gray-600", trackSz[size], colors[color])} />
          <span className={cn("absolute left-0.5 top-1/2 -translate-y-1/2 rounded-full bg-white shadow transition-transform", thumbSz[size])} />
        </span>
        {label && <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</span>}
      </label>
    );
  };
  return (
    <div>
      <PageHeader slug="switch" />
      <Section title="Basic">
        <CodePreview
          preview={
            <div className="space-y-4">
              <SwitchUI checked={on} onChange={setOn} label={on ? "Enabled" : "Disabled"} />
              <SwitchUI checked={true} label="Dark mode" color="primary" />
              <SwitchUI checked={true} label="Success color" color="success" />
            </div>
          }
          code={`<Switch label="Enable notifications" />\n<Switch label="Dark mode" color="primary" />`}
        />
      </Section>
      <Section title="Sizes">
        <CodePreview
          preview={<div className="flex items-center gap-6">{(["sm","md","lg"] as const).map(s => <SwitchUI key={s} checked={true} label={s.toUpperCase()} size={s} />)}</div>}
          code={`<Switch size="sm" label="SM" />\n<Switch size="md" label="MD" />\n<Switch size="lg" label="LG" />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   SELECT
═══════════════════════════════════════════════════════════════════════════════ */
export const SelectPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "select")!;
  return (
    <div>
      <PageHeader slug="select" />
      <Section title="Basic">
        <CodePreview
          preview={
            <div className="max-w-sm space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Framework</label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 h-10 px-3 text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select a framework…</option>
                    <option>React</option><option>Next.js</option><option>Vue</option><option>Svelte</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>
          }
          code={`<Select\n  label="Framework"\n  placeholder="Select a framework…"\n  options={[\n    { value: "react", label: "React" },\n    { value: "next", label: "Next.js" },\n    { value: "vue", label: "Vue" },\n  ]}\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   TEXTAREA
═══════════════════════════════════════════════════════════════════════════════ */
export const TextareaPage = () => {
  const [val, setVal] = useState("");
  const meta = COMPONENTS.find(c => c.slug === "textarea")!;
  return (
    <div>
      <PageHeader slug="textarea" />
      <Section title="Basic">
        <CodePreview
          preview={
            <div className="max-w-sm space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea rows={3} placeholder="Write your message…" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                <p className="text-xs text-gray-500">Max 500 characters.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">With char count</label>
                <div className="relative">
                  <textarea rows={3} value={val} onChange={e => setVal(e.target.value)} maxLength={200} placeholder="Type something…" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  <span className="absolute bottom-2 right-3 text-xs text-gray-400">{val.length}/200</span>
                </div>
              </div>
            </div>
          }
          code={`<Textarea label="Message" placeholder="Write your message…" hint="Max 500 characters." />\n<Textarea label="Bio" showCount maxLength={200} />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   SLIDER
═══════════════════════════════════════════════════════════════════════════════ */
export const SliderPage = () => {
  const [val, setVal] = useState(40);
  const meta = COMPONENTS.find(c => c.slug === "slider")!;
  return (
    <div>
      <PageHeader slug="slider" />
      <Section title="Basic">
        <CodePreview
          preview={
            <div className="max-w-sm space-y-6">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-sm"><span className="font-medium text-gray-700 dark:text-gray-300">Volume</span><span className="text-gray-500">{val}%</span></div>
                <input type="range" min={0} max={100} value={val} onChange={e => setVal(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none bg-gray-200 dark:bg-gray-700 accent-blue-600 cursor-pointer" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-sm"><span className="font-medium text-gray-700 dark:text-gray-300">Price range</span><span className="text-gray-500">$75</span></div>
                <input type="range" min={0} max={200} defaultValue={75} className="w-full h-2 rounded-full appearance-none bg-gray-200 dark:bg-gray-700 accent-green-600 cursor-pointer" />
              </div>
            </div>
          }
          code={`<Slider label="Volume" value={val} onChange={setVal} valueSuffix="%" />\n<Slider label="Price" color="success" valueSuffix=" USD" />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   RATING
═══════════════════════════════════════════════════════════════════════════════ */
export const RatingPage = () => {
  const [val, setVal] = useState(3);
  const meta = COMPONENTS.find(c => c.slug === "rating")!;
  const Stars = ({ value, onChange, readOnly = false, max = 5, size = "md" }: any) => {
    const [hover, setHover] = useState(-1);
    const display = hover >= 0 ? hover + 1 : value;
    const szCls = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-8 h-8" : "w-6 h-6";
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: max }, (_, i) => (
          <button key={i} type="button" disabled={readOnly} onClick={() => !readOnly && onChange?.(i+1)} onMouseEnter={() => !readOnly && setHover(i)} onMouseLeave={() => !readOnly && setHover(-1)} className={cn("transition-transform focus:outline-none", !readOnly && "hover:scale-110 cursor-pointer", readOnly && "cursor-default")}>
            <svg className={cn(szCls, i < display ? "text-yellow-400" : "text-gray-300 dark:text-gray-600")} fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          </button>
        ))}
      </div>
    );
  };
  return (
    <div>
      <PageHeader slug="rating" />
      <Section title="Interactive">
        <CodePreview
          preview={<div className="space-y-4"><div className="flex items-center gap-3"><Stars value={val} onChange={setVal} /><span className="text-sm text-gray-500">{val} / 5</span></div><Stars value={4.5} readOnly /><Stars value={3} size="lg" onChange={setVal} /></div>}
          code={`<Rating value={rating} onChange={setRating} />\n<Rating value={4.5} readOnly />\n<Rating value={3} size="lg" />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   TOGGLE / TOGGLE GROUP
═══════════════════════════════════════════════════════════════════════════════ */
export const TogglePage = () => {
  const [pressed, setPressed] = useState(false);
  const [align, setAlign] = useState("left");
  const meta = COMPONENTS.find(c => c.slug === "toggle")!;
  return (
    <div>
      <PageHeader slug="toggle" />
      <Section title="Toggle Button">
        <CodePreview
          preview={
            <div className="flex gap-3 items-center">
              <button type="button" aria-pressed={pressed} onClick={() => setPressed(p => !p)}
                className={cn("h-9 px-4 text-sm font-medium rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500", pressed ? "bg-blue-50 border-blue-400 text-blue-600 dark:bg-blue-950 dark:border-blue-600 dark:text-blue-400" : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800")}>
                {pressed ? "★ Starred" : "☆ Star"}
              </button>
            </div>
          }
          code={`const [pressed, setPressed] = useState(false);\n<Toggle pressed={pressed} onPressedChange={setPressed}>\n  {pressed ? "★ Starred" : "☆ Star"}\n</Toggle>`}
        />
      </Section>
      <Section title="Toggle Group">
        <CodePreview
          preview={
            <div className="flex">
              {["left","center","right"].map(v => (
                <button key={v} type="button" onClick={() => setAlign(v)}
                  className={cn("h-9 px-4 text-sm font-medium border-y first:border-l last:border-r first:rounded-l-lg last:rounded-r-lg border-gray-200 dark:border-gray-700 transition-colors", align === v ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400" : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 border-x-0 first:border-l last:border-r")}>
                  {v.charAt(0).toUpperCase()+v.slice(1)}
                </button>
              ))}
            </div>
          }
          code={`<ToggleGroup\n  items={[{value:"left",label:"Left"},{value:"center",label:"Center"},{value:"right",label:"Right"}]}\n  value={align}\n  onChange={setAlign}\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   NUMBER INPUT
═══════════════════════════════════════════════════════════════════════════════ */
export const NumberInputPage = () => {
  const [val, setVal] = useState(1);
  const meta = COMPONENTS.find(c => c.slug === "number-input")!;
  const clamp = (v: number) => Math.min(100, Math.max(0, v));
  return (
    <div>
      <PageHeader slug="number-input" />
      <Section title="Basic">
        <CodePreview
          preview={
            <div className="max-w-xs space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
                <div className="flex items-center rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                  <button onClick={() => setVal(v => clamp(v - 1))} className="px-3 py-2 text-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-colors disabled:opacity-40" disabled={val <= 0}>−</button>
                  <input type="number" value={val} onChange={e => setVal(clamp(Number(e.target.value)))} className="flex-1 text-center py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" />
                  <button onClick={() => setVal(v => clamp(v + 1))} className="px-3 py-2 text-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transition-colors disabled:opacity-40" disabled={val >= 100}>+</button>
                </div>
              </div>
            </div>
          }
          code={`<NumberInput label="Quantity" value={qty} onChange={setQty} min={0} max={100} />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   INPUT OTP
═══════════════════════════════════════════════════════════════════════════════ */
export const InputOTPPage = () => {
  const [otp, setOtp] = useState("");
  const meta = COMPONENTS.find(c => c.slug === "input-otp")!;
  return (
    <div>
      <PageHeader slug="input-otp" />
      <Section title="Basic OTP Input">
        <CodePreview
          preview={
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {Array.from({ length: 6 }, (_, i) => (
                  <input key={i} type="text" maxLength={1} value={otp[i] || ""} inputMode="numeric"
                    onChange={e => {
                      const next = otp.split(""); next[i] = e.target.value.slice(-1); setOtp(next.join(""));
                      if (e.target.value && i < 5) (document.querySelectorAll(".otp-inp")[i+1] as HTMLInputElement)?.focus();
                    }}
                    className="otp-inp w-10 h-12 text-center font-mono font-semibold text-base rounded-lg border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors border-gray-300 dark:border-gray-600" />
                ))}
              </div>
              {otp.length === 6 && <p className="text-sm text-green-600 dark:text-green-400 font-medium">✓ Code entered: {otp}</p>}
            </div>
          }
          code={`<InputOTP length={6} value={otp} onChange={setOtp} />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};
