// 記録（entry）の一覧に対して「絞り込み」と「日付ごとのグループ化」を行う関数。
// DiaryAppコンポーネントから呼び出される。

// キーワード（本文の部分一致）とカテゴリーの両方でentriesを絞り込む。
//
// - キーワードが空文字（何も入力されていない）なら、キーワード条件は「素通り」させる
// - .toLowerCase() で両方を小文字化してから比較することで、大文字・小文字の違いを無視する
//   （例: 検索語が "TypeScript" でも本文が "typescriptの勉強" でもヒットする）
export function filterEntries(entries, { keyword, category }) {
  const normalizedKeyword = keyword.trim().toLowerCase();

  return entries.filter((entry) => {
    const matchesCategory = category === "all" || entry.category === category;
    const matchesKeyword =
      normalizedKeyword === "" ||
      entry.text.toLowerCase().includes(normalizedKeyword);
    return matchesCategory && matchesKeyword;
  });
}

// entries（フラットな配列）を日付ごとにまとめ、日付の新しい順に並んだ
// [{ date: "2026-08-13", entries: [...] }, ...] という形に変換する。
//
// なぜMapを使うか？
// 「日付文字列 → その日のentries配列」という対応表を作りたい。
// 素のオブジェクト（{}）でも似たことはできるが、Mapは
// - キーの追加された順序を保証する
// - has/get/set が直感的
// という理由でこの用途に向いている。
export function groupByDate(entries) {
  const map = new Map();

  for (const entry of entries) {
    const sameDateEntries = map.get(entry.date);
    if (sameDateEntries) {
      sameDateEntries.push(entry);
    } else {
      map.set(entry.date, [entry]);
    }
  }

  // Map.keys() は「entriesを追加した順」＝「日付の登場順」で並んでいるため、
  // このままでは日付順になっていない。
  // "YYYY-MM-DD" 形式の文字列は辞書順に並べ替えるとそのまま日付の前後関係と一致するため、
  // 文字列比較（a < b）だけで正しく日付順に並べ替えられる。
  // b, a の順で比較することで「新しい日付が先」の降順にしている。
  const sortedDates = Array.from(map.keys()).sort((a, b) => (a < b ? 1 : -1));

  return sortedDates.map((date) => ({
    date,
    // 各日付グループの中では、後から追加した記録を上に表示したいので反転する
    // （.slice() でコピーを作ってから .reverse() することで、元の配列を壊さない）
    entries: map.get(date).slice().reverse(),
  }));
}
