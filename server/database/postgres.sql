DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;

\c sdc;

CREATE TABLE games (
  id integer PRIMARY KEY,
  name text,
  price numeric(4,2),
  description text,
  shortDescription text,
  genre text,
  developer text,
  publisher text,
  releaseDate bigint
);

\copy games(id,name,price,description,shortDescription,genre,developer,publisher,releaseDate) FROM 'server/database/games.csv' DELIMITER ',' CSV HEADER;
