import "dotenv/config";
import { Sequelize } from "sequelize";

const db_name = process.env.MYSQL_DATABASE
const db_user = process.env.MYSQL_USER
const db_pass = process.env.MYSQL_PASSWORD

const conn = new Sequelize(db_name, db_user, db_pass, {
    host: process.env.MYSQL_HOST,
    dialect: "mysql"
})

try{
    await conn.authenticate();
    console.log("Connection MYSQL")
}catch(error){
    console.error("Error: ", error)
}

export default conn;
