import {IPlace} from "../models/Place";

export default class PlaceDAO {
    public static async getAll(pool, limit: number, offset: number): Promise<Array<IPlace>> {
        const client = await pool.connect();
        try {
            const query = {
                text: `SELECT
                        place.id,
                        ST_AsText(place.point),
                        place.created,
                        users.login as user_login,
                        category.slug as category_slug,
                        category.name as category_name
                       FROM place
                       JOIN users ON users.id = place.creator_id
                       JOIN category ON category.id = place.category_id
                        LIMIT $1
                        OFFSET $2`,
                values: [limit, offset]
            };
            const res = await client.query(query);
            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
    };

    public static async create(pool, place: IPlace): Promise<Array<IPlace>> {
        const client = await pool.connect();
        try {
            const query = {
                text: `INSERT INTO place (category_id, creator_id, point)
                 VALUES ($1, $2, st_geogfromtext('POINT(${place.point[0]} ${place.point[1]})')) RETURNING *;`,
                values: [place.categoryId, place.creatorId]
            };
            const res = await client.query(query);
            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
    };

    public static async delete(pool, id: number, userId: number): Promise<Array<IPlace>> {
        const client = await pool.connect();
        try {
            const query = {
                text: `DELETE FROM place WHERE id = $1 AND creator_id = $2 RETURNING *;`,
                values: [id, userId]
            };
            const res = await client.query(query);
            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
    };

    public static async update(pool, id: number, userId: number, updateData: any): Promise<Array<IPlace>> {
        let index = 3;
        let data = {
            keysStr: [],
            indexStr: [],
            argsArr: [id, userId]
        };
        if (updateData.point) {
            data.keysStr.push('point');
            data.indexStr.push(`st_geogfromtext('POINT(${updateData.point[0]} ${updateData.point[1]})')`);
        }
        if (updateData.category_id) {
            data.keysStr.push('category_id');
            data.indexStr.push(`$${index++}`);
            data.argsArr.push(updateData.category_id);
        }
        const client = await pool.connect();
        try {
            const query = {
                text: `UPDATE place SET (${data.keysStr.join(', ')})=(${data.indexStr.join(', ')}) WHERE id=$1 AND creator_id=$2 RETURNING *;`,
                values: data.argsArr
            };
            const res = await client.query(query);
            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
    };

    public static async getAround(pool, point: Array<number>, limit: number, offset: number, step: number): Promise<Array<IPlace>> {
        const client = await pool.connect();
        try {
            const query = {
                text: `SELECT
                        place.id,
                        ST_AsText(place.point),
                        place.created,
                        users.login as user_login,
                        category.slug as category_slug,
                        category.name as category_name
                       FROM place
                        JOIN users ON users.id = place.creator_id
                        JOIN category ON category.id = place.category_id
                       WHERE ST_DWithin(point, ST_GeographyFromText('POINT(${point[0]} ${point[1]})'), $3)
                       LIMIT $1
                       OFFSET $2`,
                values: [limit, offset, step]
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