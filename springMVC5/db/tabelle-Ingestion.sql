-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generato il: Mar 26, 2014 alle 14:38
-- Versione del server: 5.6.11
-- Versione PHP: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `siimobility`
--
CREATE DATABASE IF NOT EXISTS `siimobility` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `siimobility`;

-- --------------------------------------------------------

--
-- Struttura della tabella `tbl_accesso`
--

CREATE TABLE IF NOT EXISTS `tbl_accesso` (
  `COD_ACC` varchar(20) NOT NULL,
  `COD_ELE` varchar(20) DEFAULT NULL,
  `x` decimal(20,10) unsigned DEFAULT NULL,
  `y` decimal(20,10) unsigned DEFAULT NULL,
  `TIP_ACC` varchar(100) DEFAULT NULL,
  `PAS_CAR` varchar(100) DEFAULT NULL,
  `ORG` varchar(100) DEFAULT NULL,
  `ISO_DATE` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`COD_ACC`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `tbl_cippo`
--

CREATE TABLE IF NOT EXISTS `tbl_cippo` (
  `x` decimal(20,10) DEFAULT NULL,
  `y` decimal(20,10) DEFAULT NULL,
  `COD_PNT` varchar(15) NOT NULL DEFAULT '',
  `COD_ELE` varchar(15) DEFAULT NULL,
  `PROG` int(3) DEFAULT NULL,
  `ISO_DATE` varchar(29) DEFAULT NULL,
  `ORG` varchar(70) NOT NULL,
  PRIMARY KEY (`COD_PNT`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `tbl_comune`
--

CREATE TABLE IF NOT EXISTS `tbl_comune` (
  `ID_COM` int(7) DEFAULT NULL,
  `DEN_UFF` varchar(100) DEFAULT NULL,
  `COD_COM` varchar(20) DEFAULT NULL,
  `COD_ISTAT` varchar(6) NOT NULL DEFAULT '0',
  `ID_PROV` varchar(5) DEFAULT NULL,
  `ISO_DATE` varchar(40) DEFAULT NULL,
  `ORG` varchar(70) NOT NULL,
  PRIMARY KEY (`COD_ISTAT`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `tbl_coord_el_strad`
--

CREATE TABLE IF NOT EXISTS `tbl_coord_el_strad` (
  `COORD_ID` varchar(30) NOT NULL,
  `COD_ELE` varchar(20) DEFAULT NULL,
  `COORD_N2` int(20) unsigned DEFAULT NULL,
  `X_INI` decimal(20,15) unsigned DEFAULT NULL,
  `Y_INI` decimal(20,15) unsigned DEFAULT NULL,
  `X_FIN` decimal(20,15) DEFAULT NULL,
  `Y_FIN` decimal(20,15) NOT NULL,
  `ID_INI` varchar(30) DEFAULT NULL,
  `ID_FIN` varchar(30) DEFAULT NULL,
  `ISO_DATE` varchar(40) NOT NULL,
  `ORG` varchar(70) NOT NULL,
  PRIMARY KEY (`COORD_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `tbl_elenco_comuni`
--

CREATE TABLE IF NOT EXISTS `tbl_elenco_comuni` (
  `ID_COM` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `DEN_UFF` varchar(200) NOT NULL,
  `COD_COM` varchar(4) NOT NULL,
  `COD_ISTAT` varchar(6) NOT NULL,
  `ID_PROV` varchar(3) NOT NULL,
  `ISO_DATE` varchar(40) NOT NULL,
  `ORG` varchar(200) NOT NULL,
  PRIMARY KEY (`ID_COM`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=290 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `tbl_elenco_province`
--

CREATE TABLE IF NOT EXISTS `tbl_elenco_province` (
  `ID_PROV` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `DEN_UFF` varchar(200) NOT NULL,
  `SIGLA_PROV` varchar(2) NOT NULL,
  `COD_ISTAT` varchar(6) NOT NULL,
  `ID_REG` varchar(3) NOT NULL,
  `ISO_DATE` varchar(40) NOT NULL,
  `ORG` varchar(200) NOT NULL,
  PRIMARY KEY (`ID_PROV`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `tbl_el_stradale`
--

CREATE TABLE IF NOT EXISTS `tbl_el_stradale` (
  `COD_ELE` varchar(20) NOT NULL DEFAULT '',
  `NOD_INI` varchar(20) DEFAULT NULL,
  `NOD_FIN` varchar(20) DEFAULT NULL,
  `TIP_ELE` varchar(60) DEFAULT NULL,
  `CLS_TCN` varchar(70) DEFAULT NULL,
  `COD_GST` varchar(20) DEFAULT NULL,
  `CMP_ELE` varchar(30) DEFAULT NULL,
  `ORG` varchar(50) DEFAULT NULL,
  `COD_STA` varchar(30) DEFAULT NULL,
  `COD_SED` varchar(30) DEFAULT NULL,
  `CLS_LRG` varchar(40) DEFAULT NULL,
  `COD_TOP` varchar(20) DEFAULT NULL,
  `COD_TOP2` varchar(20) DEFAULT NULL,
  `VEL_LIB` int(10) DEFAULT NULL,
  `ONEWAY` varchar(100) DEFAULT NULL,
  `LNG` int(10) DEFAULT NULL,
  `ISO_DATE` varchar(40) DEFAULT NULL,
  `COD_REG` varchar(30) NOT NULL,
  PRIMARY KEY (`COD_ELE`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `tbl_estesa`
--

CREATE TABLE IF NOT EXISTS `tbl_estesa` (
  `COD_REG` varchar(30) NOT NULL,
  `DEN_UFF` varchar(100) NOT NULL,
  `COD_PRP` varchar(30) NOT NULL,
  `CLS_AMM` varchar(100) NOT NULL,
  `DEN_BREVE` varchar(100) DEFAULT NULL,
  `KM_INI` varchar(10) DEFAULT NULL,
  `KM_FIN` varchar(10) DEFAULT NULL,
  `ISO_DATE` varchar(40) NOT NULL,
  `ORG` varchar(70) NOT NULL,
  PRIMARY KEY (`COD_REG`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `tbl_giunzione`
--

CREATE TABLE IF NOT EXISTS `tbl_giunzione` (
  `x` decimal(20,10) DEFAULT NULL,
  `y` decimal(20,10) DEFAULT NULL,
  `COD_GNZ` varchar(20) NOT NULL DEFAULT '',
  `TIP_GNZ` varchar(70) DEFAULT NULL,
  `ORG` varchar(30) DEFAULT NULL,
  `ISO_DATE` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`COD_GNZ`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `tbl_manovre`
--

CREATE TABLE IF NOT EXISTS `tbl_manovre` (
  `ID_MAN` varchar(30) NOT NULL,
  `FEATTYP` varchar(60) DEFAULT NULL,
  `VIA_GNZ` varchar(20) DEFAULT NULL,
  `COD_ELE` varchar(20) DEFAULT NULL,
  `COD_ELE_1` varchar(20) DEFAULT NULL,
  `COD_ELE_2` varchar(20) DEFAULT NULL,
  `ISO_DATE` varchar(40) DEFAULT NULL,
  `ORG` varchar(70) NOT NULL,
  PRIMARY KEY (`ID_MAN`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `tbl_num_civico`
--

CREATE TABLE IF NOT EXISTS `tbl_num_civico` (
  `COD_CIV` varchar(16) NOT NULL,
  `NUM_CIV` decimal(20,0) DEFAULT NULL,
  `ESP_CIV` varchar(10) DEFAULT NULL,
  `COD_TOP` varchar(20) DEFAULT NULL,
  `COD_ACC_ES` varchar(20) DEFAULT NULL,
  `COD_ACC_IN` varchar(20) DEFAULT NULL,
  `COD_CLASSI` text,
  `ORG` text,
  `EXT_NUM` varchar(100) DEFAULT NULL,
  `ISO_DATE` text,
  PRIMARY KEY (`COD_CIV`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `tbl_provincia`
--

CREATE TABLE IF NOT EXISTS `tbl_provincia` (
  `ID_PROV` int(5) DEFAULT NULL,
  `DEN_UFF` varchar(100) DEFAULT NULL,
  `SIGLA_PROV` varchar(4) DEFAULT NULL,
  `COD_ISTAT` varchar(6) NOT NULL DEFAULT '0',
  `ID_REG` varchar(3) DEFAULT NULL,
  `ISO_DATE` varchar(40) NOT NULL,
  `ORG` varchar(70) NOT NULL,
  PRIMARY KEY (`COD_ISTAT`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `tbl_regole_accesso`
--

CREATE TABLE IF NOT EXISTS `tbl_regole_accesso` (
  `COD_PLA` varchar(20) NOT NULL DEFAULT '',
  `RSTTYP` varchar(60) DEFAULT NULL,
  `COD_ELE` varchar(20) DEFAULT NULL,
  `ID_MAN` varchar(20) DEFAULT NULL,
  `RESTRVAL` varchar(70) DEFAULT NULL,
  `ISO_DATE` varchar(40) DEFAULT NULL,
  `ORG` varchar(70) NOT NULL,
  PRIMARY KEY (`COD_PLA`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `tbl_toponimo`
--

CREATE TABLE IF NOT EXISTS `tbl_toponimo` (
  `COD_TOP` varchar(20) NOT NULL DEFAULT '',
  `COD_DUG` varchar(40) DEFAULT NULL,
  `DEN_UFF` varchar(100) DEFAULT NULL,
  `EXT_NAME` varchar(200) DEFAULT NULL,
  `COD_COM` varchar(10) DEFAULT NULL,
  `ISO_DATE` varchar(40) DEFAULT NULL,
  `COD_REG` varchar(30) DEFAULT NULL,
  `ORG` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`COD_TOP`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
