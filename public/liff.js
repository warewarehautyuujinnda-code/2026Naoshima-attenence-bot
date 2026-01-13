// public/liff.js

// ★後でLINE Developersで作った LIFF ID に置き換える
const LIFF_ID = "YOUR_LIFF_ID_HERE";

async function main() {
  // ここは「LIFF環境で開いたとき」だけ動けばOK。
  // ただし今はローカル確認もしたいので try/catch を厚めにします。
  try {
    await liff.init({ liffId: LIFF_ID });
  } catch (e) {
    // LIFF以外（普通のブラウザ）から開いても落ちないようにする
    console.log("LIFF init skipped (not in LIFF yet):", e);
  }

  // リッチメニュー等から来ると
  // https://liff.line.me/<LIFF_ID>?liff.state=/submit.html
  // のように `liff.state` が付く想定
  const params = new URLSearchParams(window.location.search);
  const state = params.get("liff.state");

  if (state) {
    // /submit.html 等へ移動
    location.replace(state);
    return;
  }

  // stateが無いときは、テスト用にリンクを表示
  document.body.innerHTML = `
    <h1>勤怠LIFF（入口）</h1>
    <p>liff.state が無いので入口画面を表示しています。</p>
    <ul>
      <li><a href="/submit.html">勤怠提出</a></li>
      <li><a href="/history.html">勤怠修正</a></li>
      <li><a href="/summary.html">今月確認</a></li>
    </ul>
  `;
}

main().catch(err => {
  document.body.innerHTML = `<pre>${String(err)}</pre>`;
});
