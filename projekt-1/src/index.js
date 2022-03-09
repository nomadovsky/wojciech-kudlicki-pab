var express = require("express");
var app = express();
app.get("/", function (req, res) {
    var num1 = +req.query.num1;
    var num2 = +req.query.num2;
    var sum = num1 + num2;
    res.send(sum.toString());
    //   req.params = { operation: "add", bookId: "8989" };
    //   res.send(req.params);
});
app.listen(3000);
