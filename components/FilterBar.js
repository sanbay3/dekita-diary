import { CATEGORIES } from "@/lib/constants";

// フィルターボタン1個分の共通スタイル。選択中かどうかで見た目を切り替える。
function filterButtonClass(isActive) {
  return `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
    isActive
      ? "bg-sky-600 text-white"
      : "bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
  }`;
}

// キーワード検索とカテゴリー絞り込みをまとめたフィルターUI。
// ここではkeyword・categoryの状態そのものは持たず、DiaryAppから受け取った
// 値と更新関数(onKeywordChange / onCategoryChange)をそのまま使う
// （「状態のリフトアップ」と呼ばれる、複数の子コンポーネントで同じ状態を
// 共有したいときによく使う構成）。
export default function FilterBar({
  keyword,
  onKeywordChange,
  category,
  onCategoryChange,
}) {
  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        placeholder="キーワードで検索..."
        className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
      />
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => onCategoryChange("all")}
          className={filterButtonClass(category === "all")}
        >
          すべて
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => onCategoryChange(c.key)}
            className={filterButtonClass(category === c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
