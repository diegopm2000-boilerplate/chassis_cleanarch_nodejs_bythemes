-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema gamecollector-db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `gamecollector-db` ;

-- -----------------------------------------------------
-- Schema gamecollector-db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gamecollector-db` ;
USE `gamecollector-db` ;

-- -----------------------------------------------------
-- Table `gamecollector-db`.`Gamesystems`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamecollector-db`.`Gamesystems` ;

CREATE TABLE IF NOT EXISTS `gamecollector-db`.`Gamesystems` (
  `id` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gamecollector-db`.`Videogames`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamecollector-db`.`Videogames` ;

CREATE TABLE IF NOT EXISTS `gamecollector-db`.`Videogames` (
  `id` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `developer` VARCHAR(45) NOT NULL,
  `genre` VARCHAR(45) NOT NULL,
  `year` INT NOT NULL,
  `gamesystemId` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `gamesystemId`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `fk_Videogames_Gamesystems_idx` (`gamesystemId` ASC) VISIBLE,
  CONSTRAINT `fk_Videogames_Gamesystems`
    FOREIGN KEY (`gamesystemId`)
    REFERENCES `gamecollector-db`.`Gamesystems` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `gamecollector-db`.`Gamesystems`
-- -----------------------------------------------------
START TRANSACTION;
USE `gamecollector-db`;
INSERT INTO `gamecollector-db`.`Gamesystems` (`id`, `name`, `description`) VALUES ('1', 'ZX Spectrum', 'A 8 bits micro computer by Sinclair');
INSERT INTO `gamecollector-db`.`Gamesystems` (`id`, `name`, `description`) VALUES ('2', 'Nintendo NES', 'A 8 bits console by Nintendo');
INSERT INTO `gamecollector-db`.`Gamesystems` (`id`, `name`, `description`) VALUES ('3', 'Megadrive', 'A 16 bits console by Sega');
INSERT INTO `gamecollector-db`.`Gamesystems` (`id`, `name`, `description`) VALUES ('4', 'Amiga', 'A 16 bits computer by Commodore');

COMMIT;


-- -----------------------------------------------------
-- Data for table `gamecollector-db`.`Videogames`
-- -----------------------------------------------------
START TRANSACTION;
USE `gamecollector-db`;
INSERT INTO `gamecollector-db`.`Videogames` (`id`, `name`, `developer`, `genre`, `year`, `gamesystemId`) VALUES ('1', 'Super Mario Bros', 'Nintendo', 'Platforms', 1985, '2');
INSERT INTO `gamecollector-db`.`Videogames` (`id`, `name`, `developer`, `genre`, `year`, `gamesystemId`) VALUES ('2', 'Head Over Heels', 'Ocean', '3D Adventure', 1987, '1');
INSERT INTO `gamecollector-db`.`Videogames` (`id`, `name`, `developer`, `genre`, `year`, `gamesystemId`) VALUES ('3', 'Fairlight', 'The Edge', '3D Adventure', 1985, '1');
INSERT INTO `gamecollector-db`.`Videogames` (`id`, `name`, `developer`, `genre`, `year`, `gamesystemId`) VALUES ('4', 'Sonic', 'Sega', 'Platforms', 1991, '3');
INSERT INTO `gamecollector-db`.`Videogames` (`id`, `name`, `developer`, `genre`, `year`, `gamesystemId`) VALUES ('5', 'Defender of the Crown', 'Cinemaware', 'Strategic', 1986, '4');
INSERT INTO `gamecollector-db`.`Videogames` (`id`, `name`, `developer`, `genre`, `year`, `gamesystemId`) VALUES ('6', 'Rocket Ranger', 'Cinemaware', 'Action / Adventure', 1988, '4');

COMMIT;

