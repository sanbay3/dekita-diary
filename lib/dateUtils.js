// 日付関連のユーティリティ関数をまとめたファイル。
//
// 日付は常にDateオブジェクトではなく "YYYY-MM-DD" の文字列で統一して扱う
// （6月の習慣トラッカーで得たノウハウ）。こうしておくと、
// - localStorageにそのままJSON保存できる
// - 文字列同士の大小比較（"2026-08-13" > "2026-08-01"）がそのまま日付の前後判定になる
// というメリットがあり、Dateオブジェクトを持ち回るより扱いやすい。
//
// また toISOString() は内部的にUTC（世界標準時）に変換してから文字列化するため、
// 日本時間の深夜0時〜9時に記録すると「前日の日付」になってしまうことがある。
// それを避けるため、ここでは常にgetFullYear/getMonth/getDateという
// 「ローカルタイム（実行環境の時刻）」ベースのメソッドから文字列を組み立てる。

export function toDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getToday() {
  return toDateStr(new Date());
}

// 今月を判定するための "YYYY-MM" プレフィックス（例: "2026-08"）
export function getThisMonthPrefix() {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

// "2026-08-13" のような文字列を "2026年8月13日（木）" の表示用文字列に変換する
export function formatDateJa(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  // new Date(y, m - 1, d) はローカルタイムとして日付を作るコンストラクタ。
  // 曜日を取得するためだけに使う（保存・比較には使わない）。
  const weekday = WEEKDAYS[new Date(y, m - 1, d).getDay()];
  return `${y}年${m}月${d}日（${weekday}）`;
}

// "YYYY-MM-DD" 文字列から指定日数だけ過去に戻った日付文字列を返す
export function subtractDays(dateStr, days) {
  const d = new Date(`${dateStr}T00:00:00`);
  d.setDate(d.getDate() - days);
  return toDateStr(d);
}

// "YYYY-MM-DD" 文字列から指定月数だけ過去に戻った日付文字列を返す。
// setMonth()は月末の扱いをDateオブジェクトに任せる（例: 3/31の1ヶ月前は2/28や2/29になる）。
export function subtractMonths(dateStr, months) {
  const d = new Date(`${dateStr}T00:00:00`);
  d.setMonth(d.getMonth() - months);
  return toDateStr(d);
}

// 連続記録日数（ストリーク）を計算する。
//
// 考え方：
// 1. 記録がある日付だけを重複なく集めたSetを作る（同じ日に複数件記録があっても1日分としてカウント）。
// 2. 「今日」から過去に向かって1日ずつ確認し、記録がある日が続く限り数え続ける。
// 3. ただし「今日はまだ記録していないが昨日までは連続している」場合にストリークが
//    0にリセットされて見えるとやる気を削いでしまうため、今日の記録が無い時だけ
//    起点を昨日にずらす（habit-trackerアプリと同じ考え方）。
export function calcStreak(entries) {
  const dateSet = new Set(entries.map((entry) => entry.date));
  const today = getToday();

  // "T00:00:00" を付けて生成することで、実行環境のローカルタイムの深夜0時として扱う
  const cursor = new Date(`${today}T00:00:00`);
  if (!dateSet.has(today)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (dateSet.has(toDateStr(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
