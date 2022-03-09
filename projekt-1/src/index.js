var express = require("express");
var app = express();
app.get("/:operation/:num1/:num2", function (req, res) {
    var num1 = +req.params.num1;
    var num2 = +req.params.num2;
    var operation = req.params.operation;
    var result = "Use correct path: operation/number1/number2. Operation = (add/subtract/multiply/divide)";
    var sign = "";
    switch (operation) {
        case "add":
            sign = "+";
            result = "".concat(num1, " + ").concat(num2, " = ").concat(num1 + num2);
            break;
        case "subtract":
            result = "".concat(num1, " - ").concat(num2, " = ").concat(num1 - num2);
            break;
        case "divide":
            result = "".concat(num1, " / ").concat(num2, " = ").concat((num1 / num2).toFixed(2));
            break;
        case "multiply":
            result = "".concat(num1, " * ").concat(num2, " = ").concat(num1 * num2);
            break;
        default:
            break;
    }
    res.send(result.toString());
});
app.listen(3000);
