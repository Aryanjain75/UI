import { useState } from "react";
import { Link } from "react-router-dom";

const CodeBlock = ({ code, lang = "bash" }: { code: string; lang?: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 dark:bg-gray-800 border-b border-gray-800 dark:border-gray-700">
        <span className="text-xs text-gray-500 font-mono">{lang}</span>
        <button onClick={copy} className="text-xs text-gray-400 hover:text-gray-100 px-2 py-0.5 rounded hover:bg-gray-700 transition-colors">{copied ? "✓ Copied" : "Copy"}</button>
      </div>
      <pre className="p-4 bg-gray-950 overflow-x-auto"><code className="text-sm text-gray-100 font-mono leading-relaxed">{code}</code></pre>
    </div>
  );
};

const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <div className="flex gap-5">
    <div className="flex flex-col items-center">
      <div className="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm shrink-0">{n}</div>
      <div className="w-px flex-1 bg-gray-200 dark:bg-gray-700 mt-2" />
    </div>
    <div className="pb-10">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-1.5">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  </div>
);

const TW_V3_CONFIG = `// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    // ↓ Required: scan the library's output so its classes aren't purged
    "./node_modules/@aryanjain/ui/dist/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd",
          400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8",
          800: "#1e40af", 900: "#1e3a8a", 950: "#172554",
        },
        danger:  { 50:"#fef2f2", 100:"#fee2e2", 500:"#ef4444", 600:"#dc2626", 700:"#b91c1c", 800:"#991b1b", 950:"#450a0a" },
        success: { 50:"#f0fdf4", 100:"#dcfce7", 500:"#22c55e", 600:"#16a34a", 700:"#15803d", 950:"#052e16" },
        warning: { 50:"#fffbeb", 100:"#fef3c7", 500:"#f59e0b", 600:"#d97706", 700:"#b45309", 950:"#451a03" },
      },
      keyframes: {
        "indeterminate":         { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(400%)" } },
        "marquee":               { "0%": { transform: "translateX(0)" },     "100%": { transform: "translateX(-25%)" } },
        "marquee-reverse":       { "0%": { transform: "translateX(-25%)" },  "100%": { transform: "translateX(0)" } },
        "typing":                { from: { width: "0" }, to: { width: "100%" } },
        "blink":                 { "0%, 100%": { "border-color": "transparent" }, "50%": { "border-color": "currentColor" } },
        "slide-in-from-right-4": { "0%": { transform: "translateX(1rem)", opacity: "0" }, "100%": { transform: "translateX(0)", opacity: "1" } },
        "fade-in":               { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "zoom-in-95":            { "0%": { transform: "scale(0.95)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } },
        "blur-in":               { "0%": { filter: "blur(4px)", opacity: "0" }, "100%": { filter: "blur(0)", opacity: "1" } },
      },
      animation: {
        "indeterminate":         "indeterminate 1.5s ease-in-out infinite",
        "marquee":               "marquee var(--marquee-speed, 40s) linear infinite",
        "marquee-reverse":       "marquee-reverse var(--marquee-speed, 40s) linear infinite",
        "typing":                "typing 2s steps(40) forwards, blink .75s step-end infinite",
        "blur-in":               "blur-in 0.4s ease forwards",
        "slide-in-from-right-4": "slide-in-from-right-4 0.2s ease-out",
        "fade-in":               "fade-in 0.15s ease-out",
        "zoom-in-95":            "zoom-in-95 0.2s ease-out",
      },
    },
  },
  plugins: [],
};`;

const TW_V4_CONFIG = `/* app/globals.css */

/* 1. Import Tailwind v4 */
@import "tailwindcss";

/* 2. Scan the library's dist so its classes aren't purged */
@source "../node_modules/@aryanjain/ui/dist";

/* 3. Design tokens — replaces theme.extend in the old config */
@theme {
  --color-brand-50:  #eff6ff;  --color-brand-100: #dbeafe;
  --color-brand-200: #bfdbfe;  --color-brand-300: #93c5fd;
  --color-brand-400: #60a5fa;  --color-brand-500: #3b82f6;
  --color-brand-600: #2563eb;  --color-brand-700: #1d4ed8;
  --color-brand-800: #1e40af;  --color-brand-900: #1e3a8a;
  --color-brand-950: #172554;

  --color-danger-50:  #fef2f2;  --color-danger-100: #fee2e2;
  --color-danger-500: #ef4444;  --color-danger-600: #dc2626;
  --color-danger-700: #b91c1c;  --color-danger-800: #991b1b;
  --color-danger-950: #450a0a;

  --color-success-50:  #f0fdf4;  --color-success-100: #dcfce7;
  --color-success-500: #22c55e;  --color-success-600: #16a34a;
  --color-success-700: #15803d;  --color-success-950: #052e16;

  --color-warning-50:  #fffbeb;  --color-warning-100: #fef3c7;
  --color-warning-500: #f59e0b;  --color-warning-600: #d97706;
  --color-warning-700: #b45309;  --color-warning-950: #451a03;

  --animate-indeterminate:         indeterminate 1.5s ease-in-out infinite;
  --animate-marquee:               marquee var(--marquee-speed, 40s) linear infinite;
  --animate-marquee-reverse:       marquee-reverse var(--marquee-speed, 40s) linear infinite;
  --animate-typing:                typing 2s steps(40) forwards, blink .75s step-end infinite;
  --animate-blur-in:               blur-in 0.4s ease forwards;
  --animate-slide-in-from-right-4: slide-in-from-right-4 0.2s ease-out;
  --animate-fade-in:               fade-in 0.15s ease-out;
  --animate-zoom-in-95:            zoom-in-95 0.2s ease-out;
}

/* 4. Keyframe definitions */
@keyframes indeterminate {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
@keyframes marquee {
  0%   { transform: translateX(0); }    100% { transform: translateX(-25%); }
}
@keyframes marquee-reverse {
  0%   { transform: translateX(-25%); } 100% { transform: translateX(0); }
}
@keyframes typing {
  from { width: 0; } to { width: 100%; }
}
@keyframes blink {
  0%, 100% { border-color: transparent; } 50% { border-color: currentColor; }
}
@keyframes slide-in-from-right-4 {
  0%   { transform: translateX(1rem); opacity: 0; }
  100% { transform: translateX(0);    opacity: 1; }
}
@keyframes fade-in {
  0% { opacity: 0; } 100% { opacity: 1; }
}
@keyframes zoom-in-95 {
  0%   { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1);    opacity: 1; }
}
@keyframes blur-in {
  0%   { filter: blur(4px); opacity: 0; }
  100% { filter: blur(0);   opacity: 1; }
}

/* 5. Class-based dark mode — matches the library's expectation */
@variant dark (&:where(.dark, .dark *));`;

const TailwindVersionTabs = () => {
  const [tab, setTab] = useState<"v4" | "v3">("v4");
  return (
    <div>
      <div className="flex gap-1 mb-3 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg w-fit">
        {(["v4", "v3"] as const).map(v => (
          <button
            key={v}
            onClick={() => setTab(v)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              tab === v
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            Tailwind {v}
            {v === "v4" && <span className="ml-1.5 text-xs bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 px-1.5 py-0.5 rounded-full">Latest</span>}
          </button>
        ))}
      </div>

      {tab === "v4" ? (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tailwind v4 has no <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">tailwind.config.js</code>. Everything goes into your global CSS file (<code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">app/globals.css</code>):
          </p>
          <CodeBlock lang="css" code={TW_V4_CONFIG} />
          <div className="p-3 rounded-lg bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 text-xs text-brand-700 dark:text-brand-300 space-y-1">
            <p><strong>@source</strong> — replaces the <code className="font-mono">content</code> array; tells Tailwind to scan the library dist.</p>
            <p><strong>@theme</strong> — replaces <code className="font-mono">theme.extend</code>; tokens become CSS variables.</p>
            <p><strong>@variant dark</strong> — replaces <code className="font-mono">darkMode: "class"</code>; activates dark styles when the <code className="font-mono">.dark</code> class is on a parent.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Update your <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">tailwind.config.js</code> at the project root:
          </p>
          <CodeBlock lang="js" code={TW_V3_CONFIG} />
        </div>
      )}
    </div>
  );
};

export const GettingStartedPage = () => (
  <div className="max-w-3xl mx-auto py-6">
    <div className="mb-10">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">Getting Started</h1>
      <p className="text-lg text-gray-500 dark:text-gray-400">Get @aryanjain/ui up and running in your Next.js or React project in minutes.</p>
    </div>

    {/* Prerequisites */}
    <div className="mb-10 p-5 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30">
      <p className="font-semibold text-amber-800 dark:text-amber-400 mb-2">Prerequisites</p>
      <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1 list-disc list-inside">
        <li>React 18+ or Next.js 13+</li>
        <li>Tailwind CSS v3.4+ or v4</li>
        <li>TypeScript 5+ (recommended)</li>
      </ul>
    </div>

    {/* Steps */}
    <div>
      <Step n={1} title="Install the package">
        <CodeBlock code="npm install @aryanjain/ui" lang="bash" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Or using yarn / pnpm:</p>
        <CodeBlock code="yarn add @aryanjain/ui\n# or\npnpm add @aryanjain/ui" lang="bash" />
      </Step>

      <Step n={2} title="Configure Tailwind CSS">
        <TailwindVersionTabs />
      </Step>

      <Step n={3} title="Import the CSS">
        <p className="text-sm text-gray-600 dark:text-gray-400">Add the global styles to your app entry (Next.js: <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">app/layout.tsx</code> or <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">pages/_app.tsx</code>):</p>
        <CodeBlock lang="tsx" code={`import "@aryanjain/ui/dist/styles.css";`} />
      </Step>

      <Step n={4} title="Start using components">
        <p className="text-sm text-gray-600 dark:text-gray-400">Import any component from the package and use it in your project:</p>
        <CodeBlock lang="tsx" code={`import { Button, Input, Card, Badge, Toast, ToastProvider } from "@aryanjain/ui";

export default function MyPage() {
  return (
    <Card shadow>
      <Badge variant="success" dot>Live</Badge>
      <Input label="Email" placeholder="you@example.com" />
      <Button variant="primary" fullWidth label="Submit" />
    </Card>
  );
}`} />
      </Step>

      <Step n={5} title="Set up Toast notifications (optional)">
        <p className="text-sm text-gray-600 dark:text-gray-400">Wrap your app with <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">ToastProvider</code> to enable the <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">useToast</code> hook anywhere:</p>
        <CodeBlock lang="tsx" code={`// app/layout.tsx
import { ToastProvider } from "@aryanjain/ui";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider position="top-right">
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

// Any component
import { useToast } from "@aryanjain/ui";

function SaveButton() {
  const { toast } = useToast();
  return (
    <Button
      label="Save"
      onClick={() => toast({ message: "Saved!", variant: "success" })}
    />
  );
}`} />
      </Step>
    </div>

    {/* TypeScript note */}
    <div className="mt-4 p-5 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30">
      <p className="font-semibold text-brand-800 dark:text-brand-400 mb-2">TypeScript Support</p>
      <p className="text-sm text-brand-700 dark:text-brand-300">All component props are fully typed. Every variant, size, color, and callback is exported as a named type:</p>
      <div className="mt-3">
        <CodeBlock lang="tsx" code={`import type { ButtonVariant, AvatarSize, ToastVariant } from "@aryanjain/ui";

const myVariant: ButtonVariant = "primary";
const mySize: AvatarSize = "lg";`} />
      </div>
    </div>

    {/* Next steps */}
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Next Steps</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { to: "/components/button", icon: "🔘", title: "Button", desc: "Start with the most-used component." },
          { to: "/components/data-table", icon: "📊", title: "DataTable", desc: "Sortable, paginated, selectable table." },
          { to: "/components/aurora-background", icon: "✨", title: "Aurora", desc: "Animated hero backgrounds." },
        ].map(item => (
          <Link
            key={item.to}
            to={item.to}
            className="group p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-brand-400 dark:hover:border-brand-600 hover:shadow-md transition-all"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{item.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  </div>
);