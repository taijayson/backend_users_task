const db = require('../../db/db');

const createUser = async (req, res, next) => {
  const { name, password, status } = req.body;
  try {
    const user = await db.query(`SELECT * from users where name=$1`, [name]);

    if (user.rows.length > 0) {
      return res.status(400).json({
        code: 400,
        message: `User name ${name} already exist`,
      });
    }

    if (status === 'admin') {
      await db.query(
        `INSERT INTO users (name, password, status) values ($1, $2, $3) RETURNING *`,
        [name, password, status]
      );
      const allUsers = await db.query(`SELECT * from users`);
      return res.status(200).json({
        code: 200,
        data: { admin: name, users: allUsers.rows },
        message: `Welcome, admin ${name}`,
      });
    }

    if ((status === 'regular' || 'boss') && !req.body.boss_name) {
      return res.status(400).json({
        code: 400,
        message: `Regular or boss users need a boss_name`,
      });
    }

    const newUser = await db.query(
      `INSERT INTO users (name, password, status, boss_name) values ($1, $2, $3, $4) RETURNING *`,
      [name, password, status, req.body.boss_name]
    );
    res.status(201).json({
      code: 201,
      data: newUser.rows[0],
      message: `Welcome ${name}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
