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

