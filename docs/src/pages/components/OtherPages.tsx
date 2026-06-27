import { useState } from "react";
import { CodePreview } from "../../components/CodePreview";
import { PropsTable } from "../../components/PropsTable";
import { DocsBadge } from "../../components/DocsBadge";
import { COMPONENTS } from "../../data/components";

const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(" ");

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">{title}</h2>
    {children}
  </div>
);
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

/* ── Avatar ──────────────────────────────────────────────────────────────────── */
export const AvatarPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "avatar")!;
  const Av = ({ src, initials, size = "md", shape = "circle", status }: any) => {
    const sz: Record<string,string> = { xs:"w-6 h-6 text-[10px]", sm:"w-8 h-8 text-xs", md:"w-10 h-10 text-sm", lg:"w-12 h-12 text-base", xl:"w-16 h-16 text-xl", "2xl":"w-20 h-20 text-2xl" };
    const stC: Record<string,string> = { online:"bg-green-500", offline:"bg-gray-400", busy:"bg-red-500", away:"bg-yellow-500" };
    const stSz: Record<string,string> = { xs:"w-1.5 h-1.5", sm:"w-2 h-2", md:"w-2.5 h-2.5", lg:"w-3 h-3", xl:"w-3.5 h-3.5", "2xl":"w-4 h-4" };
    return (
      <span className={cn("relative inline-flex shrink-0 items-center justify-center font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 overflow-hidden", sz[size], shape === "circle" ? "rounded-full" : "rounded-lg")}>
        {src ? <img src={src} alt="" className="w-full h-full object-cover" /> : <span>{initials?.slice(0,2).toUpperCase() || "?"}</span>}
        {status && <span className={cn("absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-gray-900", stC[status], stSz[size])} />}
      </span>
    );
  };
  return (
    <div>
      <PageHeader slug="avatar" />
      <Section title="Sizes">
        <CodePreview
          preview={<div className="flex items-end gap-3">{(["xs","sm","md","lg","xl","2xl"] as const).map(s => <Av key={s} size={s} initials="AJ" />)}</div>}
          code={`<Avatar size="xs" initials="AJ" />\n<Avatar size="md" initials="AJ" />\n<Avatar size="xl" initials="AJ" />`}
        />
      </Section>
      <Section title="With Status">
        <CodePreview
          preview={<div className="flex gap-4">{(["online","offline","busy","away"] as const).map(s => <div key={s} className="flex flex-col items-center gap-1.5"><Av status={s} initials="AJ" size="lg" /><span className="text-xs text-gray-500">{s}</span></div>)}</div>}
          code={`<Avatar initials="AJ" status="online" />\n<Avatar initials="AJ" status="busy" />`}
        />
      </Section>
      <Section title="Avatar Group">
        <CodePreview
          preview={
            <div className="flex -space-x-2">
              {["AJ","RK","SM","PL","MQ"].map((i,idx) => (
                <span key={idx} className="ring-2 ring-white dark:ring-gray-900 rounded-full"><Av initials={i} /></span>
              ))}
              <span className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-gray-900 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium">+8</span>
            </div>
          }
          code={`<AvatarGroup max={5}>\n  {users.map(u => <Avatar key={u.id} src={u.avatar} />)}\n</AvatarGroup>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Skeleton ────────────────────────────────────────────────────────────────── */
export const SkeletonPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "skeleton")!;
  const Sk = ({ w, h, circle = false, lines }: any) => (
    lines ? (
      <div className="space-y-2">
        {Array.from({length:lines},(_,i)=>(
          <div key={i} className={cn("h-4 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse", i===lines-1?"w-3/4":"w-full")} />
        ))}
      </div>
    ) : (
      <div className={cn("bg-gray-200 dark:bg-gray-700 animate-pulse", circle?"rounded-full":"rounded-md")} style={{width:w,height:h||16}} />
    )
  );
  return (
    <div>
      <PageHeader slug="skeleton" />
      <Section title="Profile Card Skeleton">
        <CodePreview
          preview={
            <div className="flex items-start gap-4 p-4 max-w-sm rounded-xl border border-gray-200 dark:border-gray-700">
              <Sk w={48} h={48} circle />
              <div className="flex-1 space-y-2">
                <Sk w="60%" h={16} /><Sk w="40%" h={12} /><Sk lines={3} />
              </div>
            </div>
          }
          code={`<Skeleton variant="circular" width={48} height={48} />\n<Skeleton variant="text" lines={3} />`}
        />
      </Section>
      <Section title="Variants">
        <CodePreview
          preview={<div className="space-y-3 max-w-sm"><Sk w="100%" h={40} /><Sk w="100%" h={20} /><Sk w={48} h={48} circle /><div className="flex gap-2"><Sk w={80} h={24} /><Sk w={60} h={24} /></div></div>}
          code={`<Skeleton variant="rectangular" width="100%" height={40} />\n<Skeleton variant="text" />\n<Skeleton variant="circular" width={48} height={48} />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Progress ────────────────────────────────────────────────────────────────── */
export const ProgressPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "progress")!;
  const Bar = ({ value, color = "primary", label, showValue = false }: any) => {
    const c: Record<string,string> = { primary:"bg-blue-600", success:"bg-green-500", warning:"bg-yellow-500", danger:"bg-red-500" };
    return (
      <div className="w-full">
        {(label || showValue) && <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">{label && <span>{label}</span>}{showValue && <span>{value}%</span>}</div>}
        <div className="w-full h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div className={cn("h-full rounded-full transition-all duration-500", c[color])} style={{width:`${value}%`}} />
        </div>
      </div>
    );
  };
  const Circle = ({ value, color = "primary", size = 64 }: any) => {
    const c: Record<string,string> = { primary:"stroke-blue-600", success:"stroke-green-500", warning:"stroke-yellow-500", danger:"stroke-red-500" };
    const r = (size - 8) / 2; const circ = 2 * Math.PI * r;
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{transform:"rotate(-90deg)"}}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" className="stroke-gray-200 dark:stroke-gray-700" strokeWidth={8} />
          <circle cx={size/2} cy={size/2} r={r} fill="none" className={c[color]} strokeWidth={8} strokeDasharray={circ} strokeDashoffset={circ-(value/100)*circ} strokeLinecap="round" />
        </svg>
        <span className="absolute text-xs font-semibold text-gray-700 dark:text-gray-300">{value}%</span>
      </div>
    );
  };
  return (
    <div>
      <PageHeader slug="progress" />
      <Section title="Linear Progress">
        <CodePreview
          preview={<div className="space-y-4 max-w-sm"><Bar value={30} label="Storage" showValue color="primary" /><Bar value={65} color="success" label="Uploads" showValue /><Bar value={80} color="warning" label="Memory" showValue /><Bar value={92} color="danger" label="CPU" showValue /></div>}
          code={`<Progress value={30} label="Storage" showValue />\n<Progress value={65} color="success" label="Uploads" showValue />`}
        />
      </Section>
      <Section title="Circular Progress">
        <CodePreview
          preview={<div className="flex gap-6 items-center">{[{v:25,c:"primary"},{v:60,c:"success"},{v:80,c:"warning"},{v:95,c:"danger"}].map((x,i)=><Circle key={i} value={x.v} color={x.c} size={72} />)}</div>}
          code={`<Progress variant="circle" value={60} color="success" showValue />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Stat ────────────────────────────────────────────────────────────────────── */
export const StatPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "stat")!;
  return (
    <div>
      <PageHeader slug="stat" />
      <Section title="Stat Cards">
        <CodePreview
          preview={
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label:"Total Revenue", value:"$45,231", delta:"20.1%", trend:"up", desc:"vs last month", icon:"💰" },
                { label:"Active Users", value:"2,350", delta:"10.5%", trend:"up", desc:"vs last week", icon:"👥" },
                { label:"Conversion", value:"3.24%", delta:"1.2%", trend:"down", desc:"vs last month", icon:"📈" },
                { label:"Avg. Order", value:"$59.00", delta:"0%", trend:"neutral", desc:"no change", icon:"🛒" },
              ].map((s,i) => (
                <div key={i} className="flex flex-col gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
                    <span className="text-xl">{s.icon}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{s.value}</p>
                  <div className="flex items-center gap-1.5">
                    <span className={cn("text-sm font-semibold", s.trend==="up"?"text-green-600 dark:text-green-400":s.trend==="down"?"text-red-600 dark:text-red-400":"text-gray-500")}>
                      {s.trend==="up"?"↑":s.trend==="down"?"↓":"→"} {s.delta}
                    </span>
                    <span className="text-xs text-gray-400">{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          }
          code={`<Stat label="Total Revenue" value="$45,231" delta="20.1%" trend="up" description="vs last month" icon={<CurrencyIcon />} />`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Alert ───────────────────────────────────────────────────────────────────── */
export const AlertPage = () => {
  const [dismissed, setDismissed] = useState(false);
  const meta = COMPONENTS.find(c => c.slug === "alert")!;
  const AlertUI = ({ variant="default", title, children, onClose }: any) => {
    const v: Record<string,string> = {
      default:"bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200",
      info:"bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200",
      success:"bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200",
      warning:"bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200",
      danger:"bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200",
    };
    const icons: Record<string,string> = { default:"ℹ", info:"ℹ", success:"✓", warning:"⚠", danger:"✕" };
    return (
      <div className={cn("flex gap-3 rounded-lg border p-4", v[variant])}>
        <span className="mt-0.5 shrink-0 font-bold">{icons[variant]}</span>
        <div className="flex-1">
          {title && <p className="font-semibold mb-0.5">{title}</p>}
          {children && <div className="text-sm opacity-90">{children}</div>}
        </div>
        {onClose && <button onClick={onClose} className="shrink-0 ml-auto opacity-60 hover:opacity-100 text-lg leading-none">×</button>}
      </div>
    );
  };
  return (
    <div>
      <PageHeader slug="alert" />
      <Section title="Variants">
        <CodePreview
          preview={
            <div className="space-y-3 max-w-lg">
              <AlertUI variant="info" title="Info">This is an informational message.</AlertUI>
              <AlertUI variant="success" title="Success">Your changes have been saved successfully.</AlertUI>
              <AlertUI variant="warning" title="Warning">Your subscription expires in 3 days.</AlertUI>
              <AlertUI variant="danger" title="Error">Failed to connect. Please try again.</AlertUI>
            </div>
          }
          code={`<Alert variant="info" title="Info">Informational message.</Alert>\n<Alert variant="success" title="Success">Saved successfully.</Alert>\n<Alert variant="warning" title="Warning">Expires soon.</Alert>\n<Alert variant="danger" title="Error">Failed to connect.</Alert>`}
        />
      </Section>
      <Section title="Dismissable">
        <CodePreview
          preview={
            dismissed
              ? <button onClick={() => setDismissed(false)} className="text-sm text-blue-600 dark:text-blue-400 underline">Show alert again</button>
              : <AlertUI variant="info" title="New update available" onClose={() => setDismissed(true)}>Version 2.1.0 is ready to install.</AlertUI>
          }
          code={`<Alert variant="info" title="New update available" onClose={() => setDismissed(true)}>\n  Version 2.1.0 is ready to install.\n</Alert>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Toast ───────────────────────────────────────────────────────────────────── */
export const ToastPage = () => {
  const [toasts, setToasts] = useState<{id:number;variant:string;msg:string}[]>([]);
  const meta = COMPONENTS.find(c => c.slug === "toast")!;
  const add = (variant: string, msg: string) => {
    const id = Date.now();
    setToasts(t => [...t, {id, variant, msg}]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  };
  const vIcon: Record<string,string> = { default:"ℹ", success:"✓", error:"✕", warning:"⚠", info:"ℹ" };
  const vCls: Record<string,string> = { default:"bg-gray-800 text-white", success:"bg-green-700 text-white", error:"bg-red-700 text-white", warning:"bg-yellow-600 text-white", info:"bg-blue-700 text-white" };
  return (
    <div>
      <PageHeader slug="toast" />
      <Section title="Interactive Demo">
        <CodePreview
          preview={
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {(["default","success","error","warning","info"] as const).map(v => (
                  <button key={v} onClick={() => add(v, `This is a ${v} notification!`)}
                    className={cn("px-3 py-1.5 rounded-lg text-sm font-medium transition-colors", v==="default"?"bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200":v==="success"?"bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:text-green-400":v==="error"?"bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:text-red-400":v==="warning"?"bg-yellow-100 hover:bg-yellow-200 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400":"bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400")}>
                    Show {v}
                  </button>
                ))}
              </div>
              <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
                {toasts.map(t => (
                  <div key={t.id} className={cn("pointer-events-auto flex items-center gap-3 min-w-[280px] px-4 py-3 rounded-xl shadow-xl text-sm font-medium", vCls[t.variant])}>
                    <span className="shrink-0 font-bold">{vIcon[t.variant]}</span>
                    {t.msg}
                    <button onClick={() => setToasts(ts => ts.filter(x => x.id !== t.id))} className="ml-auto opacity-70 hover:opacity-100 text-base leading-none">×</button>
                  </div>
                ))}
              </div>
            </div>
          }
          code={`// Wrap your app:\n<ToastProvider position="top-right">\n  <App />\n</ToastProvider>\n\n// Use anywhere:\nconst { toast } = useToast();\ntoast({ message: "Saved!", variant: "success" });`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Dialog ──────────────────────────────────────────────────────────────────── */
export const DialogPage = () => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const meta = COMPONENTS.find(c => c.slug === "dialog")!;
  return (
    <div>
      <PageHeader slug="dialog" />
      <Section title="Basic Dialog">
        <CodePreview
          preview={
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">Open Dialog</button>
              <button onClick={() => setConfirmOpen(true)} className="px-4 py-2 bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 dark:bg-red-950 dark:border-red-800 dark:text-red-400 text-sm font-medium rounded-lg transition-colors">Delete Item</button>
              {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
                  <div className="relative z-10 w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Edit Profile</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Make changes to your profile here. Click save when done.</p>
                    <div className="space-y-3 mb-5">
                      <input placeholder="Display name" className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input placeholder="Email" className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <button onClick={() => setOpen(false)} className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
                      <button onClick={() => setOpen(false)} className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium">Save changes</button>
                    </div>
                    <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-lg leading-none w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">×</button>
                  </div>
                </div>
              )}
              {confirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setConfirmOpen(false)} />
                  <div className="relative z-10 w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center text-red-600 dark:text-red-400 text-xl shrink-0">⚠</div>
                      <div>
                        <h2 className="font-semibold text-gray-900 dark:text-gray-100">Delete item?</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This action cannot be undone. The item will be permanently removed.</p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-5">
                      <button onClick={() => setConfirmOpen(false)} className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
                      <button onClick={() => setConfirmOpen(false)} className="px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium">Delete</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          }
          code={`<Dialog open={open} onClose={() => setOpen(false)} title="Edit Profile" description="Make changes here.">\n  <Input label="Name" />\n  <DialogFooter>\n    <Button variant="secondary" label="Cancel" onClick={() => setOpen(false)} />\n    <Button label="Save" />\n  </DialogFooter>\n</Dialog>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Tabs ────────────────────────────────────────────────────────────────────── */
export const TabsPage = () => {
  const [tab, setTab] = useState("overview");
  const [variant, setVariant] = useState("underline");
  const meta = COMPONENTS.find(c => c.slug === "tabs")!;
  const items = [{ id: "overview", label: "Overview" }, { id: "analytics", label: "Analytics" }, { id: "settings", label: "Settings" }];
  const activeStyles: Record<string,string> = {
    underline: "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400",
    pills:     "bg-blue-600 text-white rounded-full shadow-sm",
    soft:      "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-lg shadow-sm",
    bordered:  "border border-gray-200 dark:border-gray-700 border-b-white dark:border-b-gray-900 rounded-t-lg text-blue-600",
  };
  const inactiveStyles: Record<string,string> = {
    underline: "border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300",
    pills:     "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full",
    soft:      "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg",
    bordered:  "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border border-transparent",
  };
  const containerStyles: Record<string,string> = {
    underline: "border-b border-gray-200 dark:border-gray-700",
    pills:     "bg-gray-100 dark:bg-gray-800 rounded-full p-1 gap-1",
    soft:      "bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-1",
    bordered:  "border-b border-gray-200 dark:border-gray-700 gap-1",
  };
  return (
    <div>
      <PageHeader slug="tabs" />
      <Section title="Live Variants">
        <div className="flex gap-2 mb-4 flex-wrap">
          {(["underline","pills","soft","bordered"] as const).map(v => (
            <button key={v} onClick={() => setVariant(v)} className={cn("px-3 py-1.5 text-xs font-medium rounded-lg transition-colors", variant===v?"bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900":"bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700")}>{v}</button>
          ))}
        </div>
        <CodePreview
          preview={
            <div>
              <div className={cn("flex items-center", containerStyles[variant])}>
                {items.map(item => (
                  <button key={item.id} onClick={() => setTab(item.id)} className={cn("px-4 py-2 text-sm font-medium transition-all", tab===item.id ? activeStyles[variant] : inactiveStyles[variant])}>
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="pt-4 text-sm text-gray-600 dark:text-gray-400">
                {tab==="overview" && <p>📊 Overview content — metrics, summaries, and key stats for your dashboard.</p>}
                {tab==="analytics" && <p>📈 Analytics content — charts, graphs, and data visualizations.</p>}
                {tab==="settings" && <p>⚙️ Settings content — configuration and preference options.</p>}
              </div>
            </div>
          }
          code={`<Tabs\n  variant="${variant}"\n  items={[\n    { id:"overview", label:"Overview", content:<Overview /> },\n    { id:"analytics", label:"Analytics", content:<Analytics /> },\n    { id:"settings", label:"Settings", content:<Settings /> },\n  ]}\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Accordion ───────────────────────────────────────────────────────────────── */
export const AccordionPage = () => {
  const [open, setOpen] = useState<string[]>([]);
  const meta = COMPONENTS.find(c => c.slug === "accordion")!;
  const items = [
    { id:"a", q:"What is @aryanjain/ui?", a:"A comprehensive React component library built with TypeScript and Tailwind CSS, offering 105+ production-ready components." },
    { id:"b", q:"Does it support dark mode?", a:"Yes, every component has full dark mode support using Tailwind's dark: modifier and a class-based strategy." },
    { id:"c", q:"Is it accessible?", a:"All components include ARIA attributes, keyboard navigation, focus management, and screen reader support." },
    { id:"d", q:"Can I customize the components?", a:"Absolutely. Components accept a className prop and use Tailwind's cn() utility for safe class merging." },
  ];
  const toggle = (id: string) => setOpen(o => o.includes(id) ? o.filter(x=>x!==id) : [...o, id]);
  return (
    <div>
      <PageHeader slug="accordion" />
      <Section title="Basic">
        <CodePreview
          preview={
            <div className="max-w-xl divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              {items.map(item => (
                <div key={item.id}>
                  <button onClick={() => toggle(item.id)} className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    {item.q}
                    <svg className={cn("w-4 h-4 text-gray-500 shrink-0 transition-transform", open.includes(item.id)&&"rotate-180")} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  {open.includes(item.id) && <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">{item.a}</div>}
                </div>
              ))}
            </div>
          }
          code={`<Accordion\n  items={[\n    { id:"a", trigger:"What is this?", content:"A React component library." },\n    { id:"b", trigger:"Dark mode?", content:"Yes, full dark mode support." },\n  ]}\n  multiple\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Card ────────────────────────────────────────────────────────────────────── */
export const CardPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "card")!;
  return (
    <div>
      <PageHeader slug="card" />
      <Section title="Basic Card">
        <CodePreview
          preview={
            <div className="grid gap-4 sm:grid-cols-2 max-w-2xl">
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                <div className="pb-3 mb-3 border-b border-gray-100 dark:border-gray-800 font-semibold text-gray-900 dark:text-gray-100">Getting Started</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Install the library and import components to start building.</div>
                <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-800">
                  <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Read docs →</button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-5 shadow-md">
                <div className="pb-3 mb-3 border-b border-gray-100 dark:border-gray-800 font-semibold text-gray-900 dark:text-gray-100">With Shadow</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Cards can have elevation via the shadow prop.</div>
              </div>
            </div>
          }
          code={`<Card>\n  <CardHeader>Getting Started</CardHeader>\n  <CardBody>Install the library and import components.</CardBody>\n  <CardFooter><Link href="/docs">Read docs →</Link></CardFooter>\n</Card>\n\n<Card shadow>\n  <CardHeader>With Shadow</CardHeader>\n  <CardBody>Cards can have elevation.</CardBody>\n</Card>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Tooltip ─────────────────────────────────────────────────────────────────── */
export const TooltipPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "tooltip")!;
  const TT = ({ label, content, placement = "top" }: any) => {
    const [show, setShow] = useState(false);
    const pl: Record<string,string> = { top:"bottom-full mb-2 left-1/2 -translate-x-1/2", bottom:"top-full mt-2 left-1/2 -translate-x-1/2", left:"right-full mr-2 top-1/2 -translate-y-1/2", right:"left-full ml-2 top-1/2 -translate-y-1/2" };
    return (
      <span className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        <button className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">{label}</button>
        {show && <span className={cn("absolute z-50 px-2.5 py-1.5 text-xs rounded-lg bg-gray-800 dark:bg-gray-700 text-white whitespace-nowrap pointer-events-none", pl[placement])}>{content}</span>}
      </span>
    );
  };
  return (
    <div>
      <PageHeader slug="tooltip" />
      <Section title="Placements">
        <CodePreview
          preview={
            <div className="flex flex-wrap gap-4 p-8 justify-center">
              <TT label="Top" content="Tooltip on top" placement="top" />
              <TT label="Bottom" content="Tooltip on bottom" placement="bottom" />
              <TT label="Left" content="Tooltip on left" placement="left" />
              <TT label="Right" content="Tooltip on right" placement="right" />
            </div>
          }
          code={`<Tooltip content="Tooltip on top" placement="top">\n  <Button label="Top" />\n</Tooltip>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Animated: Spotlight ─────────────────────────────────────────────────────── */
export const SpotlightPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "spotlight")!;
  const [pos, setPos] = useState({x:-999,y:-999});
  return (
    <div>
      <PageHeader slug="spotlight" />
      <Section title="Mouse Tracking Spotlight">
        <CodePreview
          preview={
            <div
              onMouseMove={e => { const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect(); setPos({x:e.clientX-r.left,y:e.clientY-r.top}); }}
              onMouseLeave={() => setPos({x:-999,y:-999})}
              className="relative overflow-hidden rounded-xl bg-gray-950 h-48 flex items-center justify-center cursor-pointer"
            >
              <div className="pointer-events-none absolute inset-0" style={{background:`radial-gradient(350px circle at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.15), transparent 80%)`}} />
              <p className="relative z-10 text-gray-300 text-sm font-medium">Move your cursor here</p>
            </div>
          }
          code={`<Spotlight color="rgba(99,102,241,0.15)" size={350}>\n  <div className="h-48 flex items-center justify-center">\n    <p>Move your cursor here</p>\n  </div>\n</Spotlight>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Animated: Marquee ───────────────────────────────────────────────────────── */
export const MarqueePage = () => {
  const meta = COMPONENTS.find(c => c.slug === "marquee")!;
  const logos = ["React","Next.js","TypeScript","Tailwind","Vite","Node.js","GraphQL","Prisma","Vercel","Supabase"];
  return (
    <div>
      <PageHeader slug="marquee" />
      <Section title="Infinite Scroll">
        <CodePreview
          preview={
            <div className="overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex gap-4 animate-[marquee_15s_linear_infinite] w-max">
                {[...logos,...logos].map((l,i) => (
                  <span key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-brand-600" />{l}
                  </span>
                ))}
              </div>
            </div>
          }
          code={`<Marquee speed={40} pauseOnHover>\n  {technologies.map(tech => (\n    <TechBadge key={tech}>{tech}</TechBadge>\n  ))}\n</Marquee>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Animated: TypewriterEffect ──────────────────────────────────────────────── */
export const TypewriterEffectPage = () => {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"typing"|"pausing"|"deleting">("typing");
  const [charIdx, setCharIdx] = useState(0);
  const words = ["Beautiful UIs","Type-safe APIs","Dark Mode Support","105+ Components"];
  const meta = COMPONENTS.find(c => c.slug === "typewriter-effect")!;
  useState(() => {
    const target = words[wordIdx];
    let timer: ReturnType<typeof setTimeout>;
    if (phase==="typing") {
      if (charIdx<target.length) { timer = setTimeout(()=>{setDisplayed(target.slice(0,charIdx+1));setCharIdx(c=>c+1);},80); }
      else { timer = setTimeout(()=>setPhase("pausing"),1500); }
    } else if (phase==="pausing") { setPhase("deleting"); }
    else {
      if (charIdx>0) { timer = setTimeout(()=>{setDisplayed(target.slice(0,charIdx-1));setCharIdx(c=>c-1);},40); }
      else { setWordIdx(i=>(i+1)%words.length); setPhase("typing"); }
    }
    return () => clearTimeout(timer);
  });
  return (
    <div>
      <PageHeader slug="typewriter-effect" />
      <Section title="Live Demo">
        <CodePreview
          preview={
            <div className="flex flex-col items-center gap-2 py-8">
              <p className="text-lg text-gray-500 dark:text-gray-400">Build</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 h-10">
                {displayed}<span className="animate-[blink_0.75s_step-end_infinite] ml-0.5 text-blue-600">|</span>
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400">with @aryanjain/ui</p>
            </div>
          }
          code={`<TypewriterEffect\n  words={["Beautiful UIs","Type-safe APIs","Dark Mode","105+ Components"]}\n  typingSpeed={80}\n  loop\n/>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Animated: AuroraBackground ─────────────────────────────────────────────── */
export const AuroraBackgroundPage = () => {
  const meta = COMPONENTS.find(c => c.slug === "aurora-background")!;
  return (
    <div>
      <PageHeader slug="aurora-background" />
      <Section title="Aurora Background">
        <CodePreview
          preview={
            <div className="relative overflow-hidden rounded-xl bg-gray-950 h-56 flex items-center justify-center">
              <div className="pointer-events-none absolute inset-0 opacity-60" style={{background:[
                "radial-gradient(ellipse 80% 60% at 20% 30%, #3b82f666, transparent)",
                "radial-gradient(ellipse 60% 80% at 80% 20%, #8b5cf655, transparent)",
                "radial-gradient(ellipse 70% 50% at 50% 80%, #06b6d444, transparent)",
              ].join(",")}}>
                <div style={{width:"100%",height:"100%",animation:"aurora-shift 8s ease-in-out infinite alternate"}} />
              </div>
              <div className="relative z-10 text-center">
                <p className="text-3xl font-bold text-white mb-2">Aurora Background</p>
                <p className="text-blue-200 text-sm">Animated northern lights effect</p>
              </div>
              <style>{`@keyframes aurora-shift{0%{transform:translate(0,0) scale(1)}50%{transform:translate(3%,-4%) scale(1.04)}100%{transform:translate(-2%,2%) scale(0.98)}}`}</style>
            </div>
          }
          code={`<AuroraBackground colors={["#3b82f6","#8b5cf6","#06b6d4","#10b981"]} speed="medium">\n  <div className="flex items-center justify-center h-64">\n    <h1 className="text-white text-4xl font-bold">Hello</h1>\n  </div>\n</AuroraBackground>`}
        />
      </Section>
      {meta.props && <Section title="Props"><PropsTable props={meta.props} /></Section>}
    </div>
  );
};

/* ── Generic fallback page for remaining components ──────────────────────────── */
export const GenericComponentPage = ({ slug }: { slug: string }) => {
  const meta = COMPONENTS.find(c => c.slug === slug);
  if (!meta) return <div className="text-gray-500 p-8">Component not found</div>;
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{meta.name}</h1>
          <DocsBadge status={meta.status} />
        </div>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mb-6">{meta.description}</p>
      </div>
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Preview</h2>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-12 flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-800/50 min-h-[200px]">
          <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-2xl">⚡</div>
          <div className="text-center">
            <p className="font-semibold text-gray-900 dark:text-gray-100">{meta.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs">{meta.description}</p>
          </div>
          <code className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg font-mono">
            {`import { ${meta.name} } from "@aryanjain/ui";`}
          </code>
        </div>
      </div>
      {meta.props && meta.props.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Props</h2>
          <PropsTable props={meta.props} />
        </div>
      )}
    </div>
  );
};
