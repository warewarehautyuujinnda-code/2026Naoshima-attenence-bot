const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// publicフォルダをそのまま配信
app.use(express.static(path.join(__dirname, "public")));

// ルートにアクセスされたら index.html を返す
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
