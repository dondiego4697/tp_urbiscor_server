import {IUser} from "../models/User";

export default class UserDAO {
    public static async create(pool, user: IUser): Promise<Array<IUser>> {
        const client = await pool.connect();
        try {
            const query = {
                text: 'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *;',
                values: [user.login, user.password]
            };
            const res = await client.query(query);
            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
    };

    public static async getUser(pool, user: IUser): Promise<Array<IUser>> {
        const client = await pool.connect();
        try {
            const query = {
                text: 'SELECT * FROM users WHERE login=$1 AND password=$2;',
                values: [user.login, user.password]
            };
            const res = await client.query(query);
            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
    };

    public static async getById(pool, userId: number): Promise<Array<IUser>> {
        const client = await pool.connect();
        try {
            const query = {
                text: 'SELECT users.login, users.id, users.created FROM users WHERE id=$1;',
                values: [userId]
            };
            const res = await client.query(query);
            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
    };
}