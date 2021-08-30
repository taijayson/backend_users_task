const db = require('../../db/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginUser = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({
        status: 'fail',
        code: 400,
        message: `Need name and password`,
      });
    }

    const user = await db.query(`SELECT * from users where name=$1`, [
      name,
    ]);

    if (!user.rows.length) {
      return res.status(400).json({
        status: 'fail',
        code: 400,
        message: `User not registered`,
      });
    }

    if (user.rows[0].password !== password) {
      return res.status(400).json({
        code: 400,
        message: `Incorrect password`,
      });
    }

    if (user.rows[0].status === 'admin') {
      const payload = {
        id: user.rows[0].id,
      };
      const { TOKEN_KEY } = process.env;
      const token = jwt.sign(payload, TOKEN_KEY);

      const allUsers = await db.query(`SELECT * from users`);
      return res.status(200).json({
        status: 'ok',
        code: 200,
        data: {
          token,
          user: user.rows[0],
          users: allUsers.rows,
        },
        message: `Welcome, admin ${name}`,
      });
    }

    if (user.rows[0].status === 'boss') {
      const payload = {
        id: user.rows[0].id,
      };
      const { TOKEN_KEY } = process.env;
      const token = jwt.sign(payload, TOKEN_KEY);

      const allRegulars = await db.query(
        `SELECT * from users where boss_name=$1`,
        [name]
      );
      return res.status(200).json({
        status: 'ok',
        code: 200,
        data: {
          token,
          user: user.rows[0],
          users: allRegulars.rows,
        },
        message: `Welcome, boss ${name}`,
      });
    }

    res.status(200).json({
      status: 'ok',
      code: 200,
      data: user.rows[0],
      message: `Welcome ${name}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
