import {IPlace} from "../models/Place";
const RETURNING_PLACE = `place.id, place.creator_id, place.category_id, place.description, place.title, place.created, place.time_start, 
                place.subscribers, ST_AsText(place.point) as point`;

export default class PlaceDAO {
    public static async getAll(pool, limit: number, offset: number, category: string, desc: string): Promise<Array<IPlace>> {
        desc = desc ? 'DESC' : '';
        const client = await pool.connect();
        try {
            const query = {
                text: `SELECT
                        place.id,
                        ST_AsText(place.point) as point,
                        place.description,
                        place.title,
                        place.created,
                        place.time_start,
                        place.subscribers,
                        users.id as user_id,
                        users.login as user_login,
                        category.id as category_id,
                        category.slug as category_slug,
                        category.name as category_name
                       FROM place
                       JOIN users ON users.id = place.creator_id
                       JOIN category ON category.id = place.category_id
                        ${category ? 'WHERE category.slug = $3' : ''}                        
                        ORDER BY place.created ${desc}
                        LIMIT $1
                        OFFSET $2`,
                values: (() => {
                    let result: Array<any> = [limit, offset];
                    category ? result.push(category) : null;
                    return result;
                })()
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
                text: `INSERT INTO place (category_id, creator_id, description, title, time_start, point)
                 VALUES ($1, $2, $3, $4, $5, st_geogfromtext('POINT(${place.point[0]} ${place.point[1]})')) RETURNING ${RETURNING_PLACE};`,
                values: [place.categoryId, place.creatorId, place.description, place.title, place.timeStart]
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
                text: `DELETE FROM place WHERE id = $1 AND creator_id = $2 RETURNING ${RETURNING_PLACE};`,
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
        ['category_id', 'description', 'title', 'time_start'].forEach(key => {
            if (updateData[key]) {
                data.keysStr.push(key);
                data.indexStr.push(`$${index++}`);
                data.argsArr.push(updateData[key]);
            }
        });
        const client = await pool.connect();
        try {
            const query = {
                text: `UPDATE place SET (${data.keysStr.join(', ')})=(${data.indexStr.join(', ')}) 
                WHERE id=$1 AND creator_id=$2 RETURNING ${RETURNING_PLACE};`,
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

    public static async getAround(pool, point: Array<number>, limit: number, offset: number, step: number, category: string): Promise<Array<IPlace>> {
        const client = await pool.connect();
        try {
            const query = {
                text: `SELECT
                        place.id,
                        ST_AsText(place.point) as point,
                        place.description,
                        place.title,
                        place.time_start,
                        place.created,
                        place.subscribers,
                        users.id as user_id,
                        users.login as user_login,
                        category.id as category_id,
                        category.slug as category_slug,
                        category.name as category_name
                       FROM place
                        JOIN users ON users.id = place.creator_id
                        JOIN category ON category.id = place.category_id
                       WHERE ST_DWithin(point, ST_GeographyFromText('POINT(${point[0]} ${point[1]})'), $3)
                       ${category ? 'AND category.slug = $4' : ''}                        
                       LIMIT $1
                       OFFSET $2`,
                values: (() => {
                    let result: Array<any> = [limit, offset, step];
                    category ? result.push(category) : null;
                    return result;
                })()
            };
            const res = await client.query(query);
            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
    };

    public static async getUserPlaces(pool, userId: number, limit: number, offset: number, desc: string): Promise<Array<IPlace>> {
        const client = await pool.connect();
        try {
            const query = {
                text: `SELECT
                        place.id,
                        ST_AsText(place.point) as point,
                        place.description,
                        place.title,
                        place.created,
                        place.subscribers,
                        place.time_start,
                        category.id as category_id,
                        category.slug as category_slug,
                        category.name as category_name
                       FROM place
                        JOIN category ON category.id = place.category_id
                       WHERE place.creator_id = $1
                       ORDER BY place.created ${desc}
                       LIMIT $2
                       OFFSET $3;`,
                values: [userId, limit, offset]
            };
            const res = await client.query(query);
            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
    };

    public static async getById(pool, id, clientZ?): Promise<Array<IPlace>> {
        const client = clientZ || await pool.connect();
        try {
            const query = {
                text: `SELECT * FROM place WHERE id=$1`,
                values: [id]
            };
            const res = await client.query(query);
            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            if (!clientZ) {
                client.release();
            }
        }
    };
}