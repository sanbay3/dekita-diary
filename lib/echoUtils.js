import { subtractDays, subtractMonths } from "@/lib/dateUtils";

// 「1ヶ月前の今日」「1週間前の今日」に記録したことを1件だけ思い出させるための関数。
//
// 1ヶ月前を優先するのは、1週間前より登場頻度が下がる分、
// 出てきたときの「懐かしさ・積み上げてきた実感」が強くなると考えたため。
// 1ヶ月前に記録が無ければ1週間前を試し、どちらも無ければnullを返して
// 呼び出し側では何も表示しない（無理に空メッセージを出さない）。
export function findEchoEntry(entries, today) {
  const candidates = [
    { label: "1ヶ月前の今日", date: subtractMonths(today, 1) },
    { label: "1週間前の今日", date: subtractDays(today, 7) },
  ];

  for (const { label, date } of candidates) {
    const sameDateEntries = entries.filter((entry) => entry.date === date);
    if (sameDateEntries.length > 0) {
      return {
        label,
        date,
        entry: sameDateEntries[0],
        // 同じ日に他にも記録があれば件数を添えられるように残しておく
        extraCount: sameDateEntries.length - 1,
      };
    }
  }

  return null;
}
