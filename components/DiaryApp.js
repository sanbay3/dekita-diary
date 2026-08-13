"use client";

import { useEffect, useState } from "react";
import EntryForm from "@/components/EntryForm";
import FilterBar from "@/components/FilterBar";
import StatsPanel from "@/components/StatsPanel";
import EntryList from "@/components/EntryList";
import { filterEntries, groupByDate } from "@/lib/entryUtils";
import { calcStreak, getThisMonthPrefix, getToday } from "@/lib/dateUtils";

// localStorageに保存する際のキー名。タイプミス防止のため定数化。
const STORAGE_KEY = "dekita-diary:entries";

// localStorageから保存済みの記録を読み込む。
// このコンポーネントはapp/page.jsからssr: falseで読み込まれるため
// 実際にはブラウザ上でしか実行されないが、念のためwindowの存在も確認しておく。
function loadEntries() {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    // 保存データが壊れていた場合は空のリストから始める
    return [];
  }
}

export default function DiaryApp() {
  // 記録一覧。1件は { id, text, category, date } という形のオブジェクト。
  // useState(loadEntries) と関数を渡す（遅延初期化）ことで、Reactは最初の
  // レンダリング時に1回だけこの関数を呼び出す。ToDoアプリと同じ理由で、
  // useEffect内で読み込むとサーバー側の初期HTML（空リスト）とブラウザ側の
  // 表示内容（保存済みの記録）が食い違い、hydrationエラーの原因になる。
  const [entries, setEntries] = useState(loadEntries);

  // 検索・フィルター条件。UIの表示だけに使い、entries自体は書き換えない。
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");

  // 保存用useEffect：entriesが変化するたびに実行され、localStorageに書き込む。
  // 「Reactの外側にある仕組み（localStorage）をReactの最新の状態に合わせて
  // 更新する」だけの副作用なので、正しいuseEffectの使い方になっている。
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  // 記録を追加する
  const addEntry = (text, newCategory) => {
    const newEntry = {
      // Date.now()は同じミリ秒内に連続追加すると重複する可能性があるため、
      // 常に一意な値を作れるcrypto.randomUUID()を使う（5月のタスク管理アプリのノウハウ）。
      id: crypto.randomUUID(),
      text,
      category: newCategory,
      date: getToday(),
    };
    // setEntries(prev => ...) の形（関数を渡す形）を使うと、
    // 常に「直前の最新のentries」を元に新しい配列を作れるので安全。
    setEntries((prev) => [...prev, newEntry]);
  };

  // 記録を削除する
  const deleteEntry = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  // 検索・フィルター条件に合う記録だけを抜き出し、日付ごとにグループ化する。
  // 詳しいロジックは lib/entryUtils.js を参照。
  const filteredEntries = filterEntries(entries, { keyword, category });
  const groupedEntries = groupByDate(filteredEntries);

  // 統計情報は「絞り込み前」のentries全体から計算する
  // （検索中でもストリークや月間件数の数字は変わらないようにするため）。
  const streak = calcStreak(entries);
  const monthlyCount = entries.filter((entry) =>
    entry.date.startsWith(getThisMonthPrefix())
  ).length;

  return (
    <div className="w-full max-w-2xl rounded-2xl bg-zinc-100 p-6 shadow-sm dark:bg-zinc-900 sm:p-8">
      <h1 className="mb-6 text-center text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        できたこと日記
      </h1>

      <StatsPanel streak={streak} monthlyCount={monthlyCount} />

      <div className="mb-5">
        <EntryForm onAdd={addEntry} />
      </div>

      <FilterBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        category={category}
        onCategoryChange={setCategory}
      />

      <div className="mt-5">
        <EntryList groups={groupedEntries} onDelete={deleteEntry} />
      </div>
    </div>
  );
}
