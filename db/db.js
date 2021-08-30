const Pool = require('pg').Pool;
const pool = new Pool({
    user:'admin',
    password:'none',
    host:'localhost',
    port:5432,
    database:'users'
});

module.exports = pool