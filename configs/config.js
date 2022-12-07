const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        // host: "10.102.18.99",
        user: "root",
        host: "localhost",
        password: "qwertyuiop",
        database: "w42g9_web",
        // database: "test",
        // socketPath: '/var/run/mysqld/mysqld.sock',
        connectionLimit : 100, //important

    },
};
module.exports = config;