// カテゴリー一覧を1箇所にまとめて管理する。
// ラベル（表示名）とバッジ用のTailwindクラスをセットで持たせることで、
// EntryForm（選択肢）・FilterBar（絞り込みボタン）・EntryItem（バッジ表示）の
// 3つのコンポーネントが同じ定義を参照できるようにしている。
export const CATEGORIES = [
  {
    key: "learning",
    label: "学習",
    badge:
      "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  },
  {
    key: "work",
    label: "仕事",
    badge:
      "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  },
  {
    key: "housework",
    label: "家事",
    badge:
      "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  },
  {
    key: "hobby",
    label: "趣味",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  },
  {
    key: "other",
    label: "その他",
    badge:
      "bg-stone-200 text-stone-700 dark:bg-stone-700 dark:text-stone-300",
  },
];

// keyからカテゴリー情報を探す。万一見つからない場合は「その他」を返す
export function getCategory(key) {
  return CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[CATEGORIES.length - 1];
}
