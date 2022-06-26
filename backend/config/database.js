require ("dotenv").config()

module.exports={
    database_uri:process.env.DATABASE_URI,
    port:process.env.PORT
}
