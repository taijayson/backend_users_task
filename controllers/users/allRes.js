const db = require('../../db/db');

const getAllUsers = async (req, res, next) => {
  const { status } = req.params;
  const users = await db.query(`SELECT * from ${status}`);
  res.status(200).json({
    code: 200,
    data: users.rows,
  });
};

const getOneUser = async (req, res, next) => {
  const { id, status } = req.params;
  const user = await db.query(`SELECT * from ${status} where id=$1`, [id]);
  res.status(200).json({
    code: 200,
    data: user.rows[0],
  });
};

const updateUser = async (req, res, next) => {
  const { name, password } = req.body;
  const updatedUser = await db.query(
    `UPDATE ${status} set name = $1, password = $2, status = $3 where id = $4 RETURNING *`,
    [name, password, status, id]
  );
  res.status(201).json({
    code: 201,
    data: updatedUser.rows[0],
    message: `Take your changes, ${name}`,
  });
};

const deleteUser = async (req, res, next) => {
  const { id, status } = req.params;
  await db.query(`DELETE from ${status} where id=$1`, [id]);
  res.status(200).json({
    code: 204,
    message: 'Successfully del',
  });
};

module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
