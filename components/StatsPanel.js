// ストリーク（連続記録日数）と今月の記録件数を表示する統計パネル
export default function StatsPanel({ streak, monthlyCount }) {
  return (
    <div className="mb-5 grid grid-cols-2 gap-3">
      <div className="rounded-lg bg-white px-4 py-3 text-center shadow-sm dark:bg-zinc-800">
        <p className="text-xs text-zinc-400 dark:text-zinc-500">連続記録</p>
        <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-50">
          {streak > 0 ? `🔥 ${streak}日` : "-"}
        </p>
      </div>
      <div className="rounded-lg bg-white px-4 py-3 text-center shadow-sm dark:bg-zinc-800">
        <p className="text-xs text-zinc-400 dark:text-zinc-500">今月の記録</p>
        <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-50">
          {monthlyCount}件
        </p>
      </div>
    </div>
  );
}
