DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;

\c sdc;

CREATE TABLE games (
  id integer PRIMARY KEY,
  game jsonb
);

\copy games FROM 'games.csv' WITH (FORMAT csv, HEADER);
