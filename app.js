const express = require('express');

const { authRouter, usersRouter } = require('./routes');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

require('./configs/config-passport');

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.use((error, _, res, __) => {
  console.log(error);
  const code = error.code || 500;
  const message = error.message || 'Server error';
  res.status(code).json({
    status: 'fail',
    code,
    message,
  });
});

app.listen(PORT, () => console.log(`App running on PORT: ${PORT}`));
