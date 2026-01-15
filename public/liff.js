// public/liff.js
const LIFF_ID = "2008874608-j5K5MOKs";

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

  // ✅ 1) ?to=submit などを最優先（リッチメニュー用）
  const to = params.get("to");
  const next = routeFromToParam(to);
  if (next) {
    location.replace(next);
    return;
  }

  // ✅ 2) liff.state が来たら転送（deep link用）
  const state = params.get("liff.state");
  if (state) {
    location.replace(state);
    return;
  }

  // ✅ 3) LINE外（PCブラウザ等）なら入口で止める（無限読み込み回避）
  // ここで /submit へ飛ばしたいなら location.replace("/submit") に変えてもOK
  const isLikelyInLine = /Line/i.test(navigator.userAgent);
  if (!isLikelyInLine) {
    console.log("Not in LINE. Showing landing page only.");
    return;
  }

  // ✅ 4) LIFF SDK が無いなら何もしない（無限読み込み回避）
  if (typeof liff === "undefined") {
    console.log("LIFF SDK is not available.");
    return;
  }

  // ✅ 5) LIFF初期化（入口としての役割）
  try {
    await liff.init({ liffId: LIFF_ID });
    console.log("LIFF init success");
  } catch (e) {
    console.error("LIFF init failed:", e);
  }
}

main();
