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

  // ✅ 追加：?to=submit を最優先で処理（体感ワンタップ）
  const to = params.get("to");
  const next = routeFromToParam(to);
  if (next) {
    location.replace(next);
    return;
  }

  // 従来：LIFFの deep link（liff.state）が来たら転送
  const state = params.get("liff.state");
  if (state) {
    location.replace(state);
    return;
  }

  // それ以外は入口（デバッグ用）
  try {
    await liff.init({ liffId: LIFF_ID });
  } catch (e) {
    console.log("LIFF ini
