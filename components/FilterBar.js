import { CATEGORIES } from "@/lib/constants";

// フィルターボタン1個分の共通スタイル。選択中かどうかで見た目を切り替える。
function filterButtonClass(isActive) {
  return `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
    isActive
      ? "bg-amber-600 text-white"
      : "bg-white text-stone-600 hover:bg-stone-100 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
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
        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm text-stone-900 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
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
