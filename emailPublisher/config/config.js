require("dotenv").config();

module.exports = {
    development: {
        username: "root",
        password: "pass",
        database: "database_development",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: false,
    },
    test: {
        username: "root",
        password: "pass",
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: false,
    },
    production: {
        username: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: "database_production",
        host: process.env.HOST,
        dialect: "mysql",
        logging: false,
    },
};
