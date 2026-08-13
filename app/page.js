// このファイルの一番上に "use client" と書くことで、
// このコンポーネントが「クライアントコンポーネント」であるとNext.jsに伝える。
// 下のnext/dynamicで ssr: false を使うには、呼び出し元もクライアント
// コンポーネントである必要がある（サーバーコンポーネントからは使えない）。
"use client";

import dynamic from "next/dynamic";

// DiaryAppを「ssr: false」で読み込む＝このコンポーネントはサーバー側では
// 一切レンダリングせず、ブラウザ上でのみ動かす、という指定。
// 理由は7月のToDoアプリと同じ：DiaryAppはlocalStorageの記録を画面表示に
// 使うが、localStorageはサーバー上に存在しない。ssr: false にすることで
// サーバー側の描画そのものを行わず、hydration（サーバーとブラウザの
// 描画結果を照合する処理）でのエラーを根本的に避けられる。
// 読み込み中は下のloadingで指定した内容が一瞬表示される。
const DiaryApp = dynamic(() => import("@/components/DiaryApp"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-2xl rounded-2xl bg-zinc-100 p-6 text-center text-sm text-zinc-400 shadow-sm dark:bg-zinc-900 dark:text-zinc-500 sm:p-8">
      読み込み中...
    </div>
  ),
});

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-10 dark:bg-black sm:py-16">
      <DiaryApp />
    </div>
  );
}
