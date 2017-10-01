import {ICategory} from '../models/Category';
import createPreSqlRequest from '../support/createPreSqlRequest';

export default class CategoryDAO {
    public static async create(pool, category: ICategory): Promise<Array<ICategory>> {
        const client = await pool.connect();
        try {
            const query = {
                text: 'INSERT INTO category (slug, name) VALUES ($1, $2) RETURNING *;',
                values: [category.slug, category.name]
            };
            const res = await client.query(query);
            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
    };

    public static async getAll(pool): Promise<Array<ICategory>> {
        const client = await pool.connect();
        try {
            const res = await client.query(
                `SELECT * FROM category ORDER BY id;`
            );
            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
    }
}