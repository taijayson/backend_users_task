const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

app.get('/', (req, res, next) =>
  res.json({
    message: 'Hello for you',
  })
);

app.listen(PORT, () => console.log(`App running on PORT: ${PORT}`));
