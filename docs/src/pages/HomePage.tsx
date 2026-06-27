import { Link } from "react-router-dom";
import { CATEGORIES, COMPONENTS } from "../data/components";
import { cn } from "../components/cn";

const stats = [
  { value: "105+", label: "Components" },
  { value: "7",    label: "Categories" },
  { value: "100%", label: "TypeScript" },
  { value: "0",    label: "Runtime Deps" },
];

const features = [
  { icon: "🌙", title: "Dark Mode",       desc: "Every component ships with full dark mode support via Tailwind dark: variants." },
  { icon: "♿", title: "Accessible",      desc: "ARIA attributes, keyboard nav, focus rings, and screen reader support throughout." },
  { icon: "🎨", title: "Customizable",   desc: "Built with cn() + Tailwind — pass className to override anything." },
  { icon: "⚡", title: "Zero Runtime",   desc: "No Framer Motion. Pure React + CSS — tiny bundle, fast load." },
  { icon: "🔷", title: "TypeScript",     desc: "Every prop, variant, and callback is fully typed with exported interfaces." },
  { icon: "✨", title: "Animated",       desc: "Aceternity-style motion components built in pure CSS and React hooks." },
];

export const HomePage = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-20 px-6">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{ backgroundImage: "linear-gradient(#6366f1 1px,transparent 1px),linear-gradient(90deg,#6366f1 1px,transparent 1px)", backgroundSize: "40px 40px" }}
        aria-hidden="true"
      />
      {/* Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-brand-500/10 dark:bg-brand-500/20 blur-3xl" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400 text-xs font-semibold mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          v1.0.0 · 105 components · Production Ready
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">
          Build faster with{" "}
          <span className="bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
            @aryanjain/ui
          </span>
        </h1>

        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          A comprehensive React component library with 105+ components — from form inputs to animated hero sections. Built with TypeScript, Tailwind CSS, and zero runtime dependencies.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/getting-started"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all duration-150 shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/30 active:scale-95"
          >
            Get Started
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </Link>
          <Link
            to="/components/button"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold rounded-xl transition-all duration-150 active:scale-95"
          >
            Browse Components
          </Link>
        </div>

        {/* Install command */}
        <div className="mt-8 inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-950 dark:bg-gray-900 border border-gray-800 dark:border-gray-700 text-left">
          <span className="text-gray-500 text-sm">$</span>
          <code className="text-green-400 text-sm font-mono">npm install @aryanjain/ui</code>
          <button
            onClick={() => navigator.clipboard?.writeText("npm install @aryanjain/ui")}
            className="ml-2 text-gray-500 hover:text-gray-300 transition-colors"
            aria-label="Copy install command"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          </button>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {stats.map(s => (
          <div key={s.label} className="text-center">
            <p className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{s.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Features */}
    <section className="py-16 px-6 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">Why @aryanjain/ui?</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-10">Everything you need, nothing you don't.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center text-xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Component Categories */}
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">Browse by Category</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-10">7 categories covering every UI need.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => {
            const items = COMPONENTS.filter(c => c.category === cat.id);
            const first3 = items.slice(0, 3);
            return (
              <Link
                key={cat.id}
                to={`/components/${items[0]?.slug}`}
                className="group p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-brand-400 dark:hover:border-brand-600 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{cat.label}</p>
                    <p className="text-xs text-gray-400">{items.length} components</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {first3.map(c => (
                    <span key={c.slug} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">{c.name}</span>
                  ))}
                  {items.length > 3 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">+{items.length - 3} more</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>

    {/* Quick preview */}
    <section className="py-16 px-6 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">Quick Preview</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-10">A taste of what's inside.</p>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400"/><span className="w-3 h-3 rounded-full bg-yellow-400"/><span className="w-3 h-3 rounded-full bg-green-400"/></div>
          </div>
          <div className="p-8 bg-white dark:bg-gray-900 flex flex-wrap gap-4 items-start">
            {/* Buttons */}
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors">Primary</button>
              <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Secondary</button>
              <button className="px-4 py-2 bg-transparent text-gray-600 dark:text-gray-400 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Ghost</button>
            </div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {[["bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400","Active"],["bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400","Pending"],["bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400","Failed"]].map(([cls,label])=>(
                <span key={label} className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"/>{label}
                </span>
              ))}
            </div>
            {/* Input */}
            <div className="relative w-56">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z"/></svg>
              <input placeholder="Search components…" className="w-full pl-9 pr-3 h-9 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            {/* Avatars */}
            <div className="flex -space-x-2">
              {["AJ","RK","SM","PL"].map((i,idx)=>(
                <span key={idx} className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-gray-900 flex items-center justify-center bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 text-xs font-semibold">{i}</span>
              ))}
              <span className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-gray-900 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium">+5</span>
            </div>
            {/* Progress */}
            <div className="w-full sm:w-64 space-y-2">
              {[{label:"Storage",val:72,c:"bg-brand-600"},{label:"Memory",val:45,c:"bg-green-500"},{label:"CPU",val:88,c:"bg-yellow-500"}].map(b=>(
                <div key={b.label}>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1"><span>{b.label}</span><span>{b.val}%</span></div>
                  <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"><div className={`h-full rounded-full ${b.c}`} style={{width:`${b.val}%`}}/></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 px-6 bg-brand-600 dark:bg-brand-700">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Ready to build?</h2>
        <p className="text-brand-100 mb-8">Get started in under 2 minutes. Install the package and import any component.</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link to="/getting-started" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors active:scale-95">
            Get Started →
          </Link>
          <Link to="/components/button" className="inline-flex items-center gap-2 px-6 py-3 border border-brand-400 text-white font-semibold rounded-xl hover:bg-brand-500 transition-colors active:scale-95">
            Components
          </Link>
        </div>
      </div>
    </section>
  </div>
);
