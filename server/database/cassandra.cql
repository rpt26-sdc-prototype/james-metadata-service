DROP KEYSPACE IF EXISTS sdc;
CREATE KEYSPACE sdc WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor': 1};

USE sdc;

CREATE TABLE games (
  id int PRIMARY KEY,
  name text,
  price decimal,
  description text,
  shortDescription text,
  genre text,
  developer text,
  publisher text,
  releaseDate bigint
);

COPY games(id,name,price,description,shortDescription,genre,developer,publisher,releaseDate) FROM 'server/database/games.csv' WITH DELIMITER=',' AND HEADER=TRUE;
