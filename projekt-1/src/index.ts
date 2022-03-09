const express = require("express");
const app = express();
app.get("/:operation/:num1/:num2", (req, res) => {
  const num1 = +req.params.num1;
  const num2 = +req.params.num2;
  const operation = req.params.operation;
  let result =
    "Use correct path: operation/number1/number2. Operation = (add/subtract/multiply/divide)";
  let sign = "";
  switch (operation) {
    case "add":
      sign = "+";
      result = `${num1} + ${num2} = ${num1 + num2}`;
      break;
    case "subtract":
      result = `${num1} - ${num2} = ${num1 - num2}`;
      break;
    case "divide":
      result = `${num1} / ${num2} = ${(num1 / num2).toFixed(2)}`;
      break;
    case "multiply":
      result = `${num1} * ${num2} = ${num1 * num2}`;
      break;
    default:
      break;
  }

  res.send(result.toString());
});

app.listen(3000);
