// public/liff.js
const LIFF_ID = "2008874608-j5K5MOKs";

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function routeFromToParam(to) {
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
  const params = new URLSearchParams(window.location.search);
  const state = params.get("liff.state");
  const to = params.get("to");
  const next = state || routeFromToParam(to);

  // 画面に現状を出す（これが超重要）
  document.body.innerHTML = `
    <div style="font-family:system-ui; padding:16px; line-height:1.5;">
      <h2>LIFF Entry Debug</h2>
      <div><b>location.href</b>: ${esc(location.href)}</div>
      <div><b>liff.state</b>: ${esc(state)}</div>
      <div><b>to</b>: ${esc(to)}</div>
      <div><b>next</b>: ${esc(next)}</div>
      <hr>
      <button id="go" style="padding:12px 14px; font-size:16px;">nextへ移動</button>
      <p style="color:#666; font-size:14px;">※ボタン押下で next に遷移します。自動遷移は一旦OFF。</p>
    </div>
  `;

  // ここでLIFF init（成功/失敗をログに出す）
  try {
    await liff.init({ liffId: LIFF_ID });
    console.log("LIFF init OK");
  } catch (e) {
    console.log("LIFF init skipped/failed:", e);
  }

  document.getElementById("go").addEventListener("click", () => {
    if (!next) {
      alert("next が空です。URLに ?to=submit を付けてください。");
      return;
    }
    location.replace(next);
  });
}

main().catch(err => {
  document.body.innerHTML = `<pre>${esc(err)}</pre>`;
});
