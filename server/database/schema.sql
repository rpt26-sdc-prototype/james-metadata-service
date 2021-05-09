CREATE DATABASE IF NOT EXISTS fec_pathfinder_metadata;
USE fec_pathfinder_metadata;
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'item_genre_joinTable'
--
-- ---

-- DROP TABLE IF EXISTS `item_genre_joinTable`;

-- CREATE TABLE `item_genre_joinTable` (
--   `id` INTEGER NOT NULL AUTO_INCREMENT,
--   `id_games` INTEGER NULL DEFAULT NULL,
--   `id_genres` INTEGER NULL DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- );

-- ---
-- Table 'games'
--
-- ---

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

-- ---
-- Table 'genres'
--
-- ---

-- DROP TABLE IF EXISTS `genres`;

-- CREATE TABLE `genres` (
--   `id` INTEGER NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(100) NULL DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- );

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE `item_genre_joinTable` ADD FOREIGN KEY (id_games) REFERENCES `games` (`id`);
-- ALTER TABLE `item_genre_joinTable` ADD FOREIGN KEY (id_genres) REFERENCES `genres` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `item_genre_joinTable` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `games` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `genres` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `item_genre_joinTable` (`id`,`id_games`,`id_genres`) VALUES
-- ('','','');
-- INSERT INTO `games` (`id`,`name`,`price`,`description`,`shortDescription`,`developer`,`publisher`,`releaseDate`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `genres` (`id`,`name`) VALUES
-- ('','');
