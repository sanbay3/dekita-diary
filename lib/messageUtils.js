import { getToday } from "@/lib/dateUtils";

// トップに表示する声かけメッセージを組み立てる。
//
// 「先週と比べて減った」のような比較は、調子が悪い時期に表示されると
// かえって落ち込ませてしまう可能性があるため、ここでは使わない
// （比較を使う方向性は別途どう安全に見せるか検討中）。
// 代わりに「累計件数」「連続記録日数」という、増えることはあっても
// 表示上マイナスにはならない指標だけを使う。
//
// 連続記録の文言には日数の数字を入れない。StatsPanelに「🔥3日」と
// 既に表示されているため、同じ数字をここでも繰り返すと内容が重複して見える。
// 累計件数はStatsPanel（今月の件数）とは別の情報なので、そのまま数字を使う。

// 候補の中から1つを選ぶ。Math.random()を使わないのは、検索・フィルター操作の
// たびにDiaryAppが再レンダリングされ、そのたびにメッセージがチラつくのを防ぐため。
// 件数・連続日数・日付が変わらない限り、同じインデックスが選ばれて安定する。
function pickVariant(list, seed) {
  const index = ((seed % list.length) + list.length) % list.length;
  return list[index];
}

const STREAK_LONG = [
  "この調子、続いていますね🔥",
  "積み重ねる力が、しっかりついてきています。",
  "毎日ここに戻ってきていること自体が、もう積み重ねです。",
];

const STREAK_SHORT = [
  "いい流れができています。",
  "少しずつ、リズムが整ってきましたね。",
  "続けられていること自体が、地味に強いです。",
];

const TOTAL_HIGH = (total) => [
  `これまでに${total}件の「できた」を積み重ねてきました。誇っていいと思います🎉`,
  `${total}件——振り返ると、これだけの積み重ねです。`,
  `気づけば${total}件。ちゃんと前に進んできています。`,
];

const TOTAL_MID = (total) => [
  `もう${total}件も積み重ねてきましたね。`,
  `${total}件、地道に積み上がってきています。`,
  `振り返ると${total}件。悪くないペースです。`,
];

const TOTAL_LOW = (total) => [
  `${total}件記録できました。ちゃんと積み上がっています。`,
  `${total}件。小さく見えて、確かな積み重ねです。`,
];

const TOTAL_START = (total) => [
  `${total}件記録できました。ここからの積み重ねが力になります。`,
  `まずは${total}件。ここがスタート地点です。`,
];

export function buildEncouragementMessage(entries, streak) {
  const total = entries.length;

  if (total === 0) {
    return "最初の「できた」を記録してみましょう。";
  }

  // シードに日付（日にちの部分）を混ぜることで、件数・連続日数が
  // 変わらない日でも、日が変われば違う文言になるようにしている。
  const dayOfMonth = Number(getToday().slice(-2));
  const seed = total + streak * 3 + dayOfMonth;

  if (streak >= 7) return pickVariant(STREAK_LONG, seed);
  if (streak >= 3) return pickVariant(STREAK_SHORT, seed);
  if (total >= 100) return pickVariant(TOTAL_HIGH(total), seed);
  if (total >= 30) return pickVariant(TOTAL_MID(total), seed);
  if (total >= 10) return pickVariant(TOTAL_LOW(total), seed);
  return pickVariant(TOTAL_START(total), seed);
}
