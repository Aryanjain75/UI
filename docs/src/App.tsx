import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { DocsSidebar } from "./components/DocsSidebar";
import { DocsNavbar } from "./components/DocsNavbar";
import { HomePage } from "./pages/HomePage";
import { GettingStartedPage } from "./pages/GettingStartedPage";
import { ComponentPage } from "./pages/components/ComponentPage";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { dark, toggle } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      <DocsNavbar dark={dark} onToggleTheme={toggle} onToggleSidebar={() => setSidebarOpen(o => !o)} />
      <div className="flex flex-1 min-h-0">
        <DocsSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/getting-started" element={
              <div className="max-w-5xl mx-auto px-6 py-8">
                <GettingStartedPage />
              </div>
            } />
            <Route path="/components/:slug" element={
              <div className="max-w-5xl mx-auto px-6 py-8">
                <ComponentPage />
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
}
