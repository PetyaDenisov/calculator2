const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/calculate', (req, res) => {
  const { expression } = req.body;
  try {
    const result = eval(expression);
    res.send({ result });
  } catch (error) {
    res.status(400).send({ error: 'Invalid expression' });
  }
});

app.listen(port, () => {
  console.log(`Calculator app listening at http://localhost:${port}`);
});
