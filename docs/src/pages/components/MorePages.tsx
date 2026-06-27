import { useState, useRef, useEffect } from "react";
import { CodePreview } from "../../components/CodePreview";
import { PropsTable } from "../../components/PropsTable";
import { DocsBadge } from "../../components/DocsBadge";
import { COMPONENTS } from "../../data/components";

const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(" ");

const PageHeader = ({ slug }: { slug: string }) => {
  const meta = COMPONENTS.find(c => c.slug === slug)!;
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{meta.name}</h1>
        <DocsBadge status={meta.status} />
      </div>
      <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl">{meta.description}</p>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">{title}</h2>
    {children}
  </div>
);

const Btn = ({ variant = "primary", size = "md", label, disabled = false, onClick, className = "" }: any) => {
  const v: Record<string, string> = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
    outline: "bg-transparent border border-blue-500 text-blue-600 hover:bg-blue-50 dark:text-blue-400",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };
  const s: Record<string, string> = { sm: "h-8 px-3 text-sm rounded-md", md: "h-9 px-4 text-sm rounded-lg", lg: "h-11 px-5 text-base rounded-lg" };
  return <button disabled={disabled} onClick={onClick} className={cn("inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none disabled:opacity-50", v[variant], s[size], className)}>{label}</button>;
};

/* ── ButtonGroup ──────────────────────────────────────────────────────────── */
export const ButtonGroupPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "button-group")!;
  return (
    <div>
      <PageHeader slug="button-group" />
      <Section title="Horizontal Group">
        <CodePreview
          preview={
            <div className="flex flex-col gap-4">
              <div className="inline-flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {["Left","Center","Right"].map((l,i) => (
                  <button key={i} className={cn("px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors", i<2 && "border-r border-gray-200 dark:border-gray-700")}>{l}</button>
                ))}
              </div>
            </div>
          }
          code={`<ButtonGroup>\n  <Button label="Left" />\n  <Button label="Center" />\n  <Button label="Right" />\n</ButtonGroup>`}
        />
      </Section>
      <Section title="Vertical Group">
        <CodePreview
          preview={
            <div className="inline-flex flex-col rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 w-32">
              {["Top","Middle","Bottom"].map((l,i) => (
                <button key={i} className={cn("px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors", i<2 && "border-b border-gray-200 dark:border-gray-700")}>{l}</button>
              ))}
            </div>
          }
          code={`<ButtonGroup orientation="vertical">\n  <Button label="Top" />\n  <Button label="Middle" />\n  <Button label="Bottom" />\n</ButtonGroup>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── IconButton ───────────────────────────────────────────────────────────── */
export const IconButtonPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "icon-button")!;
  const icons = ["★","♥","✉","🔔","⚙"];
  return (
    <div>
      <PageHeader slug="icon-button" />
      <Section title="Variants">
        <CodePreview
          preview={
            <div className="flex items-center gap-3 flex-wrap">
              {(["solid","ghost","outline","soft"] as const).map(v => {
                const cls: Record<string,string> = {
                  solid:"bg-blue-600 text-white hover:bg-blue-700",
                  ghost:"bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                  outline:"border border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent dark:text-blue-400",
                  soft:"bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
                };
                return <button key={v} aria-label={v} className={cn("w-9 h-9 rounded-lg flex items-center justify-center text-base transition-colors", cls[v])}>★</button>;
              })}
            </div>
          }
          code={`<IconButton icon={<StarIcon />} label="Star" variant="solid" />\n<IconButton icon={<StarIcon />} label="Star" variant="ghost" />\n<IconButton icon={<StarIcon />} label="Star" variant="outline" />\n<IconButton icon={<StarIcon />} label="Star" variant="soft" />`}
        />
      </Section>
      <Section title="Sizes">
        <CodePreview
          preview={
            <div className="flex items-end gap-3">
              {(["xs","sm","md","lg","xl"] as const).map(s => {
                const sz: Record<string,string> = { xs:"w-6 h-6 text-xs", sm:"w-7 h-7 text-sm", md:"w-9 h-9 text-base", lg:"w-11 h-11 text-lg", xl:"w-12 h-12 text-xl" };
                return <button key={s} aria-label={s} className={cn("bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors hover:bg-blue-700", sz[s])}>★</button>;
              })}
            </div>
          }
          code={`<IconButton icon={<StarIcon />} label="Star" size="xs" />\n<IconButton icon={<StarIcon />} label="Star" size="md" />\n<IconButton icon={<StarIcon />} label="Star" size="xl" />`}
        />
      </Section>
      <Section title="Icon Gallery">
        <CodePreview
          preview={<div className="flex gap-2">{icons.map((ic,i) => <button key={i} aria-label={ic} className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">{ic}</button>)}</div>}
          code={`<IconButton icon={<StarIcon />} label="Favorite" />\n<IconButton icon={<HeartIcon />} label="Like" />\n<IconButton icon={<MailIcon />} label="Email" />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── FAB ──────────────────────────────────────────────────────────────────── */
export const FABPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "fab")!;
  return (
    <div>
      <PageHeader slug="fab" />
      <Section title="Standard FAB">
        <CodePreview
          preview={
            <div className="relative h-32 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
              <button className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center text-2xl transition-transform hover:scale-105">+</button>
            </div>
          }
          code={`<FAB icon={<PlusIcon />} />`}
        />
      </Section>
      <Section title="Extended FAB">
        <CodePreview
          preview={
            <div className="relative h-32 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
              <button className="absolute bottom-4 right-4 h-14 px-5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center gap-2 transition-transform hover:scale-105 text-sm font-medium">
                <span className="text-lg">+</span> New Document
              </button>
            </div>
          }
          code={`<FAB icon={<PlusIcon />} label="New Document" />`}
        />
      </Section>
      <Section title="Sizes">
        <CodePreview
          preview={
            <div className="flex items-end gap-4">
              {(["sm","md","lg","xl"] as const).map(s => {
                const sz: Record<string,string> = { sm:"w-10 h-10 text-lg", md:"w-14 h-14 text-2xl", lg:"w-16 h-16 text-3xl", xl:"w-20 h-20 text-4xl" };
                return <button key={s} className={cn("rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105", sz[s])}>+</button>;
              })}
            </div>
          }
          code={`<FAB icon={<PlusIcon />} size="sm" />\n<FAB icon={<PlusIcon />} size="md" />\n<FAB icon={<PlusIcon />} size="lg" />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── RadioGroup ───────────────────────────────────────────────────────────── */
export const RadioGroupPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "radio-group")!;
  const [val, setVal] = useState("option1");
  const [size, setSize] = useState("md");
  const options = [
    { value:"option1", label:"Option One", hint:"This is the first choice" },
    { value:"option2", label:"Option Two", hint:"This is the second choice" },
    { value:"option3", label:"Option Three", hint:"This is disabled", disabled:true },
  ];
  return (
    <div>
      <PageHeader slug="radio-group" />
      <Section title="Vertical (default)">
        <CodePreview
          preview={
            <div className="space-y-2">
              {options.map(o => (
                <label key={o.value} className={cn("flex items-start gap-3 cursor-pointer group", o.disabled && "opacity-50 cursor-not-allowed")}>
                  <input type="radio" name="demo" value={o.value} checked={val===o.value} onChange={() => !o.disabled && setVal(o.value)} disabled={o.disabled} className="mt-0.5 accent-blue-600 w-4 h-4" />
                  <div><p className="text-sm font-medium text-gray-900 dark:text-gray-100">{o.label}</p><p className="text-xs text-gray-500">{o.hint}</p></div>
                </label>
              ))}
            </div>
          }
          code={`<RadioGroup\n  name="plan"\n  value={value}\n  onChange={setValue}\n  options={[\n    { value: "option1", label: "Option One" },\n    { value: "option2", label: "Option Two" },\n  ]}\n/>`}
        />
      </Section>
      <Section title="Horizontal">
        <CodePreview
          preview={
            <div className="flex gap-6">
              {["Small","Medium","Large"].map(l => (
                <label key={l} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="size" value={l} checked={size===l} onChange={() => setSize(l)} className="accent-blue-600 w-4 h-4" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{l}</span>
                </label>
              ))}
            </div>
          }
          code={`<RadioGroup name="size" orientation="horizontal" options={["Small","Medium","Large"].map(l=>({value:l,label:l}))} />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Autocomplete ─────────────────────────────────────────────────────────── */
export const AutocompletePage = () => {
  const meta = COMPONENTS.find(c => c.slug === "autocomplete")!;
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const allOpts = ["Apple","Banana","Cherry","Date","Elderberry","Fig","Grape","Honeydew","Kiwi","Lemon","Mango","Nectarine"];
  const filtered = allOpts.filter(o => o.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <PageHeader slug="autocomplete" />
      <Section title="Basic Search">
        <CodePreview
          preview={
            <div className="relative w-72">
              <input
                value={query} onFocus={() => setOpen(true)} onBlur={() => setTimeout(()=>setOpen(false),150)}
                onChange={e => { setQuery(e.target.value); setOpen(true); }}
                placeholder="Search fruits…"
                className="w-full h-9 px-3 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {open && filtered.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden max-h-48 overflow-y-auto">
                  {filtered.map(o => (
                    <button key={o} onMouseDown={() => { setQuery(o); setOpen(false); }} className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">{o}</button>
                  ))}
                </div>
              )}
            </div>
          }
          code={`<Autocomplete\n  options={fruits}\n  value={value}\n  onChange={setValue}\n  placeholder="Search fruits…"\n/>`}
        />
      </Section>
      <Section title="With Groups">
        <CodePreview
          preview={
            <div className="w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow overflow-hidden">
              <div className="px-3 py-1.5 bg-gray-50 dark:bg-gray-900/50 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Fruits</div>
              {["Apple","Banana","Cherry"].map(o => <div key={o} className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">{o}</div>)}
              <div className="px-3 py-1.5 bg-gray-50 dark:bg-gray-900/50 text-[10px] font-semibold uppercase tracking-widest text-gray-400 border-t border-gray-100 dark:border-gray-700">Vegetables</div>
              {["Carrot","Broccoli","Spinach"].map(o => <div key={o} className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">{o}</div>)}
            </div>
          }
          code={`<Autocomplete\n  options={[\n    { group: "Fruits", items: ["Apple","Banana","Cherry"] },\n    { group: "Vegetables", items: ["Carrot","Broccoli"] },\n  ]}\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── DatePicker ───────────────────────────────────────────────────────────── */
export const DatePickerPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "date-picker")!;
  const [date, setDate] = useState<string>("");
  return (
    <div>
      <PageHeader slug="date-picker" />
      <Section title="Basic">
        <CodePreview
          preview={
            <div className="flex flex-col gap-2 w-64">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="h-9 px-3 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {date && <p className="text-xs text-gray-500">Selected: <span className="font-medium text-gray-900 dark:text-gray-100">{new Date(date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</span></p>}
            </div>
          }
          code={`<DatePicker\n  value={date}\n  onChange={setDate}\n  label="Select date"\n/>`}
        />
      </Section>
      <Section title="With Min/Max">
        <CodePreview
          preview={
            <div className="flex flex-col gap-2 w-64">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date range constrained</label>
              <input type="date" min="2024-01-01" max="2024-12-31" className="h-9 px-3 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <p className="text-xs text-gray-400">Constrained to 2024</p>
            </div>
          }
          code={`<DatePicker\n  minDate={new Date("2024-01-01")}\n  maxDate={new Date("2024-12-31")}\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── InputGroup ───────────────────────────────────────────────────────────── */
export const InputGroupPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "input-group")!;
  return (
    <div>
      <PageHeader slug="input-group" />
      <Section title="Addons">
        <CodePreview
          preview={
            <div className="space-y-3 max-w-sm">
              <div className="flex">
                <span className="flex items-center px-3 border border-r-0 border-gray-200 dark:border-gray-700 rounded-l-lg bg-gray-50 dark:bg-gray-800 text-sm text-gray-500">https://</span>
                <input placeholder="yoursite.com" className="flex-1 h-9 px-3 text-sm border border-gray-200 dark:border-gray-700 rounded-r-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div className="flex">
                <input placeholder="Amount" className="flex-1 h-9 px-3 text-sm border border-gray-200 dark:border-gray-700 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                <span className="flex items-center px-3 border border-l-0 border-gray-200 dark:border-gray-700 rounded-r-lg bg-gray-50 dark:bg-gray-800 text-sm text-gray-500">USD</span>
              </div>
              <div className="flex">
                <span className="flex items-center px-3 border border-r-0 border-gray-200 dark:border-gray-700 rounded-l-lg bg-gray-50 dark:bg-gray-800 text-sm text-gray-500">@</span>
                <input placeholder="username" className="flex-1 h-9 px-3 text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                <span className="flex items-center px-3 border border-l-0 border-gray-200 dark:border-gray-700 rounded-r-lg bg-gray-50 dark:bg-gray-800 text-sm text-gray-500">.com</span>
              </div>
            </div>
          }
          code={`<InputGroup leftAddon="https://">\n  <Input placeholder="yoursite.com" />\n</InputGroup>\n\n<InputGroup rightAddon="USD">\n  <Input placeholder="Amount" />\n</InputGroup>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── FileUpload ───────────────────────────────────────────────────────────── */
export const FileUploadPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "file-upload")!;
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  return (
    <div>
      <PageHeader slug="file-upload" />
      <Section title="Drag & Drop Zone">
        <CodePreview
          preview={
            <div className="space-y-3 max-w-md">
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); const names = Array.from(e.dataTransfer.files).map(f=>f.name); setFiles(p=>[...p,...names]); }}
                className={cn("border-2 border-dashed rounded-xl p-8 text-center transition-colors", dragging ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30" : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50")}
              >
                <div className="text-4xl mb-2">📁</div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Drop files here or click to upload</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 10MB</p>
                <label className="mt-3 inline-block cursor-pointer px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">
                  Browse Files
                  <input type="file" multiple className="hidden" onChange={e => setFiles(p=>[...p,...Array.from(e.target.files||[]).map(f=>f.name)])} />
                </label>
              </div>
              {files.length > 0 && (
                <div className="space-y-1.5">
                  {files.map((f,i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm">
                      <span>📄</span>
                      <span className="flex-1 truncate text-gray-700 dark:text-gray-300">{f}</span>
                      <button onClick={() => setFiles(p=>p.filter((_,j)=>j!==i))} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          }
          code={`<FileUpload\n  accept="image/*,.pdf"\n  multiple\n  maxSizeMB={10}\n  onFilesChange={setFiles}\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── ToggleGroup ──────────────────────────────────────────────────────────── */
export const ToggleGroupPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "toggle-group")!;
  const [single, setSingle] = useState("center");
  const [multi, setMulti] = useState<string[]>(["bold"]);
  return (
    <div>
      <PageHeader slug="toggle-group" />
      <Section title="Single Select">
        <CodePreview
          preview={
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {["left","center","right"].map((a,i) => (
                <button key={a} onClick={() => setSingle(a)} className={cn("px-4 py-2 text-sm font-medium transition-colors", i>0&&"border-l border-gray-200 dark:border-gray-700", single===a ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}>
                  {a==="left"?"⬅":a==="center"?"↔":"➡"}
                </button>
              ))}
            </div>
          }
          code={`<ToggleGroup type="single" value={align} onValueChange={setAlign}\n  items={[\n    { value: "left", label: <AlignLeftIcon /> },\n    { value: "center", label: <AlignCenterIcon /> },\n    { value: "right", label: <AlignRightIcon /> },\n  ]}\n/>`}
        />
      </Section>
      <Section title="Multi Select">
        <CodePreview
          preview={
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {["bold","italic","underline"].map((f,i) => (
                <button key={f} onClick={() => setMulti(p => p.includes(f) ? p.filter(x=>x!==f) : [...p,f])} className={cn("px-4 py-2 text-sm font-medium transition-colors", i>0&&"border-l border-gray-200 dark:border-gray-700", multi.includes(f) ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}>
                  {f==="bold"?"B":f==="italic"?"I":"U"}
                </button>
              ))}
            </div>
          }
          code={`<ToggleGroup type="multiple" value={formatting} onValueChange={setFormatting}\n  items={[\n    { value: "bold", label: "B" },\n    { value: "italic", label: "I" },\n    { value: "underline", label: "U" },\n  ]}\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Calendar ─────────────────────────────────────────────────────────────── */
export const CalendarPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "calendar")!;
  const [selected, setSelected] = useState<number | null>(null);
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return (
    <div>
      <PageHeader slug="calendar" />
      <Section title="Month Calendar">
        <CodePreview
          preview={
            <div className="w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <button onClick={() => { if(month===0){setMonth(11);setYear(y=>y-1)}else setMonth(m=>m-1); }} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">‹</button>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{months[month]} {year}</span>
                <button onClick={() => { if(month===11){setMonth(0);setYear(y=>y+1)}else setMonth(m=>m+1); }} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">›</button>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-7 mb-2">
                  {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-0.5">
                  {Array.from({length: firstDay}).map((_,i) => <div key={`e${i}`} />)}
                  {Array.from({length: daysInMonth}).map((_,i) => {
                    const day = i+1;
                    const isToday = day===today.getDate() && month===today.getMonth() && year===today.getFullYear();
                    const isSel = selected===day;
                    return (
                      <button key={day} onClick={() => setSelected(day)} className={cn("w-full aspect-square flex items-center justify-center text-xs rounded-lg transition-colors", isSel?"bg-blue-600 text-white font-semibold":isToday?"bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-medium":"text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800")}>
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
              {selected && <div className="px-4 pb-3 text-xs text-center text-gray-500">Selected: {months[month]} {selected}, {year}</div>}
            </div>
          }
          code={`<Calendar\n  value={date}\n  onChange={setDate}\n  showOutsideDays\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Typography ───────────────────────────────────────────────────────────── */
export const TypographyPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "typography")!;
  return (
    <div>
      <PageHeader slug="typography" />
      <Section title="Headings">
        <CodePreview
          preview={
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Heading 1</h1>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Heading 2</h2>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Heading 3</h3>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Heading 4</h4>
              <h5 className="text-lg font-medium text-gray-900 dark:text-gray-100">Heading 5</h5>
              <h6 className="text-base font-medium text-gray-900 dark:text-gray-100">Heading 6</h6>
            </div>
          }
          code={`<Typography variant="h1">Heading 1</Typography>\n<Typography variant="h2">Heading 2</Typography>\n<Typography variant="h3">Heading 3</Typography>`}
        />
      </Section>
      <Section title="Body & Utilities">
        <CodePreview
          preview={
            <div className="space-y-3 max-w-lg">
              <p className="text-base text-gray-900 dark:text-gray-100">Body 1 — The quick brown fox jumps over the lazy dog. Used for primary reading text.</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Body 2 — Slightly smaller secondary body text for supporting content.</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Lead — A slightly larger intro paragraph to draw the reader in.</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Caption — Small supporting text for labels and footnotes.</p>
              <code className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded font-mono">code</code>
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400">"Great typography elevates design."</blockquote>
            </div>
          }
          code={`<Typography variant="body1">Primary text</Typography>\n<Typography variant="body2">Secondary text</Typography>\n<Typography variant="caption">Caption text</Typography>\n<Typography variant="code">code</Typography>`}
        />
      </Section>
      <Section title="Colors">
        <CodePreview
          preview={
            <div className="space-y-1">
              {(["default","muted","primary","danger"] as const).map(c => {
                const cls: Record<string,string> = { default:"text-gray-900 dark:text-gray-100", muted:"text-gray-500 dark:text-gray-400", primary:"text-blue-600 dark:text-blue-400", danger:"text-red-600 dark:text-red-400" };
                return <p key={c} className={cn("text-sm font-medium", cls[c])}>{c.charAt(0).toUpperCase()+c.slice(1)} color</p>;
              })}
            </div>
          }
          code={`<Typography color="default">Default</Typography>\n<Typography color="muted">Muted</Typography>\n<Typography color="primary">Primary</Typography>\n<Typography color="danger">Danger</Typography>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Chip ─────────────────────────────────────────────────────────────────── */
export const ChipPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "chip")!;
  const [chips, setChips] = useState(["React","TypeScript","Tailwind","Design"]);
  const colors: Record<string,string> = { default:"bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300", primary:"bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", success:"bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300", warning:"bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300", danger:"bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" };
  return (
    <div>
      <PageHeader slug="chip" />
      <Section title="Variants">
        <CodePreview
          preview={
            <div className="flex gap-2 flex-wrap">
              {(["default","primary","success","warning","danger"] as const).map(c => (
                <span key={c} className={cn("inline-flex items-center px-3 py-1 rounded-full text-xs font-medium", colors[c])}>{c}</span>
              ))}
            </div>
          }
          code={`<Chip color="default">Default</Chip>\n<Chip color="primary">Primary</Chip>\n<Chip color="success">Success</Chip>`}
        />
      </Section>
      <Section title="With Delete (Tag Input)">
        <CodePreview
          preview={
            <div className="flex flex-wrap gap-2">
              {chips.map(c => (
                <span key={c} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {c}
                  <button onClick={() => setChips(p=>p.filter(x=>x!==c))} className="ml-0.5 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[10px]">✕</button>
                </span>
              ))}
            </div>
          }
          code={`<Chip onDelete={() => removeTag(tag)} color="primary">{tag}</Chip>`}
        />
      </Section>
      <Section title="With Avatar">
        <CodePreview
          preview={
            <div className="flex gap-2">
              {["Alice","Bob","Carol"].map(name => (
                <span key={name} className="inline-flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold">{name[0]}</span>
                  {name}
                </span>
              ))}
            </div>
          }
          code={`<Chip avatar={<Avatar initials="A" size="xs" />}>Alice</Chip>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Tag ──────────────────────────────────────────────────────────────────── */
export const TagPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "tag")!;
  const colorMap: Record<string,string> = {
    default:"bg-gray-100 border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300",
    primary:"bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300",
    success:"bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300",
    warning:"bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300",
    danger:"bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300",
    purple:"bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300",
    cyan:"bg-cyan-50 border-cyan-200 text-cyan-700 dark:bg-cyan-900/20 dark:border-cyan-800 dark:text-cyan-300",
    pink:"bg-pink-50 border-pink-200 text-pink-700 dark:bg-pink-900/20 dark:border-pink-800 dark:text-pink-300",
  };
  return (
    <div>
      <PageHeader slug="tag" />
      <Section title="All Colors">
        <CodePreview
          preview={<div className="flex flex-wrap gap-2">{Object.keys(colorMap).map(c => <span key={c} className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border", colorMap[c])}>{c}</span>)}</div>}
          code={`<Tag color="primary">Primary</Tag>\n<Tag color="success">Success</Tag>\n<Tag color="purple">Purple</Tag>`}
        />
      </Section>
      <Section title="With Close">
        <CodePreview
          preview={
            <div className="flex gap-2 flex-wrap">
              {["React","Vue","Angular","Svelte"].map(t => (
                <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300">
                  {t}<button className="ml-0.5 hover:text-blue-900 text-blue-500">×</button>
                </span>
              ))}
            </div>
          }
          code={`<Tag color="primary" onClose={() => removeTag(t)}>{t}</Tag>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Table ────────────────────────────────────────────────────────────────── */
export const TablePage = () => {
  const meta = COMPONENTS.find(c => c.slug === "table")!;
  const rows = [
    { name:"Alice Johnson", role:"Designer", status:"Active", joined:"Jan 2023" },
    { name:"Bob Smith", role:"Engineer", status:"Active", joined:"Mar 2023" },
    { name:"Carol White", role:"Manager", status:"On leave", joined:"Sep 2022" },
    { name:"David Brown", role:"Engineer", status:"Active", joined:"Jun 2023" },
  ];
  return (
    <div>
      <PageHeader slug="table" />
      <Section title="Basic Table">
        <CodePreview
          preview={
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>{["Name","Role","Status","Joined"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {rows.map((r,i) => (
                    <tr key={i} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{r.name}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{r.role}</td>
                      <td className="px-4 py-3"><span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", r.status==="Active"?"bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400":"bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400")}>{r.status}</span></td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{r.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
          code={`<Table hoverable>\n  <TableHead>\n    <TableRow><TableCell>Name</TableCell>...</TableRow>\n  </TableHead>\n  <TableBody>\n    {rows.map(r => <TableRow key={r.id}>...</TableRow>)}\n  </TableBody>\n</Table>`}
        />
      </Section>
      <Section title="Striped">
        <CodePreview
          preview={
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>{["Name","Role","Joined"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {rows.map((r,i) => (
                    <tr key={i} className={cn(i%2===0?"bg-white dark:bg-gray-900":"bg-gray-50 dark:bg-gray-800/30","hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors")}>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{r.name}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{r.role}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{r.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
          code={`<Table striped hoverable>...</Table>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── DataTable ────────────────────────────────────────────────────────────── */
export const DataTablePage = () => {
  const meta = COMPONENTS.find(c => c.slug === "data-table")!;
  const data = [
    { id:1, name:"Alice Johnson", email:"alice@example.com", role:"Admin", status:"Active" },
    { id:2, name:"Bob Smith", email:"bob@example.com", role:"User", status:"Inactive" },
    { id:3, name:"Carol White", email:"carol@example.com", role:"Editor", status:"Active" },
    { id:4, name:"David Brown", email:"david@example.com", role:"User", status:"Active" },
    { id:5, name:"Eve Martinez", email:"eve@example.com", role:"Admin", status:"Pending" },
  ];
  const [sort, setSort] = useState<{col:string;dir:"asc"|"desc"}>({col:"name",dir:"asc"});
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const sorted = [...data].sort((a,b) => { const v = (a as any)[sort.col]<(b as any)[sort.col]?-1:1; return sort.dir==="asc"?v:-v; });
  return (
    <div>
      <PageHeader slug="data-table" />
      <Section title="Sortable + Selectable">
        <CodePreview
          preview={
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-4 py-3 w-10"><input type="checkbox" checked={selected.length===data.length} onChange={e=>setSelected(e.target.checked?data.map(d=>d.id):[])} className="rounded accent-blue-600" /></th>
                    {["name","email","role","status"].map(col=>(
                      <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-gray-100" onClick={()=>setSort(s=>({col,dir:s.col===col&&s.dir==="asc"?"desc":"asc"}))}>
                        <span className="flex items-center gap-1">{col}{sort.col===col&&<span>{sort.dir==="asc"?"↑":"↓"}</span>}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {sorted.map(r=>(
                    <tr key={r.id} className={cn("hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors", selected.includes(r.id)&&"bg-blue-50 dark:bg-blue-950/20")}>
                      <td className="px-4 py-3"><input type="checkbox" checked={selected.includes(r.id)} onChange={e=>setSelected(p=>e.target.checked?[...p,r.id]:p.filter(x=>x!==r.id))} className="rounded accent-blue-600" /></td>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{r.name}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{r.email}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{r.role}</td>
                      <td className="px-4 py-3"><span className={cn("px-2 py-0.5 rounded-full text-xs font-medium",r.status==="Active"?"bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400":r.status==="Inactive"?"bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400":"bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400")}>{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-800">
                <span className="text-xs text-gray-500">{selected.length} of {data.length} selected</span>
                <div className="flex gap-1">{[1,2,3].map(p=><button key={p} onClick={()=>setPage(p)} className={cn("w-7 h-7 rounded text-xs font-medium",page===p?"bg-blue-600 text-white":"text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800")}>{p}</button>)}</div>
              </div>
            </div>
          }
          code={`<DataTable\n  columns={columns}\n  data={data}\n  selectable\n  pageSize={10}\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── List ─────────────────────────────────────────────────────────────────── */
export const ListPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "list")!;
  const items = ["Dashboard","Analytics","Reports","Settings","Help & Support"];
  return (
    <div>
      <PageHeader slug="list" />
      <Section title="Basic List">
        <CodePreview
          preview={
            <div className="max-w-xs rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {items.map((item,i)=>(
                <div key={i} className={cn("flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors text-sm text-gray-700 dark:text-gray-300", i>0&&"border-t border-gray-100 dark:border-gray-800")}>
                  <span className="text-gray-400">○</span>{item}
                </div>
              ))}
            </div>
          }
          code={`<List>\n  <ListItem>Dashboard</ListItem>\n  <ListItem>Analytics</ListItem>\n  <ListItem>Settings</ListItem>\n</List>`}
        />
      </Section>
      <Section title="With Icons & Secondary">
        <CodePreview
          preview={
            <div className="max-w-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {[["📊","Dashboard","View your metrics","⟩"],["📈","Analytics","Detailed reports","⟩"],["⚙️","Settings","Preferences","⟩"]].map(([icon,title,sub,arrow],i)=>(
                <div key={i} className={cn("flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors", i>0&&"border-t border-gray-100 dark:border-gray-800")}>
                  <span className="text-xl">{icon}</span>
                  <div className="flex-1"><p className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p><p className="text-xs text-gray-500">{sub}</p></div>
                  <span className="text-gray-400 text-sm">{arrow}</span>
                </div>
              ))}
            </div>
          }
          code={`<List>\n  <ListItem icon={<DashboardIcon />} secondaryText="View your metrics" action={<ChevronIcon />}>\n    Dashboard\n  </ListItem>\n</List>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Timeline ─────────────────────────────────────────────────────────────── */
export const TimelinePage = () => {
  const meta = COMPONENTS.find(c => c.slug === "timeline")!;
  const events = [
    { icon:"✓", color:"bg-green-500", title:"Order placed", date:"Jan 12, 10:00 AM", desc:"Your order #12345 has been confirmed." },
    { icon:"📦", color:"bg-blue-500", title:"Processing", date:"Jan 12, 2:30 PM", desc:"Items are being prepared for shipment." },
    { icon:"🚚", color:"bg-yellow-500", title:"Shipped", date:"Jan 13, 9:00 AM", desc:"Your package is on the way." },
    { icon:"○", color:"bg-gray-300 dark:bg-gray-600", title:"Delivered", date:"Estimated Jan 15", desc:"Expected delivery to your address." },
  ];
  return (
    <div>
      <PageHeader slug="timeline" />
      <Section title="Vertical Timeline">
        <CodePreview
          preview={
            <div className="relative max-w-sm">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
              <div className="space-y-6">
                {events.map((e,i)=>(
                  <div key={i} className="relative flex gap-4">
                    <div className={cn("relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0", e.color)}>{e.icon}</div>
                    <div className="flex-1 pt-1.5">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{e.title}</p>
                        <p className="text-xs text-gray-400">{e.date}</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
          code={`<Timeline\n  items={[\n    { title: "Order placed", date: "Jan 12", description: "Confirmed." },\n    { title: "Shipped", date: "Jan 13", description: "On the way." },\n  ]}\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── LinearProgress ───────────────────────────────────────────────────────── */
export const LinearProgressPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "linear-progress")!;
  const colors: Record<string,string> = { primary:"bg-blue-600", success:"bg-green-600", warning:"bg-yellow-500", danger:"bg-red-600" };
  return (
    <div>
      <PageHeader slug="linear-progress" />
      <Section title="Colors & Values">
        <CodePreview
          preview={
            <div className="space-y-4 max-w-md">
              {(["primary","success","warning","danger"] as const).map(c => (
                <div key={c}>
                  <div className="flex justify-between mb-1"><span className="text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">{c}</span><span className="text-xs text-gray-500">65%</span></div>
                  <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"><div className={cn("h-full rounded-full transition-all", colors[c])} style={{width:"65%"}} /></div>
                </div>
              ))}
            </div>
          }
          code={`<LinearProgress value={65} color="primary" />\n<LinearProgress value={65} color="success" />\n<LinearProgress value={65} color="warning" />`}
        />
      </Section>
      <Section title="Indeterminate">
        <CodePreview
          preview={
            <div className="space-y-3 max-w-md">
              <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
                <div className="absolute inset-y-0 bg-blue-600 rounded-full animate-[indeterminate_1.5s_ease-in-out_infinite] w-1/3" style={{animation:"indeterminate 1.5s ease-in-out infinite"}} />
              </div>
              <style>{`@keyframes indeterminate { 0%{left:-33%} 100%{left:100%} }`}</style>
              <p className="text-xs text-gray-400">Use when progress is unknown</p>
            </div>
          }
          code={`<LinearProgress indeterminate />`}
        />
      </Section>
      <Section title="Striped">
        <CodePreview
          preview={
            <div className="space-y-2 max-w-md">
              <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div className="h-full rounded-full bg-blue-600 w-3/4" style={{backgroundImage:"repeating-linear-gradient(-45deg,transparent,transparent 10px,rgba(255,255,255,.2) 10px,rgba(255,255,255,.2) 20px)"}} />
              </div>
            </div>
          }
          code={`<LinearProgress value={75} striped />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── KBD ──────────────────────────────────────────────────────────────────── */
export const KBDPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "kbd")!;
  const kbdCls = "inline-flex items-center justify-center px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm text-xs font-mono font-semibold";
  return (
    <div>
      <PageHeader slug="kbd" />
      <Section title="Single Keys">
        <CodePreview
          preview={<div className="flex flex-wrap gap-2 items-center">{["Ctrl","Alt","Shift","⌘","Enter","Esc","Tab","⌫","↑","↓","←","→"].map(k=><kbd key={k} className={kbdCls}>{k}</kbd>)}</div>}
          code={`<KBD>Ctrl</KBD>\n<KBD>Alt</KBD>\n<KBD>Shift</KBD>`}
        />
      </Section>
      <Section title="Combinations">
        <CodePreview
          preview={
            <div className="space-y-3">
              {[["⌘","K"],["Ctrl","Shift","P"],["Alt","F4"],["Ctrl","C"]].map((combo,i)=>(
                <div key={i} className="flex items-center gap-2">
                  <div className="flex items-center gap-1">{combo.map((k,j)=><span key={j} className="flex items-center gap-1">{j>0&&<span className="text-gray-400 text-xs">+</span>}<kbd className={kbdCls}>{k}</kbd></span>)}</div>
                  <span className="text-xs text-gray-400">—</span>
                  <span className="text-xs text-gray-500">{["Command Palette","Global search","Close window","Copy"][i]}</span>
                </div>
              ))}
            </div>
          }
          code={`<KBDGroup>\n  <KBD>⌘</KBD>\n  <KBD>K</KBD>\n</KBDGroup>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Link ─────────────────────────────────────────────────────────────────── */
export const LinkPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "link")!;
  return (
    <div>
      <PageHeader slug="link" />
      <Section title="Variants">
        <CodePreview
          preview={
            <div className="flex flex-wrap gap-4">
              <a href="#" className="text-blue-600 hover:underline dark:text-blue-400 text-sm">Default link</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:underline text-sm">Muted link</a>
              <a href="#" className="text-red-600 hover:underline dark:text-red-400 text-sm">Danger link</a>
            </div>
          }
          code={`<Link href="/page" variant="default">Default</Link>\n<Link href="/page" variant="muted">Muted</Link>\n<Link href="/page" variant="danger">Danger</Link>`}
        />
      </Section>
      <Section title="Underline Modes">
        <CodePreview
          preview={
            <div className="flex flex-wrap gap-4">
              <a href="#" className="text-blue-600 dark:text-blue-400 underline text-sm">Always underline</a>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">Hover underline</a>
              <a href="#" className="text-blue-600 dark:text-blue-400 text-sm">No underline</a>
            </div>
          }
          code={`<Link underline="always">Always</Link>\n<Link underline="hover">Hover</Link>\n<Link underline="none">None</Link>`}
        />
      </Section>
      <Section title="External">
        <CodePreview
          preview={<a href="#" className="text-blue-600 dark:text-blue-400 hover:underline text-sm inline-flex items-center gap-1">Open in new tab <span className="text-xs">↗</span></a>}
          code={`<Link href="https://example.com" external>Open in new tab</Link>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── EmptyState ───────────────────────────────────────────────────────────── */
export const EmptyStatePage = () => {
  const meta = COMPONENTS.find(c => c.slug === "empty-state")!;
  return (
    <div>
      <PageHeader slug="empty-state" />
      <Section title="Default">
        <CodePreview
          preview={
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center max-w-sm mx-auto">
              <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-4xl mb-4">📭</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">No messages yet</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">When you receive messages, they'll appear here. Start by sending one!</p>
              <Btn variant="primary" label="Send a message" size="sm" />
            </div>
          }
          code={`<EmptyState\n  icon={<MailIcon />}\n  title="No messages yet"\n  description="When you receive messages, they'll appear here."\n  action={<Button label="Send a message" />}\n/>`}
        />
      </Section>
      <Section title="Error State">
        <CodePreview
          preview={
            <div className="flex flex-col items-center justify-center py-12 text-center max-w-sm mx-auto">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-3xl mb-4">⚠️</div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">Something went wrong</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">We couldn't load your data. Please try again.</p>
              <Btn variant="outline" label="Try again" size="sm" />
            </div>
          }
          code={`<EmptyState icon={<WarningIcon />} title="Something went wrong" description="Couldn't load data." action={<Button variant="outline" label="Retry" />} />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── CodeBlock ────────────────────────────────────────────────────────────── */
export const CodeBlockPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "code-block")!;
  const [copied, setCopied] = useState(false);
  const code = `import { Button } from "@aryanjain/ui";\n\nexport default function App() {\n  return (\n    <Button\n      variant="primary"\n      label="Click me"\n      onClick={() => console.log("clicked")}\n    />\n  );\n}`;
  return (
    <div>
      <PageHeader slug="code-block" />
      <Section title="Dark Theme (default)">
        <CodePreview
          preview={
            <div className="relative rounded-xl bg-gray-950 border border-gray-800 overflow-hidden text-sm font-mono">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800">
                <span className="text-xs text-gray-500">App.tsx</span>
                <button onClick={()=>{setCopied(true);setTimeout(()=>setCopied(false),2000)}} className="text-xs text-gray-400 hover:text-gray-200 flex items-center gap-1.5 transition-colors">{copied?"✓ Copied":"⎘ Copy"}</button>
              </div>
              <div className="overflow-x-auto p-4">
                <pre className="text-gray-300 text-xs leading-relaxed">{code}</pre>
              </div>
            </div>
          }
          code={`<CodeBlock\n  code={code}\n  language="tsx"\n  showLineNumbers\n  showCopy\n  theme="dark"\n/>`}
        />
      </Section>
      <Section title="Light Theme">
        <CodePreview
          preview={
            <div className="relative rounded-xl bg-gray-50 border border-gray-200 overflow-hidden text-sm font-mono">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200">
                <span className="text-xs text-gray-400">example.ts</span>
                <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1.5">⎘ Copy</button>
              </div>
              <div className="p-4">
                <pre className="text-gray-700 text-xs leading-relaxed">{`const greeting = "Hello, World!";\nconsole.log(greeting);`}</pre>
              </div>
            </div>
          }
          code={`<CodeBlock code={code} theme="light" />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Snackbar ─────────────────────────────────────────────────────────────── */
export const SnackbarPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "snackbar")!;
  const [active, setActive] = useState<{msg:string;variant:string}|null>(null);
  const show = (msg: string, variant: string) => { setActive({msg,variant}); setTimeout(()=>setActive(null),3000); };
  const variantCls: Record<string,string> = { default:"bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900", success:"bg-green-600 text-white", error:"bg-red-600 text-white", warning:"bg-yellow-500 text-white", info:"bg-blue-600 text-white" };
  return (
    <div>
      <PageHeader slug="snackbar" />
      <Section title="Trigger Snackbars">
        <CodePreview
          preview={
            <div className="relative min-h-[120px]">
              <div className="flex flex-wrap gap-2">
                {["default","success","error","warning","info"].map(v => (
                  <Btn key={v} variant="secondary" size="sm" label={v} onClick={() => show(`This is a ${v} snackbar!`, v)} />
                ))}
              </div>
              {active && (
                <div className={cn("absolute bottom-0 left-0 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all", variantCls[active.variant])}>
                  {active.msg}
                  <button onClick={()=>setActive(null)} className="opacity-70 hover:opacity-100 ml-2">✕</button>
                </div>
              )}
            </div>
          }
          code={`const { show } = useSnackbar();\n\n<Button onClick={() => show({ message: "Saved!", variant: "success" })} />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── AlertDialog ──────────────────────────────────────────────────────────── */
export const AlertDialogPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "alert-dialog")!;
  const [open, setOpen] = useState<string|null>(null);
  const variants: Record<string,{color:string;icon:string;title:string;msg:string;confirmCls:string}> = {
    danger:{color:"border-red-200 dark:border-red-800",icon:"🗑️",title:"Delete item?",msg:"This action cannot be undone. The item will be permanently deleted.",confirmCls:"bg-red-600 hover:bg-red-700 text-white"},
    warning:{color:"border-yellow-200 dark:border-yellow-800",icon:"⚠️",title:"Proceed with caution",msg:"This operation may affect other users in your organization.",confirmCls:"bg-yellow-600 hover:bg-yellow-700 text-white"},
    info:{color:"border-blue-200 dark:border-blue-800",icon:"ℹ️",title:"Confirm action",msg:"Are you sure you want to proceed? This will update your preferences.",confirmCls:"bg-blue-600 hover:bg-blue-700 text-white"},
  };
  return (
    <div>
      <PageHeader slug="alert-dialog" />
      <Section title="Variants">
        <CodePreview
          preview={
            <div className="relative">
              <div className="flex gap-2 flex-wrap">
                {(["danger","warning","info"] as const).map(v => (
                  <Btn key={v} variant={v==="danger"?"danger":v==="warning"?"secondary":"outline"} size="sm" label={`${v.charAt(0).toUpperCase()+v.slice(1)} dialog`} onClick={()=>setOpen(v)} />
                ))}
              </div>
              {open && variants[open] && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={()=>setOpen(null)}>
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                  <div className={cn("relative bg-white dark:bg-gray-900 rounded-2xl border p-6 w-full max-w-sm shadow-2xl", variants[open].color)} onClick={e=>e.stopPropagation()}>
                    <div className="text-3xl mb-3">{variants[open].icon}</div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">{variants[open].title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{variants[open].msg}</p>
                    <div className="flex gap-2 justify-end">
                      <Btn variant="secondary" size="sm" label="Cancel" onClick={()=>setOpen(null)} />
                      <button onClick={()=>setOpen(null)} className={cn("h-8 px-4 text-sm rounded-lg font-medium transition-colors", variants[open].confirmCls)}>Confirm</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          }
          code={`<AlertDialog\n  open={open}\n  onClose={() => setOpen(false)}\n  onConfirm={handleDelete}\n  title="Delete item?"\n  variant="danger"\n>This cannot be undone.</AlertDialog>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Drawer ───────────────────────────────────────────────────────────────── */
export const DrawerPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "drawer")!;
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<"left"|"right"|"top"|"bottom">("right");
  const placementCls: Record<string,string> = {
    right:"right-0 top-0 h-full w-80 translate-x-0",
    left:"left-0 top-0 h-full w-80",
    top:"top-0 left-0 w-full h-64",
    bottom:"bottom-0 left-0 w-full h-64",
  };
  return (
    <div>
      <PageHeader slug="drawer" />
      <Section title="Placement">
        <CodePreview
          preview={
            <div>
              <div className="flex flex-wrap gap-2">
                {(["right","left","top","bottom"] as const).map(p => (
                  <Btn key={p} variant="secondary" size="sm" label={`${p.charAt(0).toUpperCase()+p.slice(1)} drawer`} onClick={()=>{setPlacement(p);setOpen(true)}} />
                ))}
              </div>
              {open && (
                <div className="fixed inset-0 z-50" onClick={()=>setOpen(false)}>
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                  <div className={cn("absolute bg-white dark:bg-gray-900 shadow-2xl flex flex-col", placementCls[placement])} onClick={e=>e.stopPropagation()}>
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{placement.charAt(0).toUpperCase()+placement.slice(1)} Drawer</h3>
                      <button onClick={()=>setOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">✕</button>
                    </div>
                    <div className="flex-1 p-5 text-sm text-gray-600 dark:text-gray-400">Drawer content goes here. This panel slides in from the {placement}.</div>
                  </div>
                </div>
              )}
            </div>
          }
          code={`<Drawer open={open} onClose={() => setOpen(false)} placement="right">\n  <DrawerHeader>Title</DrawerHeader>\n  <DrawerBody>Content</DrawerBody>\n</Drawer>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Spinner ──────────────────────────────────────────────────────────────── */
export const SpinnerPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "spinner")!;
  return (
    <div>
      <PageHeader slug="spinner" />
      <Section title="Variants">
        <CodePreview
          preview={
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 animate-spin" />
                <span className="text-xs text-gray-400">border</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-1">
                  {[0,1,2].map(i=><div key={i} className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{animationDelay:`${i*0.15}s`}} />)}
                </div>
                <span className="text-xs text-gray-400">dots</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-xs text-gray-400">grow</span>
              </div>
            </div>
          }
          code={`<Spinner variant="border" />\n<Spinner variant="dots" />\n<Spinner variant="grow" />`}
        />
      </Section>
      <Section title="Sizes & Colors">
        <CodePreview
          preview={
            <div className="flex items-end gap-4">
              {["xs","sm","md","lg","xl"].map((s,i) => {
                const sz = [16,20,24,32,40];
                return <div key={s} className="rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 animate-spin" style={{width:sz[i],height:sz[i]}} />;
              })}
            </div>
          }
          code={`<Spinner size="xs" />\n<Spinner size="sm" />\n<Spinner size="md" />\n<Spinner size="lg" />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Popover ──────────────────────────────────────────────────────────────── */
export const PopoverPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "popover")!;
  const [open, setOpen] = useState(false);
  return (
    <div>
      <PageHeader slug="popover" />
      <Section title="Basic Popover">
        <CodePreview
          preview={
            <div className="flex items-start gap-4 min-h-40">
              <div className="relative">
                <Btn variant="secondary" size="sm" label="Open Popover" onClick={()=>setOpen(o=>!o)} />
                {open && (
                  <div className="absolute left-0 top-full mt-2 z-10 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4">
                    <div className="absolute -top-1.5 left-4 w-3 h-3 bg-white dark:bg-gray-800 border-l border-t border-gray-200 dark:border-gray-700 rotate-45" />
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Popover Title</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">This is a popover. It can contain any content like text, buttons, or forms.</p>
                    <Btn variant="primary" size="sm" label="Action" onClick={()=>setOpen(false)} />
                  </div>
                )}
              </div>
            </div>
          }
          code={`<Popover\n  trigger={<Button label="Open" />}\n  placement="bottom"\n>\n  <PopoverContent>Your content here</PopoverContent>\n</Popover>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Breadcrumb ───────────────────────────────────────────────────────────── */
export const BreadcrumbPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "breadcrumb")!;
  const items = [["Home","/"],["Products","/products"],["Electronics","/products/electronics"],["Phones",null]];
  return (
    <div>
      <PageHeader slug="breadcrumb" />
      <Section title="Default (slash separator)">
        <CodePreview
          preview={
            <nav className="flex items-center gap-1 text-sm">
              {items.map(([label,href],i)=>(
                <span key={i} className="flex items-center gap-1">
                  {i>0&&<span className="text-gray-300 dark:text-gray-600">/</span>}
                  {href ? <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">{label}</a> : <span className="text-gray-900 dark:text-gray-100 font-medium">{label}</span>}
                </span>
              ))}
            </nav>
          }
          code={`<Breadcrumb\n  items={[\n    { label: "Home", href: "/" },\n    { label: "Products", href: "/products" },\n    { label: "Phones" },\n  ]}\n/>`}
        />
      </Section>
      <Section title="Custom Separators">
        <CodePreview
          preview={
            <div className="space-y-3">
              {["›","→","·"].map(sep=>(
                <nav key={sep} className="flex items-center gap-1.5 text-sm">
                  {["Home","Products","Phones"].map((l,i)=>(
                    <span key={i} className="flex items-center gap-1.5">
                      {i>0&&<span className="text-gray-300 dark:text-gray-600">{sep}</span>}
                      {i<2 ? <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">{l}</a> : <span className="text-gray-900 dark:text-gray-100 font-medium">{l}</span>}
                    </span>
                  ))}
                </nav>
              ))}
            </div>
          }
          code={`<Breadcrumb separator="›" items={items} />\n<Breadcrumb separator="→" items={items} />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Pagination ───────────────────────────────────────────────────────────── */
export const PaginationPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "pagination")!;
  const [page, setPage] = useState(5);
  const total = 10;
  return (
    <div>
      <PageHeader slug="pagination" />
      <Section title="Default">
        <CodePreview
          preview={
            <div className="space-y-4">
              <div className="flex items-center gap-1">
                <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40">‹</button>
                {Array.from({length:total},(_,i)=>i+1).map(p=>{
                  if(p===1||p===total||Math.abs(p-page)<=1) return <button key={p} onClick={()=>setPage(p)} className={cn("w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors", p===page?"bg-blue-600 text-white":"border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800")}>{p}</button>;
                  if(p===2&&page>4||p===total-1&&page<total-3) return <span key={p} className="w-8 text-center text-gray-400">…</span>;
                  return null;
                })}
                <button onClick={()=>setPage(p=>Math.min(total,p+1))} disabled={page===total} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40">›</button>
              </div>
              <p className="text-xs text-gray-400">Page {page} of {total}</p>
            </div>
          }
          code={`<Pagination\n  total={100}\n  page={page}\n  pageSize={10}\n  onChange={setPage}\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Stepper ──────────────────────────────────────────────────────────────── */
export const StepperPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "stepper")!;
  const [step, setStep] = useState(1);
  const steps = ["Account","Profile","Review","Done"];
  return (
    <div>
      <PageHeader slug="stepper" />
      <Section title="Horizontal Stepper">
        <CodePreview
          preview={
            <div className="space-y-6">
              <div className="flex items-center">
                {steps.map((s,i)=>(
                  <div key={i} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all", i<step?"bg-blue-600 text-white":i===step?"bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-950":"bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400")}>
                        {i<step?"✓":i+1}
                      </div>
                      <span className={cn("text-xs mt-1 font-medium",i<=step?"text-blue-600 dark:text-blue-400":"text-gray-400")}>{s}</span>
                    </div>
                    {i<steps.length-1&&<div className={cn("flex-1 h-0.5 mx-2 mb-5",i<step?"bg-blue-600":"bg-gray-200 dark:bg-gray-700")} />}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Btn variant="secondary" size="sm" label="Back" onClick={()=>setStep(p=>Math.max(0,p-1))} disabled={step===0} />
                <Btn variant="primary" size="sm" label={step===steps.length-1?"Finish":"Next"} onClick={()=>setStep(p=>Math.min(steps.length-1,p+1))} />
              </div>
            </div>
          }
          code={`<Stepper\n  steps={steps}\n  currentStep={step}\n/>`}
        />
      </Section>
      <Section title="Vertical">
        <CodePreview
          preview={
            <div className="relative pl-6 max-w-xs space-y-0">
              <div className="absolute left-3.5 top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-700" />
              {steps.map((s,i)=>(
                <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                  <div className={cn("relative z-10 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0", i<step?"bg-blue-600 text-white":i===step?"bg-blue-600 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-500")}>
                    {i<step?"✓":i+1}
                  </div>
                  <div>
                    <p className={cn("text-sm font-medium", i<=step?"text-gray-900 dark:text-gray-100":"text-gray-400")}>{s}</p>
                    {i===step&&<p className="text-xs text-gray-500 mt-0.5">Current step</p>}
                  </div>
                </div>
              ))}
            </div>
          }
          code={`<Stepper steps={steps} orientation="vertical" />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Dropdown ─────────────────────────────────────────────────────────────── */
export const DropdownPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "dropdown")!;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if(ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const items = [{icon:"👤",label:"Profile"},{icon:"⚙️",label:"Settings"},{icon:"🔔",label:"Notifications"},{divider:true},{icon:"🚪",label:"Logout",danger:true}];
  return (
    <div>
      <PageHeader slug="dropdown" />
      <Section title="Menu Dropdown">
        <CodePreview
          preview={
            <div className="min-h-40 flex items-start gap-4">
              <div className="relative" ref={ref}>
                <Btn variant="secondary" size="sm" label={`Menu ▾`} onClick={()=>setOpen(o=>!o)} />
                {open && (
                  <div className="absolute left-0 top-full mt-1 z-10 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1 overflow-hidden">
                    {items.map((item,i) => (
                      (item as any).divider
                        ? <div key={i} className="my-1 border-t border-gray-100 dark:border-gray-700" />
                        : <button key={i} onClick={()=>setOpen(false)} className={cn("w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors", (item as any).danger?"text-red-600 dark:text-red-400":"text-gray-700 dark:text-gray-300")}>
                            <span>{(item as any).icon}</span>{(item as any).label}
                          </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          }
          code={`<Dropdown\n  trigger={<Button label="Menu" />}\n  items={[\n    { label: "Profile", icon: <UserIcon /> },\n    { label: "Settings", icon: <SettingsIcon /> },\n    { divider: true },\n    { label: "Logout", danger: true },\n  ]}\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Command ──────────────────────────────────────────────────────────────── */
export const CommandPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "command")!;
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const cmds = [{icon:"🏠",label:"Go to Home",group:"Navigation"},{icon:"⚙️",label:"Open Settings",group:"Navigation"},{icon:"👤",label:"View Profile",group:"Navigation"},{icon:"📄",label:"New Document",group:"Actions"},{icon:"📋",label:"Copy Link",group:"Actions"},{icon:"🎨",label:"Toggle Theme",group:"Actions"}];
  const filtered = cmds.filter(c=>c.label.toLowerCase().includes(q.toLowerCase()));
  const groups = [...new Set(filtered.map(c=>c.group))];
  return (
    <div>
      <PageHeader slug="command" />
      <Section title="Command Palette">
        <CodePreview
          preview={
            <div>
              <div className="flex items-center gap-2">
                <Btn variant="secondary" size="sm" label="Open Command Palette" onClick={()=>setOpen(true)} />
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 text-xs rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 font-mono">⌘</kbd>
                  <kbd className="px-1.5 py-0.5 text-xs rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 font-mono">K</kbd>
                </div>
              </div>
              {open && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4" onClick={()=>{setOpen(false);setQ("");}}>
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                  <div className="relative bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden" onClick={e=>e.stopPropagation()}>
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-gray-400">🔍</span>
                      <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Type a command or search…" className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 outline-none" />
                      <kbd className="text-xs text-gray-400 border border-gray-200 dark:border-gray-600 rounded px-1">Esc</kbd>
                    </div>
                    <div className="max-h-64 overflow-y-auto py-2">
                      {groups.map(g=>(
                        <div key={g}>
                          <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">{g}</p>
                          {filtered.filter(c=>c.group===g).map(c=>(
                            <button key={c.label} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={()=>{setOpen(false);setQ("");}}>
                              <span>{c.icon}</span>{c.label}
                            </button>
                          ))}
                        </div>
                      ))}
                      {filtered.length===0&&<p className="px-4 py-6 text-center text-sm text-gray-400">No results for "{q}"</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          }
          code={`<Command\n  open={open}\n  onClose={() => setOpen(false)}\n  placeholder="Type a command…"\n  items={commands}\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── NavigationMenu ───────────────────────────────────────────────────────── */
export const NavigationMenuPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "navigation-menu")!;
  const [flyout, setFlyout] = useState<string|null>(null);
  const navItems = [
    { label:"Products", children:["Design System","Components","Icons","Templates"] },
    { label:"Docs", children:["Getting Started","API Reference","Examples"] },
    { label:"Blog", children:[] },
    { label:"Pricing", children:[] },
  ];
  return (
    <div>
      <PageHeader slug="navigation-menu" />
      <Section title="Horizontal with Flyouts">
        <CodePreview
          preview={
            <div className="relative">
              <nav className="flex items-center gap-1 px-2 py-1.5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                {navItems.map(item=>(
                  <div key={item.label} className="relative">
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onMouseEnter={()=>item.children.length&&setFlyout(item.label)}
                      onMouseLeave={()=>setFlyout(null)}
                    >
                      {item.label}{item.children.length>0&&<span className="text-xs text-gray-400">▾</span>}
                    </button>
                    {flyout===item.label&&item.children.length>0&&(
                      <div className="absolute left-0 top-full mt-1 z-10 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1" onMouseEnter={()=>setFlyout(item.label)} onMouseLeave={()=>setFlyout(null)}>
                        {item.children.map(c=><a key={c} href="#" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">{c}</a>)}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          }
          code={`<NavigationMenu\n  items={[\n    { label: "Products", children: [...] },\n    { label: "Docs", children: [...] },\n  ]}\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── FloatingNav ──────────────────────────────────────────────────────────── */
export const FloatingNavPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "floating-nav")!;
  return (
    <div>
      <PageHeader slug="floating-nav" />
      <Section title="Preview">
        <CodePreview
          preview={
            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden h-40">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                <nav className="flex items-center gap-1 px-3 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full border border-gray-200 dark:border-gray-700 shadow-lg">
                  {["Home","About","Work","Contact"].map(l=>(
                    <a key={l} href="#" className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">{l}</a>
                  ))}
                </nav>
              </div>
              <p className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-400">Scroll to trigger the floating nav</p>
            </div>
          }
          code={`<FloatingNav\n  items={[\n    { label: "Home", href: "/" },\n    { label: "About", href: "/about" },\n    { label: "Work", href: "/work" },\n    { label: "Contact", href: "/contact" },\n  ]}\n  showAfter={100}\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Box ──────────────────────────────────────────────────────────────────── */
export const BoxPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "box")!;
  return (
    <div>
      <PageHeader slug="box" />
      <Section title="Polymorphic Usage">
        <CodePreview
          preview={
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-sm text-blue-700 dark:text-blue-300">Box as div (default) — a general-purpose container</div>
              <section className="p-4 bg-green-50 dark:bg-green-950/30 rounded-xl text-sm text-green-700 dark:text-green-300">Box as section — semantic HTML element</section>
              <article className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-sm text-purple-700 dark:text-purple-300">Box as article — for self-contained content</article>
            </div>
          }
          code={`<Box>Default div</Box>\n<Box as="section">As section</Box>\n<Box as="article">As article</Box>\n<Box as="button" onClick={fn}>As button</Box>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Container ────────────────────────────────────────────────────────────── */
export const ContainerPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "container")!;
  const sizes = ["sm","md","lg","xl","2xl"];
  const maxW: Record<string,string> = { sm:"384px",md:"448px",lg:"512px",xl:"576px","2xl":"672px" };
  return (
    <div>
      <PageHeader slug="container" />
      <Section title="Max Width Variants">
        <CodePreview
          preview={
            <div className="space-y-2 w-full">
              {sizes.map(s=>(
                <div key={s} className="relative">
                  <div className="h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center px-3" style={{maxWidth:maxW[s]}}>
                    <span className="text-xs font-medium text-blue-700 dark:text-blue-300">max-{s} ({maxW[s]})</span>
                  </div>
                </div>
              ))}
            </div>
          }
          code={`<Container maxWidth="sm">Small container</Container>\n<Container maxWidth="lg">Large container</Container>\n<Container maxWidth="2xl">Extra-large container</Container>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Stack ────────────────────────────────────────────────────────────────── */
export const StackPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "stack")!;
  return (
    <div>
      <PageHeader slug="stack" />
      <Section title="Vertical Stack">
        <CodePreview
          preview={
            <div className="flex flex-col gap-3 max-w-xs">
              {["Item 1","Item 2","Item 3"].map(l=><div key={l} className="px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">{l}</div>)}
            </div>
          }
          code={`<Stack direction="column" spacing={3}>\n  <div>Item 1</div>\n  <div>Item 2</div>\n  <div>Item 3</div>\n</Stack>`}
        />
      </Section>
      <Section title="Horizontal Stack with Dividers">
        <CodePreview
          preview={
            <div className="flex items-center gap-0">
              {["Home","About","Work"].map((l,i)=>(
                <div key={i} className="flex items-center">
                  {i>0&&<div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-3" />}
                  <span className="text-sm text-gray-700 dark:text-gray-300">{l}</span>
                </div>
              ))}
            </div>
          }
          code={`<Stack direction="row" spacing={3} divider>\n  <span>Home</span>\n  <span>About</span>\n  <span>Work</span>\n</Stack>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Grid ─────────────────────────────────────────────────────────────────── */
export const GridPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "grid")!;
  return (
    <div>
      <PageHeader slug="grid" />
      <Section title="Responsive Grid">
        <CodePreview
          preview={
            <div className="grid grid-cols-3 gap-3">
              {Array.from({length:6},(_,i)=>(
                <div key={i} className="h-16 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-sm font-medium text-blue-700 dark:text-blue-300">
                  {i+1}
                </div>
              ))}
            </div>
          }
          code={`<Grid cols={3} gap={4}>\n  <GridItem>1</GridItem>\n  <GridItem>2</GridItem>\n  <GridItem colSpan={2}>3 (spans 2)</GridItem>\n</Grid>`}
        />
      </Section>
      <Section title="12-Column Layout">
        <CodePreview
          preview={
            <div className="grid grid-cols-12 gap-2">
              {[[8,"Main content"],[4,"Sidebar"],[6,"Half"],[6,"Half"]].map(([span,label],i)=>(
                <div key={i} className={`col-span-${span} h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs font-medium text-purple-700 dark:text-purple-300`}>
                  {label} ({span}/12)
                </div>
              ))}
            </div>
          }
          code={`<Grid cols={12} gap={2}>\n  <GridItem colSpan={8}>Main</GridItem>\n  <GridItem colSpan={4}>Sidebar</GridItem>\n</Grid>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Divider ──────────────────────────────────────────────────────────────── */
export const DividerPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "divider")!;
  return (
    <div>
      <PageHeader slug="divider" />
      <Section title="Horizontal">
        <CodePreview
          preview={
            <div className="space-y-4 max-w-md">
              <div className="h-px bg-gray-200 dark:bg-gray-700" />
              <div className="relative flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" /><span className="text-xs text-gray-400 bg-white dark:bg-gray-900 px-2">OR</span><div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="h-px border-t border-dashed border-gray-300 dark:border-gray-600" />
            </div>
          }
          code={`<Divider />\n<Divider label="OR" />\n<Divider dashed />`}
        />
      </Section>
      <Section title="Vertical">
        <CodePreview
          preview={
            <div className="flex items-center gap-4 h-10">
              <span className="text-sm text-gray-600 dark:text-gray-400">Left</span>
              <div className="w-px h-full bg-gray-200 dark:bg-gray-700" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Right</span>
              <div className="w-px h-full border-l border-dashed border-gray-300 dark:border-gray-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">More</span>
            </div>
          }
          code={`<Divider orientation="vertical" />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── AspectRatio ──────────────────────────────────────────────────────────── */
export const AspectRatioPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "aspect-ratio")!;
  const ratios: [string, number][] = [["1:1",1],["4:3",4/3],["16:9",16/9],["21:9",21/9]];
  return (
    <div>
      <PageHeader slug="aspect-ratio" />
      <Section title="Common Ratios">
        <CodePreview
          preview={
            <div className="grid grid-cols-2 gap-4 max-w-md">
              {ratios.map(([label,r])=>(
                <div key={label}>
                  <div className="w-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center text-sm font-medium text-blue-700 dark:text-blue-300" style={{paddingTop:`${(1/r)*100}%`,position:"relative"}}>
                    <span className="absolute inset-0 flex items-center justify-center">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          }
          code={`<AspectRatio ratio="1/1"><img src="..." /></AspectRatio>\n<AspectRatio ratio="16/9"><video src="..." /></AspectRatio>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── ScrollArea ───────────────────────────────────────────────────────────── */
export const ScrollAreaPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "scroll-area")!;
  const items = Array.from({length:20},(_,i)=>`Scroll item ${i+1}`);
  return (
    <div>
      <PageHeader slug="scroll-area" />
      <Section title="Vertical Scroll">
        <CodePreview
          preview={
            <div className="max-h-48 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              {items.map((item,i)=>(
                <div key={i} className={cn("px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300", i>0&&"border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800")}>{item}</div>
              ))}
            </div>
          }
          code={`<ScrollArea maxHeight="300px">\n  {items.map(item => <div key={item}>{item}</div>)}\n</ScrollArea>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Resizable ────────────────────────────────────────────────────────────── */
export const ResizablePage = () => {
  const meta = COMPONENTS.find(c => c.slug === "resizable")!;
  const [w, setW] = useState(260);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startW = useRef(0);
  return (
    <div>
      <PageHeader slug="resizable" />
      <Section title="Horizontal Resize">
        <CodePreview
          preview={
            <div className="flex border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden h-40"
              onMouseMove={e => { if(dragging.current) { setW(Math.max(100,Math.min(400,startW.current+(e.clientX-startX.current)))); } }}
              onMouseUp={() => { dragging.current=false; }}
            >
              <div className="bg-gray-50 dark:bg-gray-800 p-3 text-xs text-gray-500 flex-none" style={{width:w}}>Resizable panel ({w}px)</div>
              <div className="w-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 cursor-col-resize transition-colors flex-none"
                onMouseDown={e => { dragging.current=true; startX.current=e.clientX; startW.current=w; }}
              />
              <div className="flex-1 p-3 text-xs text-gray-500 bg-white dark:bg-gray-900">Main content</div>
            </div>
          }
          code={`<Resizable direction="horizontal">\n  <div>Sidebar</div>\n  <div>Main content</div>\n</Resizable>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Paper ────────────────────────────────────────────────────────────────── */
export const PaperPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "paper")!;
  return (
    <div>
      <PageHeader slug="paper" />
      <Section title="Elevation Levels">
        <CodePreview
          preview={
            <div className="flex flex-wrap gap-4 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-xl">
              {[0,1,2,3,4,5].map(e=>(
                <div key={e} className="bg-white dark:bg-gray-900 rounded-xl p-4 text-sm font-medium text-gray-700 dark:text-gray-300 w-24 text-center" style={{boxShadow:["none","0 1px 3px rgba(0,0,0,.08)","0 2px 8px rgba(0,0,0,.1)","0 4px 16px rgba(0,0,0,.12)","0 8px 24px rgba(0,0,0,.14)","0 16px 40px rgba(0,0,0,.16)"][e]}}>
                  Level {e}
                </div>
              ))}
            </div>
          }
          code={`<Paper elevation={0}>Flat</Paper>\n<Paper elevation={1}>Subtle</Paper>\n<Paper elevation={4}>Raised</Paper>`}
        />
      </Section>
      <Section title="Variants">
        <CodePreview
          preview={
            <div className="flex gap-4 flex-wrap">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-sm text-gray-700 dark:text-gray-300 shadow-md">Elevated</div>
              <div className="bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-sm text-gray-700 dark:text-gray-300">Outlined</div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-sm text-gray-700 dark:text-gray-300">Filled</div>
            </div>
          }
          code={`<Paper variant="elevated">Elevated</Paper>\n<Paper variant="outlined">Outlined</Paper>\n<Paper variant="filled">Filled</Paper>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── AppBar ───────────────────────────────────────────────────────────────── */
export const AppBarPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "app-bar")!;
  return (
    <div>
      <PageHeader slug="app-bar" />
      <Section title="Default AppBar">
        <CodePreview
          preview={
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="h-14 px-4 flex items-center gap-3 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
                <span className="font-bold text-gray-900 dark:text-gray-100">My App</span>
                <div className="ml-auto flex items-center gap-2">
                  <button className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Docs</button>
                  <button className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Blog</button>
                  <button className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">Sign in</button>
                </div>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800/30 text-xs text-gray-400 text-center">Page content</div>
            </div>
          }
          code={`<AppBar position="sticky">\n  <AppBarStart>My App</AppBarStart>\n  <AppBarEnd><Button label="Sign in" /></AppBarEnd>\n</AppBar>`}
        />
      </Section>
      <Section title="Primary Color">
        <CodePreview
          preview={
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="h-14 px-4 flex items-center gap-3 bg-blue-600">
                <span className="font-bold text-white">My App</span>
                <div className="ml-auto flex items-center gap-2">
                  <button className="px-3 py-1.5 text-sm text-blue-100 hover:text-white">Docs</button>
                  <button className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-medium">Sign in</button>
                </div>
              </div>
            </div>
          }
          code={`<AppBar color="primary">...</AppBar>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Sidebar ──────────────────────────────────────────────────────────────── */
export const SidebarPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "sidebar")!;
  const [collapsed, setCollapsed] = useState(false);
  const navItems = [{icon:"🏠",label:"Dashboard"},{icon:"📊",label:"Analytics"},{icon:"👥",label:"Team"},{icon:"📄",label:"Documents"},{icon:"⚙️",label:"Settings"}];
  return (
    <div>
      <PageHeader slug="sidebar" />
      <Section title="Collapsible Sidebar">
        <CodePreview
          preview={
            <div className="flex h-64 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className={cn("bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300", collapsed?"w-14":"w-48")}>
                <div className="flex items-center justify-between px-3 py-3 border-b border-gray-100 dark:border-gray-800">
                  {!collapsed&&<span className="font-bold text-sm text-gray-900 dark:text-gray-100">Menu</span>}
                  <button onClick={()=>setCollapsed(c=>!c)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 ml-auto text-sm">{collapsed?"›":"‹"}</button>
                </div>
                <nav className="flex-1 py-2">
                  {navItems.map(item=>(
                    <button key={item.label} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                      <span className="text-base shrink-0">{item.icon}</span>
                      {!collapsed&&<span>{item.label}</span>}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-800/30 text-xs text-gray-400">Main content</div>
            </div>
          }
          code={`<Sidebar collapsed={collapsed} onToggle={setCollapsed}>\n  <SidebarGroup label="Main">\n    <SidebarItem icon={<HomeIcon />} href="/">Dashboard</SidebarItem>\n    <SidebarItem icon={<ChartIcon />} href="/analytics">Analytics</SidebarItem>\n  </SidebarGroup>\n</Sidebar>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── GlowCard ─────────────────────────────────────────────────────────────── */
export const GlowCardPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "glow-card")!;
  const [pos, setPos] = useState({x:0,y:0});
  const cardRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <PageHeader slug="glow-card" />
      <Section title="Interactive Glow">
        <CodePreview
          preview={
            <div
              ref={cardRef}
              className="relative max-w-xs rounded-2xl bg-gray-900 border border-gray-800 p-6 overflow-hidden cursor-pointer"
              onMouseMove={e=>{const r=cardRef.current!.getBoundingClientRect();setPos({x:e.clientX-r.left,y:e.clientY-r.top});}}
              onMouseLeave={()=>setPos({x:-999,y:-999})}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl transition-all duration-300" style={{background:`radial-gradient(300px circle at ${pos.x}px ${pos.y}px, rgba(120,119,198,0.15), transparent 60%)`}} />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-2xl mb-3">⚡</div>
                <h3 className="text-white font-semibold mb-1">GlowCard</h3>
                <p className="text-gray-400 text-sm">Hover to see the cursor-tracking glow effect in action.</p>
              </div>
            </div>
          }
          code={`<GlowCard\n  glowColor="rgba(120,119,198,0.15)"\n  borderGlow\n>\n  <CardContent />\n</GlowCard>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── BackgroundBeams ──────────────────────────────────────────────────────── */
export const BackgroundBeamsPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "background-beams")!;
  return (
    <div>
      <PageHeader slug="background-beams" />
      <Section title="Preview">
        <CodePreview
          preview={
            <div className="relative h-56 rounded-2xl overflow-hidden bg-gray-950 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 224" preserveAspectRatio="xMidYMid slice">
                {Array.from({length:8},(_,i)=>{
                  const angle = (i/8)*Math.PI*2;
                  const x2 = 200+Math.cos(angle)*300;
                  const y2 = 112+Math.sin(angle)*200;
                  return <line key={i} x1="200" y1="112" x2={x2} y2={y2} stroke={`rgba(99,102,241,${0.3-i*0.03})`} strokeWidth="0.5" />;
                })}
                <circle cx="200" cy="112" r="3" fill="rgba(139,92,246,0.8)" />
              </svg>
              <div className="relative text-center">
                <p className="text-white font-bold text-xl mb-1">Background Beams</p>
                <p className="text-gray-400 text-sm">Radiating SVG beams from center</p>
              </div>
            </div>
          }
          code={`<BackgroundBeams beamCount={8} color="rgba(99,102,241,0.5)">\n  <YourContent />\n</BackgroundBeams>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── WavyBackground ───────────────────────────────────────────────────────── */
export const WavyBackgroundPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "wavy-background")!;
  return (
    <div>
      <PageHeader slug="wavy-background" />
      <Section title="Preview">
        <CodePreview
          preview={
            <div className="relative h-48 rounded-2xl overflow-hidden bg-gray-950 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 192" preserveAspectRatio="xMidYMid slice">
                {[0,1,2,3].map(i=>(
                  <path key={i} d={`M 0 ${80+i*20} Q 100 ${60+i*20} 200 ${80+i*20} T 400 ${80+i*20} V 192 H 0 Z`} fill={`rgba(99,102,241,${0.1-i*0.02})`}>
                    <animate attributeName="d" dur={`${3+i}s`} repeatCount="indefinite" values={`M 0 ${80+i*20} Q 100 ${60+i*20} 200 ${80+i*20} T 400 ${80+i*20} V 192 H 0 Z;M 0 ${70+i*20} Q 100 ${90+i*20} 200 ${70+i*20} T 400 ${70+i*20} V 192 H 0 Z;M 0 ${80+i*20} Q 100 ${60+i*20} 200 ${80+i*20} T 400 ${80+i*20} V 192 H 0 Z`} />
                  </path>
                ))}
              </svg>
              <div className="relative text-center">
                <p className="text-white font-bold text-xl">Wavy Background</p>
                <p className="text-gray-300 text-sm mt-1">Animated SVG waves</p>
              </div>
            </div>
          }
          code={`<WavyBackground colors={["#4f46e5","#7c3aed"]} speed="slow">\n  <HeroContent />\n</WavyBackground>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── MovingBorder ─────────────────────────────────────────────────────────── */
export const MovingBorderPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "moving-border")!;
  return (
    <div>
      <PageHeader slug="moving-border" />
      <Section title="Animated Conic Border">
        <CodePreview
          preview={
            <div className="flex gap-4 flex-wrap">
              <div className="relative p-[2px] rounded-xl overflow-hidden" style={{background:"conic-gradient(from var(--angle,0deg),#4f46e5,#7c3aed,#ec4899,#4f46e5)"}}>
                <style>{`@property --angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; } @keyframes rot { to { --angle: 360deg; } }`}</style>
                <div className="bg-white dark:bg-gray-900 rounded-[10px] px-5 py-3 text-sm font-medium text-gray-900 dark:text-gray-100" style={{animation:"rot 3s linear infinite"}}>Moving Border</div>
              </div>
              <Btn variant="primary" size="md" label="Regular Button" />
            </div>
          }
          code={`<MovingBorder duration={3} color="#4f46e5">\n  <button>Click me</button>\n</MovingBorder>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── ThreeDCard ───────────────────────────────────────────────────────────── */
export const ThreeDCardPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "three-d-card")!;
  const [tilt, setTilt] = useState({rx:0,ry:0});
  const cardRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <PageHeader slug="three-d-card" />
      <Section title="Interactive 3D Tilt">
        <CodePreview
          preview={
            <div className="flex justify-center py-4" style={{perspective:"800px"}}>
              <div
                ref={cardRef}
                className="w-48 h-48 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl cursor-pointer select-none transition-transform duration-100"
                style={{transform:`rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.04)`,transformStyle:"preserve-3d"}}
                onMouseMove={e=>{const r=cardRef.current!.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)/(r.width/2);const y=(e.clientY-r.top-r.height/2)/(r.height/2);setTilt({rx:-y*15,ry:x*15});}}
                onMouseLeave={()=>setTilt({rx:0,ry:0})}
              >
                <div className="text-white text-center" style={{transform:"translateZ(30px)"}}>
                  <div className="text-3xl mb-2">🎯</div>
                  <p className="text-sm font-semibold">Hover me!</p>
                </div>
              </div>
            </div>
          }
          code={`<ThreeDCard rotateIntensity={20} scale={1.04}>\n  <CardContent />\n</ThreeDCard>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── CardSpotlight ────────────────────────────────────────────────────────── */
export const CardSpotlightPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "card-spotlight")!;
  const [pos, setPos] = useState({x:-999,y:-999});
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div>
      <PageHeader slug="card-spotlight" />
      <Section title="Cursor Spotlight Card">
        <CodePreview
          preview={
            <div
              ref={ref}
              className="relative max-w-sm rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 overflow-hidden cursor-pointer"
              onMouseMove={e=>{const r=ref.current!.getBoundingClientRect();setPos({x:e.clientX-r.left,y:e.clientY-r.top});}}
              onMouseLeave={()=>setPos({x:-999,y:-999})}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{background:`radial-gradient(250px circle at ${pos.x}px ${pos.y}px, rgba(59,130,246,0.1), transparent 70%)`}} />
              <div className="relative">
                <div className="text-2xl mb-3">⚡</div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">Card Spotlight</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Move your cursor around to see the spotlight effect following it.</p>
              </div>
            </div>
          }
          code={`<CardSpotlight spotlightColor="rgba(59,130,246,0.1)" radius={250}>\n  <CardContent />\n</CardSpotlight>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Carousel ─────────────────────────────────────────────────────────────── */
export const CarouselPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "carousel")!;
  const slides = [
    { bg:"from-blue-500 to-blue-700", emoji:"🚀", title:"Launch Fast" },
    { bg:"from-purple-500 to-purple-700", emoji:"⚡", title:"Build More" },
    { bg:"from-green-500 to-green-700", emoji:"🌟", title:"Ship Better" },
    { bg:"from-orange-500 to-orange-700", emoji:"🎯", title:"Hit Goals" },
  ];
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i=>(i-1+slides.length)%slides.length);
  const next = () => setIdx(i=>(i+1)%slides.length);
  return (
    <div>
      <PageHeader slug="carousel" />
      <Section title="Basic Carousel">
        <CodePreview
          preview={
            <div className="relative overflow-hidden rounded-2xl">
              <div className="relative h-48">
                {slides.map((s,i)=>(
                  <div key={i} className={cn(`bg-gradient-to-r ${s.bg} absolute inset-0 flex flex-col items-center justify-center text-white text-center transition-all duration-300`,i===idx?"opacity-100 translate-x-0":"opacity-0 translate-x-4 pointer-events-none")}>
                    <span className="text-5xl mb-2">{s.emoji}</span>
                    <h3 className="text-xl font-bold">{s.title}</h3>
                  </div>
                ))}
              </div>
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center text-lg transition-colors">‹</button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center text-lg transition-colors">›</button>
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {slides.map((_,i)=><button key={i} onClick={()=>setIdx(i)} className={cn("w-1.5 h-1.5 rounded-full transition-all",i===idx?"bg-white w-4":"bg-white/50")} />)}
              </div>
            </div>
          }
          code={`<Carousel items={slides} showArrows showDots loop />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Compare ──────────────────────────────────────────────────────────────── */
export const ComparePage = () => {
  const meta = COMPONENTS.find(c => c.slug === "compare")!;
  const [pos, setPos] = useState(50);
  return (
    <div>
      <PageHeader slug="compare" />
      <Section title="Before / After Slider">
        <CodePreview
          preview={
            <div className="relative h-48 rounded-xl overflow-hidden select-none cursor-col-resize" onMouseMove={e=>{ const r=e.currentTarget.getBoundingClientRect(); setPos(Math.min(100,Math.max(0,(e.clientX-r.left)/r.width*100))); }}>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center">
                <p className="text-gray-600 font-bold text-sm px-6 text-center">BEFORE — Low resolution, noisy</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center" style={{clipPath:`inset(0 ${100-pos}% 0 0)`}}>
                <p className="text-white font-bold text-sm px-6 text-center">AFTER — High resolution, crisp</p>
              </div>
              <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]" style={{left:`${pos}%`}}>
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-xs font-bold text-gray-600">⇄</div>
              </div>
            </div>
          }
          code={`<Compare\n  beforeSrc="/before.jpg"\n  afterSrc="/after.jpg"\n  initialPosition={50}\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── TracingBeam ──────────────────────────────────────────────────────────── */
export const TracingBeamPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "tracing-beam")!;
  return (
    <div>
      <PageHeader slug="tracing-beam" />
      <Section title="Preview">
        <CodePreview
          preview={
            <div className="relative flex gap-4 max-w-sm py-2">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/50 shrink-0" />
                <div className="w-0.5 flex-1 bg-gradient-to-b from-blue-500 to-transparent mt-1" />
              </div>
              <div className="flex-1 pb-4 space-y-4">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Section One</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Content that the beam traces alongside as you scroll down the page.</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">The beam follows your scroll position in real time.</p>
              </div>
            </div>
          }
          code={`<TracingBeam color="#3b82f6">\n  <Section>Your content</Section>\n  <Section>More content</Section>\n</TracingBeam>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── InfiniteMovingCards ──────────────────────────────────────────────────── */
export const InfiniteMovingCardsPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "infinite-moving-cards")!;
  const cards = ["⭐ Amazing component library","🚀 Easy to use","🎨 Beautiful designs","⚡ Blazing fast","🔧 Highly customizable","📦 Tree-shakeable"];
  return (
    <div>
      <PageHeader slug="infinite-moving-cards" />
      <Section title="Auto-Scrolling Rail">
        <CodePreview
          preview={
            <div className="relative overflow-hidden py-4">
              <div className="flex gap-4 w-max" style={{animation:"scroll 12s linear infinite"}}>
                {[...cards,...cards].map((c,i)=>(
                  <div key={i} className="px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">{c}</div>
                ))}
              </div>
              <style>{`@keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
            </div>
          }
          code={`<InfiniteMovingCards\n  items={cards}\n  direction="left"\n  speed="normal"\n  pauseOnHover\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── FocusCards ───────────────────────────────────────────────────────────── */
export const FocusCardsPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "focus-cards")!;
  const [hovered, setHovered] = useState<number|null>(null);
  const cards = [{emoji:"🌊",title:"Ocean"},{emoji:"🏔️",title:"Mountains"},{emoji:"🌸",title:"Spring"},{emoji:"🌅",title:"Sunset"},{emoji:"🏙️",title:"City"},{emoji:"🌿",title:"Forest"}];
  return (
    <div>
      <PageHeader slug="focus-cards" />
      <Section title="Hover to Focus">
        <CodePreview
          preview={
            <div className="grid grid-cols-3 gap-3">
              {cards.map((c,i)=>(
                <div
                  key={i}
                  className="relative rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 h-24 flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
                  style={{filter:hovered!==null&&hovered!==i?"blur(2px) brightness(0.7)":"none",transform:hovered===i?"scale(1.05)":"scale(1)"}}
                  onMouseEnter={()=>setHovered(i)}
                  onMouseLeave={()=>setHovered(null)}
                >
                  <span className="text-3xl">{c.emoji}</span>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-1">{c.title}</span>
                </div>
              ))}
            </div>
          }
          code={`<FocusCards\n  cards={cards.map(c => ({ title: c.title, src: c.image }))}\n  columns={3}\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── ExpandableCards ──────────────────────────────────────────────────────── */
export const ExpandableCardsPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "expandable-cards")!;
  const [expanded, setExpanded] = useState<number|null>(null);
  const cards = [{emoji:"📖",title:"The Art of Design",desc:"Explore the principles behind great visual design."},{emoji:"⚗️",title:"Science of Color",desc:"How color theory shapes user perception."},{emoji:"🔧",title:"Engineering UX",desc:"Building experiences that delight users at scale."}];
  return (
    <div>
      <PageHeader slug="expandable-cards" />
      <Section title="Click to Expand">
        <CodePreview
          preview={
            <div className="space-y-3">
              {cards.map((c,i)=>(
                <div key={i} className={cn("rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 cursor-pointer", expanded===i?"bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800":"bg-white dark:bg-gray-900")} onClick={()=>setExpanded(e=>e===i?null:i)}>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <span className="text-2xl">{c.emoji}</span>
                    <span className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">{c.title}</span>
                    <span className={cn("text-gray-400 transition-transform text-sm",expanded===i&&"rotate-180")}>▾</span>
                  </div>
                  {expanded===i&&<div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">{c.desc}</div>}
                </div>
              ))}
            </div>
          }
          code={`<ExpandableCards cards={cards} columns={3} />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── FloatingDock ─────────────────────────────────────────────────────────── */
export const FloatingDockPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "floating-dock")!;
  const [hov, setHov] = useState<number|null>(null);
  const items = [{emoji:"🏠",label:"Home"},{emoji:"📝",label:"Notes"},{emoji:"📷",label:"Photos"},{emoji:"🎵",label:"Music"},{emoji:"⚙️",label:"Settings"}];
  return (
    <div>
      <PageHeader slug="floating-dock" />
      <Section title="macOS-style Dock">
        <CodePreview
          preview={
            <div className="relative h-32 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-end justify-center pb-3">
              <div className="flex items-end gap-1 px-3 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                {items.map((item,i)=>{
                  const dist = hov!==null ? Math.abs(i-hov) : 3;
                  const scale = dist===0?1.6:dist===1?1.25:dist===2?1.1:1;
                  return (
                    <div key={i} className="flex flex-col items-center gap-0.5 transition-all duration-150" style={{transform:`scale(${scale})`,transformOrigin:"bottom center"}}
                      onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}>
                      <span className="text-lg">{item.emoji}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          }
          code={`<FloatingDock\n  items={[\n    { icon: <HomeIcon />, label: "Home", href: "/" },\n    { icon: <NotesIcon />, label: "Notes", href: "/notes" },\n  ]}\n  position="bottom"\n  magnification\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── AnimatedTestimonials ─────────────────────────────────────────────────── */
export const AnimatedTestimonialsPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "animated-testimonials")!;
  const [active, setActive] = useState(0);
  const testimonials = [
    { name:"Sarah Chen", role:"CTO at Finova", quote:"This component library saved us weeks of work. The quality is outstanding.", avatar:"SC" },
    { name:"Marcus Webb", role:"Lead Designer", quote:"Finally a UI library that doesn't compromise on design excellence.", avatar:"MW" },
    { name:"Priya Sharma", role:"Frontend Engineer", quote:"The DX is incredible. I'm shipping faster than ever before.", avatar:"PS" },
  ];
  const t = testimonials[active];
  return (
    <div>
      <PageHeader slug="animated-testimonials" />
      <Section title="Animated Testimonial Carousel">
        <CodePreview
          preview={
            <div className="max-w-md mx-auto">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">{t.avatar}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-4">"{t.quote}"</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{t.name}</p>
                <p className="text-xs text-gray-400">{t.role}</p>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_,i)=>(
                  <button key={i} onClick={()=>setActive(i)} className={cn("w-2 h-2 rounded-full transition-all",i===active?"bg-blue-600 w-5":"bg-gray-300 dark:bg-gray-600")} />
                ))}
              </div>
            </div>
          }
          code={`<AnimatedTestimonials\n  testimonials={[\n    { name: "Sarah Chen", quote: "...", role: "CTO", avatar: "/avatar.jpg" },\n  ]}\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Generic pages for remaining components using a rich template ─────────── */
const RichGenericPage = ({ slug, preview }: { slug: string; preview: React.ReactNode }) => {
  const meta = COMPONENTS.find(c => c.slug === slug);
  if (!meta) return null;
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{meta.name}</h1>
          <DocsBadge status={meta.status} />
        </div>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl">{meta.description}</p>
      </div>
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Preview</h2>
        {preview}
      </div>
      {meta.props && meta.props.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Props</h2>
          <PropsTable props={meta.props} />
        </div>
      )}
      <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-gray-400">⚡</span>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Import</p>
        </div>
        <code className="text-xs text-blue-600 dark:text-blue-400 font-mono">{`import { ${meta.name} } from "@aryanjain/ui";`}</code>
      </div>
    </div>
  );
};

export const SparklesPage = () => (
  <RichGenericPage slug="sparkles" preview={
    <div className="relative h-40 rounded-xl bg-gray-950 overflow-hidden flex items-center justify-center">
      {Array.from({length:20},(_,i)=>(
        <div key={i} className="absolute w-1 h-1 rounded-full bg-yellow-400" style={{left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,animation:`twinkle ${1+Math.random()*2}s ease-in-out infinite`,animationDelay:`${Math.random()*2}s`,opacity:Math.random()}} />
      ))}
      <style>{`@keyframes twinkle { 0%,100%{opacity:0;transform:scale(0)} 50%{opacity:1;transform:scale(1)} }`}</style>
      <p className="relative text-white font-bold text-xl">✨ Sparkles Effect</p>
    </div>
  } />
);

export const LampEffectPage = () => (
  <RichGenericPage slug="lamp-effect" preview={
    <div className="relative h-48 rounded-xl overflow-hidden bg-gray-950 flex items-end justify-center pb-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32" style={{background:"radial-gradient(ellipse at top, rgba(139,92,246,0.6) 0%, transparent 70%)"}} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-20 bg-gradient-to-b from-purple-400 to-transparent" />
      <p className="relative text-white font-bold text-lg">Lamp Effect</p>
    </div>
  } />
);

export const ContainerTextFlipPage = () => {
  const [idx, setIdx] = useState(0);
  const words = ["Beautiful","Accessible","Fast","Customizable"];
  useEffect(() => { const t = setInterval(()=>setIdx(i=>(i+1)%words.length),2000); return ()=>clearInterval(t); },[]);
  return (
    <RichGenericPage slug="container-text-flip" preview={
      <div className="py-8 flex items-center justify-center">
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Components that are{" "}
          <span key={idx} className="text-blue-600 dark:text-blue-400 inline-block transition-all duration-300" style={{animation:"flipIn 0.4s ease"}}>
            {words[idx]}
          </span>
          <style>{`@keyframes flipIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }`}</style>
        </p>
      </div>
    } />
  );
};

export const SpeedDialPage = () => {
  const [open, setOpen] = useState(false);
  const actions = [{emoji:"✉️",label:"Email"},{emoji:"📞",label:"Call"},{emoji:"💬",label:"Chat"},{emoji:"📅",label:"Calendar"}];
  return (
    <RichGenericPage slug="speed-dial" preview={
      <div className="relative h-48 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
        <div className="absolute bottom-4 right-4">
          <div className="flex flex-col-reverse items-end gap-2">
            {open && actions.map((a,i)=>(
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-lg shadow text-nowrap">{a.label}</span>
                <button className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center text-lg hover:scale-110 transition-transform">{a.emoji}</button>
              </div>
            ))}
            <button onClick={()=>setOpen(o=>!o)} className={cn("w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center text-2xl transition-transform duration-300", open&&"rotate-45")}>+</button>
          </div>
        </div>
      </div>
    } />
  );
};
