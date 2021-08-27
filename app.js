const express = require('express');

const authRouter = require('./routes')


const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json())

app.use('/api/auth', authRouter
);

app.listen(PORT, () => console.log(`App running on PORT: ${PORT}`));
