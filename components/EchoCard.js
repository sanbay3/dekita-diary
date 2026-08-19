import { getCategory } from "@/lib/constants";
import { formatDateJa } from "@/lib/dateUtils";

// 「1ヶ月前/1週間前の今日」に記録した1件を思い出させるカード。
// echoがnull（該当する記録が無い）の場合は何も表示しない。
export default function EchoCard({ echo }) {
  if (!echo) return null;

  const category = getCategory(echo.entry.category);

  return (
    <div className="mb-5 rounded-xl border border-dashed border-amber-300 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950/40">
      <p className="mb-1.5 text-xs font-medium text-amber-700 dark:text-amber-300">
        💭 {echo.label}（{formatDateJa(echo.date)}）
      </p>
      <div className="flex items-start gap-2">
        <span
          className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${category.badge}`}
        >
          {category.label}
        </span>
        <p className="flex-1 break-words text-sm text-stone-800 dark:text-stone-100">
          {echo.entry.text}
          {echo.extraCount > 0 && (
            <span className="text-stone-500 dark:text-stone-400">
              　ほか{echo.extraCount}件
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
