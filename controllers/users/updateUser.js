const db = require('../../db/db');

const updateUser = async (req, res, next) => {
  try {
    const { name, status } = req.user.rows[0];

    if (status !== 'boss') {
      return res.status(403).json({
        status: 'forbidden',
        code: 403,
        message: 'Only boss can change user boss_name',
      });
    }

    const { regular, boss_name } = req.body;

    const regularUser = await db.query(
      `SELECT * from users where name=$1`,
      [regular]
    );

    if (regularUser.rows[0].boss_name !== name) {
      return res.status(403).json({
        status: 'forbidden',
        code: 403,
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
      regular: updatedUser.rows[0],
      message: `${updatedUser.rows[0].name} boss changed from ${regularUser.rows[0].boss_name} to ${updatedUser.rows[0].boss_name}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;
