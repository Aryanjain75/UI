import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CATEGORIES, COMPONENTS } from "../data/components";
import { DocsBadge } from "./DocsBadge";
import { cn } from "./cn";

interface DocsSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const DocsSidebar = ({ open, onClose }: DocsSidebarProps) => {
  const [search, setSearch] = useState("");
  const location = useLocation();

  const filtered = search.trim()
    ? COMPONENTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : null;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300",
          "lg:translate-x-0 lg:sticky lg:top-16 lg:z-auto lg:h-[calc(100vh-4rem)] lg:shrink-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600 text-white font-bold text-sm">⚡</div>
          <div>
            <p className="font-bold text-gray-900 dark:text-gray-100 leading-none text-sm">@aryanjain/ui</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">v1.0.0 · 105 components</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto lg:hidden p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Close sidebar"
          >✕</button>
        </div>

        {/* Search */}
        <div className="px-3 py-3 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search components…"
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-gray-100 dark:bg-gray-800 border-0 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-base leading-none">×</button>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
          {/* Home */}
          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) => cn(
              "flex items-center gap-2.5 mx-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <span className="text-base">🏠</span> Home
          </NavLink>

          <NavLink
            to="/getting-started"
            onClick={onClose}
            className={({ isActive }) => cn(
              "flex items-center gap-2.5 mx-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors mt-0.5",
              isActive
                ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <span className="text-base">🚀</span> Getting Started
          </NavLink>

          <div className="mt-4">
            {/* Search results */}
            {filtered ? (
              <div>
                <p className="px-5 py-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Results ({filtered.length})
                </p>
                {filtered.map(c => (
                  <SidebarItem key={c.slug} slug={c.slug} name={c.name} status={c.status} onClose={onClose} />
                ))}
              </div>
            ) : (
              CATEGORIES.map(cat => {
                const items = COMPONENTS.filter(c => c.category === cat.id);
                return (
                  <div key={cat.id} className="mb-1">
                    <p className="px-5 py-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                      <span>{cat.icon}</span> {cat.label}
                      <span className="ml-auto font-normal text-gray-300 dark:text-gray-600">{items.length}</span>
                    </p>
                    {items.map(c => (
                      <SidebarItem key={c.slug} slug={c.slug} name={c.name} status={c.status} onClose={onClose} />
                    ))}
                  </div>
                );
              })
            )}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <span>Made with ❤️ by Aryan Jain</span>
          </div>
        </div>
      </aside>
    </>
  );
};

const SidebarItem = ({ slug, name, status, onClose }: { slug: string; name: string; status: string; onClose: () => void }) => (
  <NavLink
    to={`/components/${slug}`}
    onClick={onClose}
    className={({ isActive }) => cn(
      "flex items-center justify-between mx-2 px-3 py-1.5 rounded-lg text-sm transition-colors group",
      isActive
        ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400 font-medium"
        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 font-normal"
    )}
  >
    <span>{name}</span>
    {(status === "new" || status === "beta") && (
      <span className={cn(
        "text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full",
        status === "new"
          ? "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-400"
          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
      )}>
        {status}
      </span>
    )}
  </NavLink>
);
