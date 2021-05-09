CREATE DATABASE IF NOT EXISTS fec_pathfinder_metadata;
USE fec_pathfinder_metadata;

DROP TABLE IF EXISTS `games`;

CREATE TABLE `games` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT 'NULL',
  `price` INTEGER NULL DEFAULT NULL,
  `description` LONGBLOB NULL,
  `shortDescription` BLOB NULL,
  `genre` VARCHAR(100),
  `developer` VARCHAR(100) NULL DEFAULT 'NULL',
  `publisher` VARCHAR(100) NULL DEFAULT NULL,
  `releaseDate` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);
