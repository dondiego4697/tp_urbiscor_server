CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL PRIMARY KEY NOT NULL,
    login TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX IF NOT EXISTS user_index ON public.users (login);

CREATE TABLE IF NOT EXISTS public.category
(
    id SERIAL PRIMARY KEY NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS category_index ON public.category (slug);

CREATE TABLE IF NOT EXISTS public.place
(
    id SERIAL PRIMARY KEY NOT NULL,
    creator_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES category(id),
    description TEXT NOT NULL,
    title TEXT NOT NULL,
    point geography NOT NULL,
    created TIMESTAMP WITH TIME ZONE DEFAULT now(),
    time_start TIMESTAMP WITH TIME ZONE NOT NULL,
    subscribers INTEGER DEFAULT 0
    UNIQUE (creator_id, category_id, point)
);
CREATE INDEX IF NOT EXISTS place_index ON public.place (point);

CREATE TABLE IF NOT EXISTS public.link_user_place
(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    place_id INT NOT NULL REFERENCES place(id) ON DELETE CASCADE,
    UNIQUE (user_id, place_id)
);
CREATE INDEX IF NOT EXISTS link_user_place_index ON public.link_user_place (user_id, place_id);


CREATE OR REPLACE FUNCTION place_subscribe() RETURNS TRIGGER AS
  $BODY$
    BEGIN
      UPDATE place SET subscribers=place.subscribers+1 WHERE id=new.place_id;
      RETURN new;
    END;
  $BODY$
  LANGUAGE plpgsql;
CREATE TRIGGER placeSubscribe AFTER INSERT ON link_user_place FOR EACH ROW EXECUTE PROCEDURE place_subscribe();


CREATE OR REPLACE FUNCTION place_unsubscribe() RETURNS TRIGGER AS
$BODY$
BEGIN
  UPDATE place SET subscribers=place.subscribers-1 WHERE id=old.place_id;
  RETURN new;
END;
$BODY$
LANGUAGE plpgsql;
CREATE TRIGGER placeUnsubscribe AFTER DELETE ON link_user_place FOR EACH ROW EXECUTE PROCEDURE place_unsubscribe();

