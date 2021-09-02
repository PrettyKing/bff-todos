import dotenv from "dotenv"
dotenv.config()

module.exports = {
    port: 7001,
    mongodb_host: process.env.MONGODB_HOST,
    mongodb_port: process.env.MONGODB_PORT,
    mongodb_user: process.env.MONGODB_USER,
    mongodb_password: process.env.MONGODB_PASSWORD,
    mongodb_database: process.env.MONGODB_DATABASE,
    mongodb_auth: process.env.MONGIDB_AUTH
}
