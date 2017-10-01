interface IConfig {
    database: object
}
let CONFIG: IConfig = {
    database: {
        user: 'postgres',
        host: 'localhost',
        database: 'urbiscor',
        password: 'znkzslvj4g',
        port: 5432
    }
};
if (process.env.NODE_ENV === 'production') {
    CONFIG.database = {connectionString: process.env.DATABASE_URL};
}
module.exports = CONFIG;