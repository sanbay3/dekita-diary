// トップに表示する一言メッセージ。数字を「事実」としてではなく
// 「声かけ」として見せることが目的なので、StatsPanelより目立つ位置に置く。
export default function EncouragementBanner({ message }) {
  return (
    <p className="mb-5 rounded-xl bg-amber-100 px-4 py-3 text-center text-sm font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-200">
      {message}
    </p>
  );
}
