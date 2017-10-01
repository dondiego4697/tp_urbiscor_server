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
}