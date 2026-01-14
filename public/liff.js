// public/liff.js

// ★後でLINE Developersで作った LIFF ID に置き換える
const LIFF_ID = "YOUR_LIFF_ID_HERE";

function showLoading() {
  document.body.innerHTML = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0;">
      <div style="text-align:center;">
        <div style="font-size:18px; font-weight:600;">読み込み中…</div>
        <div style="margin-top:8px; color:#666; font-size:14px;">直島勤怠BOT</div>
      </div>
    </div>
  `;
}

function routeFromToParam(to) {
  // `to` パラメータの値を、あなたのルートにマッピング
  // ここを増やせばリッチメニュー複数ボタンも同じ入口で処理できる
  const map = {
    submit: "/submit",
    edit: "/edit",
    check: "/check",
    history: "/history",
    summary: "/summary",
  };
  return map[to] || null;
}

async function main() {
  showLoading();

  // URLパラメータ取得
  const params = new URLSearchParams(window.location.search);

  // 1) LIFF標準の deep link（liff.state）が来たら最優先で転送
  const state = params.get("liff.state");
  if (state) {
    // state が /submit.html などで来る想定だったが、
    // ルート統一したいならここで変換してもOK（今回はそのまま飛ばす）
    location.replace(state);
    return;
  }

  // 2) あなた方式： ?to=submit で来たら自動転送（体感ワンタップ）
  const to = params.get("to");
  const next = routeFromToParam(to);
  if (next) {
    location.replace(next);
    return;
  }

  // 3) それ以外は入口画面（デバッグ用）
  // ここで初めてLIFF init を試す（転送が主目的なので後回しでOK）
  try {
    await liff.init({ liffId: LIFF_ID });
  } catch (e) {
    console.log("LIFF init skipped (not in LIFF yet):", e);
  }

  document.body.innerHTML = `
    <h1>勤怠LIFF（入口）</h1>
    <p>リンクからの遷移先が指定されていないため入口を表示しています。</p>
    <ul>
      <li><a href="/?to=submit">勤怠提出</a></li>
      <li><a href="/?to=edit">勤怠修正</a></li>
      <li><a href="/?to=summary">今月確認</a></li>
    </ul>
  `;
}

main().catch(err => {
  document.body.innerHTML = `<pre>${String(err)}</pre>`;
});
