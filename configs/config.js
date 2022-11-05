const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: "pop-os",
        user: "root",
        password: "ASD123qwe@",
        database: "admin",
        socketPath: '/var/run/mysqld/mysqld.sock',
        connectionLimit : 100, //important

    },
    // listPerPage: 10,
};
module.exports = config;