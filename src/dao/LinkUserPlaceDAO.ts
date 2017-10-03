import {ILinkUserPlace} from "../models/LinkUserPlace";

export default class LinkUserPlaceDAO {
    public static async create(pool, link: ILinkUserPlace, clientZ?): Promise<Array<ILinkUserPlace>> {
        const client = clientZ || await pool.connect();
        try {
            const query = {
                text: 'INSERT INTO link_user_place (user_id, place_id) VALUES ($1, $2) RETURNING *;',
                values: [link.userId, link.placeId]
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

    public static async delete(pool, link: ILinkUserPlace, clientZ?): Promise<Array<ILinkUserPlace>> {
        const client = clientZ || await pool.connect();
        try {
            const query = {
                text: 'DELETE FROM link_user_place WHERE (user_id, place_id) = ($1, $2) RETURNING *;',
                values: [link.userId, link.placeId]
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

    public static async getPlaceSubscribers(pool, placeId: number, limit: number, offset: number): Promise<Array<ILinkUserPlace>> {
        const client = await pool.connect();
        try {
            const query = {
                text: `SELECT
                        users.id,
                        users.login,
                        users.created
                       FROM users
                       JOIN link_user_place ON users.id = link_user_place.user_id
                       WHERE link_user_place.place_id = $1
                       LIMIT $2
                       OFFSET $3;`,
                values: [placeId, limit, offset]
            };
            const res = await client.query(query);
            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
    };

    public static async getUserSubscriptions(pool, userId: number, limit: number, offset: number, desc: string): Promise<Array<ILinkUserPlace>> {
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
                        category.id as category_id,
                        category.name as category_name,
                        category.slug as category_slug
                       FROM link_user_place
                        JOIN place ON place.id = link_user_place.place_id
                        JOIN category ON category.id = place.category_id
                       WHERE link_user_place.user_id = $1
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
}