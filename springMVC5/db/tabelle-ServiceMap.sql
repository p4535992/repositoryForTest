-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generato il: Mar 26, 2014 alle 14:44
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
-- Struttura della tabella `tbl_service_category`
--

CREATE TABLE IF NOT EXISTS `tbl_service_category` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `NOME` varchar(100) NOT NULL,
  `COLORE` varchar(20) NOT NULL,
  `EN_NAME` varchar(100) NOT NULL,
  `CLASS` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dump dei dati per la tabella `tbl_service_category`
--

INSERT INTO `tbl_service_category` (`ID`, `NOME`, `COLORE`, `EN_NAME`, `CLASS`) VALUES
(1, 'Servizi di Alloggio', '', 'Accommodation', 'accomodation'),
(2, 'Attività Culturali', '', 'Cultural Activity', 'cultural-activity'),
(3, 'Educazione', '', 'Education', 'education'),
(4, 'Emergenze', '', 'Emergency', 'emergency'),
(5, 'Intrattenimento', '', 'Entertainment', 'entertainment'),
(6, 'Servizi Finanziari', '', 'Financial Service', 'financial-service'),
(7, 'Uffici Governativi', '', 'Government Office', 'government-office'),
(8, 'Sanità', '', 'Healthcare', 'health-care'),
(9, 'Shopping', '', 'Shopping', 'shopping'),
(10, 'Servizi Turistici', '', 'Tourism Service', 'tourism-service'),
(11, 'Servizi di Trasferimento', '', 'Transfer Service', 'transfer-service'),
(12, 'Ristorazione', '', 'Wine and Food', 'wine-and-food');

-- --------------------------------------------------------

--
-- Struttura della tabella `tbl_service_subcategory`
--

CREATE TABLE IF NOT EXISTS `tbl_service_subcategory` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `NOME` varchar(100) NOT NULL,
  `COLORE` varchar(20) NOT NULL,
  `EN_NAME` varchar(100) NOT NULL,
  `IDCATEGORY` int(10) unsigned NOT NULL,
  `NUMERO` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=140 ;

--
-- Dump dei dati per la tabella `tbl_service_subcategory`
--

INSERT INTO `tbl_service_subcategory` (`ID`, `NOME`, `COLORE`, `EN_NAME`, `IDCATEGORY`, `NUMERO`) VALUES
(1, 'affittacamere', '', 'Room rental', 1, 1),
(2, 'agriturismo', '', 'agritourism', 1, 2),
(3, 'albergo', '', 'hotel', 1, 3),
(4, 'bed_and_breakfast', '', 'bed and breakfast', 1, 4),
(5, 'campeggio', '', 'camping', 1, 5),
(6, 'casa_di_riposo', '', 'retirement home', 1, 6),
(7, 'casa_per_ferie', '', 'holiday home', 1, 7),
(8, 'casa_per_vacanze', '', 'vacation home', 1, 8),
(9, 'centri_accoglienza_e_case_alloggio', '', 'reception centers', 1, 9),
(10, 'ostello', '', 'hostel', 1, 10),
(11, 'residence_di_villeggiatura', '', 'holiday residence', 1, 11),
(12, 'residenza_turistica_alberghiera', '', 'residence', 1, 12),
(13, 'residenze_epoca', '', 'manor', 1, 13),
(14, 'rifugio_alpino', '', 'mountain dew', 1, 14),
(15, 'villaggio_vacanze', '', 'holiday resort', 1, 15),
(16, 'auditorium', '', 'auditorium', 2, 1),
(17, 'biblioteca', '', 'library', 2, 2),
(18, 'luogo_monumento', '', 'monument', 2, 3),
(19, 'museo', '', 'museum', 2, 4),
(20, 'conservatori_di_musica', '', 'conservatory', 3, 1),
(21, 'corsi_di_lingue', '', 'language courses', 3, 2),
(22, 'istituti_magistrali', '', 'teaching institute', 3, 3),
(23, 'istituti_professionali_privati', '', 'private vocational school', 3, 4),
(24, 'istituti_tecnici_privati', '', 'private technical institute', 3, 5),
(25, 'istituti_tecnici_pubblici', '', 'public technical institute', 3, 6),
(26, 'licei_privati', '', 'private high school', 3, 7),
(27, 'licei_pubblici', '', 'public high school', 3, 8),
(28, 'nidi_privati', '', 'private kindergarten', 3, 9),
(29, 'scuola_di_formazione', '', 'training school', 3, 10),
(30, 'scuola_di_sci', '', 'ski school', 3, 11),
(31, 'scuola_di_sub', '', 'diving school', 3, 12),
(32, 'scuola_di_vela', '', 'sailing school', 3, 13),
(33, 'scuole_elementari_private', '', 'private elementary school', 3, 14),
(34, 'scuole_elementari_pubbliche', '', 'public elementary school', 3, 15),
(35, 'scuole_materne_private', '', 'private nursery', 3, 16),
(36, 'scuole_materne_pubbliche', '', 'public nursery', 3, 17),
(37, 'scuole_medie_private', '', 'private school', 3, 18),
(38, 'scuole_medie_pubbliche ', '', 'public school', 3, 19),
(39, 'universita_pubbliche', '', 'public college', 3, 20),
(40, 'carabinieri', '', 'carabinieri', 4, 1),
(41, 'commissariato_di_pubblica_sicurezza', '', 'police station', 4, 2),
(42, 'corpo_forestale_dello_stato', '', 'state forestry corps', 4, 3),
(43, 'farmacia', '', 'pharmacy', 4, 4),
(44, 'guardia_costiera_capitaneria_di_porto', '', 'coast guard', 4, 5),
(45, 'guardia_di_finanza', '', 'financial police', 4, 6),
(46, 'guardia_medica', '', 'emergency medical', 4, 7),
(47, 'numeri_utili', '', 'useful numbers', 4, 8),
(48, 'polizia_municipale', '', 'municipal police', 4, 9),
(49, 'polizia_stradale', '', 'traffic police', 4, 10),
(50, 'pronto_soccorso', '', 'first aid', 4, 11),
(51, 'protezione_civile', '', 'civil protection', 4, 12),
(52, 'soccorso_stradale', '', 'roadside assistance', 4, 13),
(53, 'vigili_del_fuoco', '', 'firefighters', 4, 14),
(54, 'acquario', '', 'aquarium', 5, 1),
(55, 'alpinismo', '', 'mountaineering', 5, 2),
(56, 'centro_sociale', '', 'community center', 5, 3),
(57, 'cinema', '', 'movie theatre', 5, 4),
(58, 'discoteca', '', 'discotheque', 5, 5),
(59, 'golf', '', 'golf club', 5, 6),
(60, 'impianti_sciistici', '', 'ski resort', 5, 7),
(61, 'impianto_sportivo', '', 'sports facility', 5, 8),
(62, 'ippodromo', '', 'racecourse', 5, 9),
(63, 'ludoteca', '', 'day care', 5, 10),
(64, 'maneggi', '', 'riding school', 5, 11),
(65, 'palestra_fitness', '', 'gym', 5, 12),
(66, 'parco_naturale', '', 'natural reserve', 5, 13),
(67, 'piscina', '', 'swimming pool', 5, 14),
(68, 'rafting_canoa_e_kayak', '', 'rafting', 5, 15),
(69, 'riserve_di_pesca', '', 'fishing reserve', 5, 16),
(70, 'sala_gioco', '', 'game room', 5, 17),
(71, 'teatro', '', 'theatre', 5, 18),
(72, 'assicurazione', '', 'insurance company', 6, 1),
(73, 'ATM', '', 'ATM', 6, 2),
(74, 'banca', '', 'bank', 6, 3),
(75, 'banche', '', 'banks', 6, 4),
(76, 'istituto_monetario', '', 'monetary institution', 6, 5),
(77, 'Agenzia_delle_entrate', '', 'fiscal agency', 7, 1),
(78, 'anagrafe_e_uffici_vari', '', 'registry office', 7, 2),
(79, 'assistenti_sociali_uffici', '', 'social workers office', 7, 3),
(80, 'caf', '', 'sfiscal assistance', 7, 4),
(81, 'centro_per_l_impiego', '', 'employment center', 7, 5),
(82, 'Consolato', '', 'consulate', 7, 6),
(83, 'Informa_Giovani', '', 'counseling', 7, 7),
(84, 'motorizzazione_civile', '', 'motor vehicles office', 7, 8),
(85, 'prefettura', '', 'prefecture', 7, 9),
(86, 'questura', '', 'police headquarters', 7, 10),
(87, 'ufficio_inps', '', 'social welfare office', 7, 11),
(88, 'Ufficio_oggetti_smarriti_aeroporto', '', 'airport lost property office', 7, 12),
(89, 'ufficio_oggetti_smarriti_stazione_treno', '', 'railway station lost property office', 7, 13),
(90, 'Ufficio_postale', '', 'post office', 7, 14),
(91, 'ambulatorio_medico', '', 'clinic', 8, 1),
(92, 'asl', '', 'local health', 8, 2),
(93, 'centri_assistenza', '', 'assistance center', 8, 3),
(94, 'centri_diurni', '', 'day center', 8, 4),
(95, 'centri_di_riabilitazione', '', 'rehabilitation center', 8, 5),
(96, 'Centro_antiveleni', '', 'poison control center', 8, 6),
(97, 'centro_unico_di_prenotazione', '', 'medical services booking office', 8, 7),
(98, 'clinica_privata', '', 'private clinic', 8, 8),
(99, 'comunita_e_centri_di_recupero_per_dipendenze', '', 'rehab center', 8, 9),
(100, 'consultori', '', 'counseling', 8, 10),
(101, 'croce_rossa', '', 'red cross', 8, 11),
(102, 'dentista', '', 'dentist', 8, 12),
(103, 'distretto_sanitario', '', 'health district', 8, 13),
(104, 'ospedale_pubblico', '', 'public hospital', 8, 14),
(105, 'poliambulatorio', '', 'group practice', 8, 15),
(106, 'ricoveri', '', 'care center', 8, 16),
(107, 'veterinario', '', 'veterinary', 8, 17),
(108, 'centri_commerciali ', '', 'mall', 9, 1),
(109, 'grande_distribuzione_non_alimentare ', '', 'large-scale distribution', 9, 2),
(110, 'ipermercati ', '', 'hypermarket', 9, 3),
(111, 'negozio_artigiano ', '', 'shop', 9, 4),
(112, 'negozi_monomarca ', '', 'brand stores', 9, 5),
(113, 'spacci_outlet_abbigliamento ', '', 'clothing outlet', 9, 6),
(114, 'spacci_outlet_calzature', '', 'footwear outlet', 9, 7),
(115, 'agenzia_di_viaggi', '', 'travel agency', 10, 1),
(116, 'camper_service', '', 'camper service', 10, 2),
(117, 'noleggio_veicoli', '', 'car rental', 10, 3),
(118, 'tour_operator', '', 'tour operator', 10, 4),
(119, 'ufficio_visite_guidate', '', 'guided tours office', 10, 5),
(120, 'aeroporto_civile', '', 'airport', 11, 1),
(121, 'autobus_urbani', '', 'city buses', 11, 2),
(122, 'aviosuperfici', '', 'airfield', 11, 3),
(123, 'corriere_espresso', '', 'courier', 11, 4),
(124, 'elisuperfici', '', 'heliport', 11, 5),
(125, 'parcheggio_auto', '', 'car parking', 11, 6),
(126, 'stazione_ferroviaria', '', 'railway station', 11, 7),
(127, 'autogrill', '', 'highway stop', 12, 1),
(128, 'bar', '', 'cafè', 12, 2),
(129, 'catering', '', 'catering service', 12, 3),
(130, 'Enoteche_e_wine_bar', '', 'wine bar', 12, 4),
(131, 'forno', '', 'bakery', 12, 5),
(132, 'gelateria', '', 'ice-cream parlour', 12, 6),
(133, 'mense', '', 'canteen', 12, 7),
(134, 'paninoteche_pubs', '', 'sandwich shop pub', 12, 8),
(135, 'pasticceria', '', 'pastry shop', 12, 9),
(136, 'pizzeria', '', 'pizza', 12, 10),
(137, 'ristorante', '', 'restaurant', 12, 11),
(138, 'rosticceria', '', 'deli', 12, 12),
(139, 'sushi_bar', '', 'sushi', 12, 13);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
