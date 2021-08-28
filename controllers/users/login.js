const db = require('../../db/db');

const loginUser = async (req, res, next) => {
  const { name, password, status } = req.body;
  try {
    const user = await db.query(`SELECT * from users where name=$1`, [name]);
    if (user.rows.length < 0) {
      return res.status(400).json({
        code: 400,
        message: `User not registered`,
      });
    }
    if (status === 'regular' && !req.body.boss_id) {
      return res.status(400).json({
        code: 400,
        message: `Regular users need a boss_id`,
      });
    }
    const newUser = await db.query(
      `INSERT INTO users (name, password, status) values ($1, $2, $3) RETURNING *`,
      [name, password, status]
      // `ALTER TABLE admin ADD COLUMN status VARCHAR(255)`
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

module.exports = loginUser;
