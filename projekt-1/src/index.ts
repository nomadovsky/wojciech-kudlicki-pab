const express = require("express");
const app = express();
app.get("/", (req, res) => {
  const num1 = +req.query.num1;
  const num2 = +req.query.num2;
  const sum = num1 + num2;
  res.send(sum.toString());

  //   req.params = { operation: "add", bookId: "8989" };
  //   res.send(req.params);
});
app.listen(3000);
