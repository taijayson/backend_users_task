///////////////// Node.js + PostgreSQL //////////////////

!!!!!!!!! Launch !!!!!!!!!!

1. At the beginning, install or launch your database at PORT 5432. You can use [Postgress App](https://postgresapp.com/) as a simple database client
2. Clone this repository to your local machine
3. Change name in Pool object in db.js, admin is default
4. Copy "create table" script from database.sql in db folder, to your psql terminal, it will create users table in your database with required coloumns
5. Npm install
6. Npm start
   Server will be run at PORT 8080

For testing app use [Postman](https://www.postman.com/)

!!!!!!!!==!!!!!!!!!! Requests !!!!!!!!==!!!!!!!!!

=-----============ Publick routes =============-----=

REGISTER : http://localhost:8080/api/auth/register

--=-=-=-=-=-=-=-=-=-=--

BODY EXAMPLE for ADMIN USER: {
"name":"admin",
"password":"admin",
"status":"admin"
}

RESPONSE JSON EXAMPLE for ADMIN USER: {
{
"status": "ok",
"code": 200,
"data": {
"token": Your token,
"user": Your {id, name, password, status}
"users": All users array
[
{id1, name1, password1, status1, boss},
{id2, name2, password2, status2, boss},
{id3, name3, password3, status3, boss}
]
},
"message": "Welcome, admin Your name"
}
}

-=-=-=-=-=-=-=-=-=-=-=-=-=-

BODY EXAMPLE for BOSS USER: {
"name":"boss",
"password":"boss",
"status":"admin",
"boss_name": "mainboss"
}

RESPONSE JSON EXAMPLE for BOSS USER: {
{
"status": "ok",
"code": 200,
"data": {
"token": Your token,
"user": Your {id, name, password, status}
"regulars": Your subordinates
[
{id1, name1, password1, status1, boss},
{id2, name2, password2, status2, boss},
{id3, name3, password3, status3, boss}
]
},
"message": "Welcome, boss Your name"
}
}

-=-=-=-=-=-=-=-=-=-=-=-=-=-

BODY EXAMPLE for REGULAR USER: {
"name":"boss",
"password":"boss",
"status":"admin",
"boss_name": "mainboss"
}

RESPONSE JSON EXAMPLE for REGULAR USER: {
{
"status": "ok",
"code": 200,
"data": {
"token": Your token,
"user": Your {id, name, password, status}
"message": "Welcome Your name"
}
}

--=-=-=-=-=-=-=-=-=-=--

LOGIN : http://localhost:8080/api/auth/login

BODY EXAMPLE for ALL: {
"name":"yourName",
"password":"yourPassword"
}

RESPONSE JSON WILL BE THE SAME AS REGISTER EXAMPLES

=-----============ Private routes =============-----=

!! ADMIN AND BOSS USER WILL GET TOKEN AFTER REGISTER OR LOGIN !!
!!---------- WHICH SHOULD BE USE FOR PRIVAT ROUTES -----------!!

BOSS CHANGE (only for BOSS user) : http://localhost:8080/api/users/changeboss

BODY EXAMPLE: {
"regular":"bossSubordinateName",
"boss_name":"nextBossName"
}

RESPONSE JSON EXAMPLE for BOSS CHANGE: {
{
"status": "ok",
"code": 201,
"regular": {
"id": 7,
"name": "regularName",
"password": "regular",
"status": "regular",
"boss_name": "nextBossName"
},
"message": "regularName boss changed from yourName to nextBossName"
}

--=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-

DELETE USER (only for ADMIN user) : http://localhost:8080/api/users/delete/:userId

RESPONSE JSON EXAMPLE for DELETE: {
{
"status": "ok",
"code": 204,
"message": "Successfully del"
}
