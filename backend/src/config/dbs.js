import "dotenv/config";

let db = {
    bd: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host:process.env.DB_HOST,
    port: process.env.DB_PORT
}

if(process.env.NODE_ENV === 'true') {
    db = {
        bd: process.env.TEST_DB_NAME,
        user: process.env.TEST_DB_USER,
        password: process.env.TEST_DB_PASS,
        host:process.env.TEST_DB_HOST,
        port: process.env.TEST_DB_PORT
    }
} 

export default db