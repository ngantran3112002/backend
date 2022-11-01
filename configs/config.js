const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: "localhost",
        user: "root",
        password: "ASD123qwe@",
        database: "admin",
        connectionLimit : 100, //important

    },
    // listPerPage: 10,
};
module.exports = config;