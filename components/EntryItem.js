import { getCategory } from "@/lib/constants";

// 記録1件分の行（カテゴリーバッジ・本文・削除ボタン）
export default function EntryItem({ entry, onDelete }) {
  const category = getCategory(entry.category);

  return (
    <li className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 shadow-sm dark:bg-stone-800">
      <span
        className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${category.badge}`}
      >
        {category.label}
      </span>
      <span className="flex-1 break-words text-sm text-stone-800 dark:text-stone-100">
        {entry.text}
      </span>
      <button
        type="button"
        onClick={() => onDelete(entry.id)}
        aria-label="削除"
        className="shrink-0 rounded-full p-1.5 text-stone-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
      >
        ✕
      </button>
    </li>
  );
}
