const Pool = require('pg');
const pool = new Pool({
    user:'admin',
    password:'none',
    host:'localhost',
    port:5432
});

module.exports = pool