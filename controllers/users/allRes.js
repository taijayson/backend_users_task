const db = require('../../db/db')

const createUser = async (req,res,next)=>{
const {name, password,status} = req.body
const newUser = await db.query(`INSERT INTO ${status} (name, password) values ($1, $2) RETURNING *`, [name, password])
res.status(201).json({
    code:201,
    data:newUser.rows[0],
    message:`Welcome ${name}`
})
}

const getAllUsers = async (req,res,next)=>{
    const {status} = req.query
const users = await db.query(`SELECT * from ${status}`)
res.status(200).json({
    code:200,
    data:users.rows, 
})
}

const getOneUser = async (req,res,next)=>{

}

const updateUser = async (req,res,next)=>{

}

const deleteUser = async (req,res,next)=>{

}

module.exports = {
    createUser,getAllUsers,getOneUser,updateUser,deleteUser
};
