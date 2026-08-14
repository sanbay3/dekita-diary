import EntryItem from "./EntryItem";
import { formatDateJa } from "@/lib/dateUtils";

// 1つの日付分の記録をまとめる「見出し + リスト」
export default function DateGroup({ date, entries, onDelete }) {
  return (
    <div>
      <h2 className="mb-2 flex items-baseline gap-2 text-sm font-semibold text-stone-500 dark:text-stone-400">
        {formatDateJa(date)}
        <span className="text-xs font-normal text-stone-400 dark:text-stone-500">
          {entries.length}件
        </span>
      </h2>
      <ul className="flex flex-col gap-2">
        {entries.map((entry) => (
          <EntryItem key={entry.id} entry={entry} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}
