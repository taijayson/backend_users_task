const db = require('../../db/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async (req, res, next) => {
  try {
    const { name, password, status, boss_name } = req.body;
    if (
      !name ||
      !password ||
      !status ||
      (status !== 'admin' && !boss_name)
    ) {
      const allBoss = await db.query(
        `SELECT name from users where status=$1`,
        ['boss']
      );
      const allBossNames = allBoss.rows.map((item) => item.name);
      return res.status(400).json({
        status: 'bad request',
        code: 400,
        bosses: allBossNames,
        message:
          'Need name, password, status(admin, boss, regular), boss_name(only for boss and regular status users, choose your boss from list above) in request body',
      });
    }
    const user = await db.query(`SELECT * from users where name=$1`, [
      name,
    ]);

    if (user.rows.length > 0) {
      return res.status(400).json({
        status: 'bad request',
        code: 400,
        message: `User name ${name} already exist`,
      });
    }

    if (status === 'admin') {
      const admin = await db.query(
        `INSERT INTO users (name, password, status) values ($1, $2, $3) RETURNING *`,
        [name, password, status]
      );

      const payload = {
        id: admin.rows[0].id,
      };
      const { TOKEN_KEY } = process.env;
      const token = jwt.sign(payload, TOKEN_KEY);

      const allUsers = await db.query(`SELECT * from users`);
      return res.status(200).json({
        status: 'ok',
        code: 200,
        data: {
          token,
          user: admin.rows[0],
          users: allUsers.rows,
        },
        message: `Welcome, admin ${name}`,
      });
    }

    if (status === 'boss') {
      const boss = await db.query(
        `INSERT INTO users (name, password, status, boss_name) values ($1, $2, $3, $4) RETURNING *`,
        [name, password, status, boss_name]
      );

      const payload = {
        id: boss.rows[0].id,
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
          user: boss.rows[0],
          regulars: allRegulars.rows,
        },
        message: `Welcome, boss ${name}`,
      });
    }

    const newUser = await db.query(
      `INSERT INTO users (name, password, status, boss_name) values ($1, $2, $3, $4) RETURNING *`,
      [name, password, status, boss_name]
    );
    res.status(201).json({
      status: 'ok',
      code: 201,
      data: newUser.rows[0],
      message: `Welcome ${name}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
