const db = require('../../db/db');

const updateUser = async (req, res, next) => {
  try {
    const { name, status } = req.user.rows[0];

    if (status !== 'boss') {
      return res.status(400).json({
        status: 'fail',
        code: 400,
        message: 'Only boss can change user boss_name',
      });
    }

    const { regular, boss_name } = req.body;

    const regularUser = await db.query(
      `SELECT * from users where name=$1`,
      [regular]
    );

    if (regularUser.rows[0].boss_name !== name) {
      return res.status(400).json({
        status: 'fail',
        code: 400,
        message:
          'Boss can change user boss_name only for his own regulars',
      });
    }

    const updatedUser = await db.query(
      `UPDATE users set boss_name = $1 where name = $2 RETURNING *`,
      [boss_name, regular]
    );

    res.status(201).json({
      status: 'ok',
      code: 201,
      data: updatedUser.rows[0],
      message: `Take your changes, ${name}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;
