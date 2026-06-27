import { PropMeta } from "../data/components";
import { cn } from "./cn";

export const PropsTable = ({ props }: { props: PropMeta[] }) => (
  <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
    <table className="w-full text-sm text-left">
      <thead className="bg-gray-50 dark:bg-gray-800 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        <tr>
          {["Prop", "Type", "Default", "Description"].map(h => (
            <th key={h} className="px-4 py-3 font-semibold">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
        {props.map(p => (
          <tr key={p.name} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
            <td className="px-4 py-3 font-mono font-medium text-brand-600 dark:text-brand-400 whitespace-nowrap">
              {p.name}
              {p.required && <span className="ml-1 text-red-500">*</span>}
            </td>
            <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-400 max-w-[220px]">
              <span className="break-words">{p.type}</span>
            </td>
            <td className="px-4 py-3 font-mono text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {p.default ?? <span className="text-gray-300 dark:text-gray-600">—</span>}
            </td>
            <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{p.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
