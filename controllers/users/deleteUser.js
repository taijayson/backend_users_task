const db = require('../../db/db');

const deleteUser = async (req, res, next) => {
  try {
    const { status } = req.user.rows[0];

    if (status !== 'admin') {
      return res.status(400).json({
        status: 'fail',
        code: 400,
        message: 'Only admin can delete user from base',
      });
    }

    const { userId } = req.params;

    const user = await db.query(`SELECT * from users where id=$1`, [
      userId,
    ]);

    if (!user.rows[0]) {
      return res.status(400).json({
        status: 'fail',
        code: 400,
        message: 'User not found, need correct userId in /delete/userId',
      });
    }

    await db.query(`DELETE from users where id=$1`, [userId]);
    res.status(200).json({
      status: 'ok',
      code: 204,
      message: 'Successfully del',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteUser;
