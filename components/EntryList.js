import DateGroup from "./DateGroup";

// 日付ごとにグループ化された記録を、日付の新しい順に並べて表示する。
// グループ化そのもの（groupByDate）はDiaryApp側で行い、
// このコンポーネントは受け取った結果を並べるだけのシンプルな役割にしている。
export default function EntryList({ groups, onDelete }) {
  if (groups.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-stone-400 dark:text-stone-500">
        記録がありません
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {groups.map((group) => (
        // key={group.date} で日付ごとのグループを一意に識別する
        <DateGroup
          key={group.date}
          date={group.date}
          entries={group.entries}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
