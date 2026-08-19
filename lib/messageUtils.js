// トップに表示する声かけメッセージを組み立てる。
//
// 「先週と比べて減った」のような比較は、調子が悪い時期に表示されると
// かえって落ち込ませてしまう可能性があるため、ここでは使わない
// （比較を使う方向性は別途どう安全に見せるか検討中）。
// 代わりに「累計件数」「連続記録日数」という、増えることはあっても
// 表示上マイナスにはならない指標だけを使う。
export function buildEncouragementMessage(entries, streak) {
  const total = entries.length;

  if (total === 0) {
    return "最初の「できた」を記録してみましょう。";
  }
  if (streak >= 7) {
    return `${streak}日連続で記録できています。積み重ねる力がついてきましたね🔥`;
  }
  if (streak >= 3) {
    return `${streak}日連続で記録中です。いい流れができています。`;
  }
  if (total >= 100) {
    return `これまでに${total}件の「できた」を積み重ねてきました。誇っていいと思います🎉`;
  }
  if (total >= 30) {
    return `もう${total}件も積み重ねてきましたね。`;
  }
  if (total >= 10) {
    return `${total}件記録できました。ちゃんと積み上がっています。`;
  }
  return `${total}件記録できました。ここからの積み重ねが力になります。`;
}
