const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// public を静的配信
app.use(express.static(path.join(__dirname, "public")));

// 各ページ
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/submit", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "submit.html"));
});

app.get("/check", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "check.html"));
});

app.get("/edit", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "edit.html"));
});

app.get("/history", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "history.html"));
});

app.get("/summary", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "summary.html"));
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
