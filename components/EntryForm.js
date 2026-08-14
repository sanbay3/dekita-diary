// このコンポーネント自身には "use client" を書かなくてOK。
// 親であるDiaryApp.jsに "use client" が付いており、そこからimportされる
// 時点でこのファイルも自動的にクライアント側の部品として扱われる。
import { useState } from "react";
import { CATEGORIES } from "@/lib/constants";

// できたことを記録するための入力フォーム（本文 + カテゴリー選択）
export default function EntryForm({ onAdd }) {
  const [text, setText] = useState("");
  // 初期値はCATEGORIESの先頭（学習）にしておく
  const [category, setCategory] = useState(CATEGORIES[0].key);

  const handleSubmit = (e) => {
    // フォーム送信時のページ再読み込み（デフォルト動作）を止める
    e.preventDefault();

    const trimmed = text.trim();
    if (trimmed === "") return; // 空文字は追加しない

    onAdd(trimmed, category); // 親（DiaryApp）に「追加して」と伝える
    setText(""); // 入力欄だけ空に戻す（カテゴリーは選び直す手間を省くため保持する）
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="今日できたことを入力..."
        className="flex-1 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm text-stone-900 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="カテゴリー"
        className="rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
      >
        {CATEGORIES.map((c) => (
          <option key={c.key} value={c.key}>
            {c.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="shrink-0 rounded-xl bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700"
      >
        記録する
      </button>
    </form>
  );
}
