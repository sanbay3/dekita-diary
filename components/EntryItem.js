import { useState } from "react";
import { CATEGORIES, getCategory } from "@/lib/constants";

// 記録1件分の行。
// 「編集中かどうか」をこのコンポーネント自身のuseStateで持たせ、
// 編集中は本文・カテゴリーを直接書き換えられるフォームに切り替える。
// 一覧全体ではなくこの1件だけが表示を切り替えるので、他の行に影響しない。
export default function EntryItem({ entry, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  // 編集中の下書き。entry自体（保存済みの値）とは別に持つことで、
  // 「保存」を押すまでは元の記録を書き換えない。
  const [draftText, setDraftText] = useState(entry.text);
  const [draftCategory, setDraftCategory] = useState(entry.category);

  const startEdit = () => {
    // 前回開いた時の下書きが残らないよう、開くたびに現在の値でリセットする
    setDraftText(entry.text);
    setDraftCategory(entry.category);
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const trimmed = draftText.trim();
    if (trimmed === "") return; // 空文字では保存しない
    onEdit(entry.id, trimmed, draftCategory);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="rounded-xl bg-white px-4 py-3 shadow-sm dark:bg-stone-800">
        <form onSubmit={handleSave} className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            aria-label="できたこと"
            autoFocus
            className="flex-1 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm text-stone-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100"
          />
          <select
            value={draftCategory}
            onChange={(e) => setDraftCategory(e.target.value)}
            aria-label="カテゴリー"
            className="rounded-lg border border-stone-300 bg-white px-2 py-1.5 text-sm text-stone-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100"
          >
            {CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
          <div className="flex shrink-0 gap-2">
            <button
              type="submit"
              className="rounded-lg bg-amber-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-amber-700"
            >
              保存
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm text-stone-600 transition-colors hover:bg-stone-100 dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-600"
            >
              キャンセル
            </button>
          </div>
        </form>
      </li>
    );
  }

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
      <div className="flex shrink-0 gap-1">
        <button
          type="button"
          onClick={startEdit}
          aria-label="編集"
          className="rounded-full p-1.5 text-stone-400 transition-colors hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-950"
        >
          ✎
        </button>
        <button
          type="button"
          onClick={() => onDelete(entry.id)}
          aria-label="削除"
          className="rounded-full p-1.5 text-stone-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
        >
          ✕
        </button>
      </div>
    </li>
  );
}
