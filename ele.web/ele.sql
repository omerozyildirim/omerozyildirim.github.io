-- phpMyAdmin SQL Dump
-- version 3.3.7deb5build0.10.10.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 23, 2011 at 04:30 PM
-- Server version: 5.1.49
-- PHP Version: 5.3.3-1ubuntu9.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ele`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblBrands`
--

CREATE TABLE IF NOT EXISTS `tblBrands` (
  `id` tinyint(11) NOT NULL AUTO_INCREMENT,
  `brand` varchar(16) NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin5 AUTO_INCREMENT=20 ;

--
-- Dumping data for table `tblBrands`
--

INSERT INTO `tblBrands` (`id`, `brand`) VALUES
(1, 'Acer'),
(2, 'Aidata'),
(3, 'Apple'),
(4, 'Asus'),
(5, 'Casper'),
(6, 'Datron'),
(7, 'Dell'),
(8, 'Exper'),
(9, 'Fujitsu'),
(10, 'Haier'),
(11, 'HP'),
(12, 'Lenovo'),
(13, 'LG'),
(14, 'MSI'),
(15, 'Packard Bell'),
(16, 'Probook'),
(17, 'Samsung'),
(18, 'Sony'),
(19, 'Toshiba');

-- --------------------------------------------------------

--
-- Table structure for table `tblClearance`
--

CREATE TABLE IF NOT EXISTS `tblClearance` (
  `id` tinyint(4) NOT NULL,
  `Clearance` varchar(13) NOT NULL,
  KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin5;

--
-- Dumping data for table `tblClearance`
--

INSERT INTO `tblClearance` (`id`, `Clearance`) VALUES
(0, 'Bekliyor'),
(1, 'Onaylandı'),
(2, 'Reddedildi!');

-- --------------------------------------------------------

--
-- Table structure for table `tblCustomer`
--

CREATE TABLE IF NOT EXISTS `tblCustomer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `snailmail` varchar(256) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `discountPercent` tinyint(4) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin5 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tblCustomer`
--

INSERT INTO `tblCustomer` (`id`, `uid`, `email`, `snailmail`, `phone`, `discountPercent`) VALUES
(1, 3, 'taeres@hotmail', 'Eski Otogar mahallesi', '555000003', 5),
(2, 5, 'barakli@sakarya', 'Serdivan', '555000005', 20);

-- --------------------------------------------------------

--
-- Table structure for table `tblJobs`
--

CREATE TABLE IF NOT EXISTS `tblJobs` (
  `id` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `delivery_code` varchar(30) DEFAULT NULL,
  `brand` varchar(20) DEFAULT NULL,
  `model` varchar(20) DEFAULT NULL,
  `serial` varchar(30) DEFAULT NULL,
  `battery` tinyint(1) DEFAULT NULL,
  `symptoms` varchar(256) DEFAULT NULL,
  `customer_send_date` datetime DEFAULT NULL,
  `status` varchar(7) DEFAULT NULL,
  `arrive_date` datetime DEFAULT NULL,
  `sid` int(11) DEFAULT NULL,
  `diagnosis` varchar(256) DEFAULT NULL,
  `cure` varchar(256) DEFAULT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  `clearance` tinyint(4) NOT NULL DEFAULT '0',
  `clearance_date` datetime DEFAULT NULL,
  `finish_date` datetime DEFAULT NULL,
  `send_date` datetime DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin5;

--
-- Dumping data for table `tblJobs`
--


-- --------------------------------------------------------

--
-- Table structure for table `tblStaff`
--

CREATE TABLE IF NOT EXISTS `tblStaff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `lastBrand_id` tinyint(10) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin5 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tblStaff`
--

INSERT INTO `tblStaff` (`id`, `uid`, `email`, `phone`, `lastBrand_id`) VALUES
(1, 2, 'arif@', '555000002', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tblStatus`
--

CREATE TABLE IF NOT EXISTS `tblStatus` (
  `id` tinyint(4) NOT NULL,
  `status` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin5;

--
-- Dumping data for table `tblStatus`
--

INSERT INTO `tblStatus` (`id`, `status`) VALUES
(0, 'Geliyor'),
(1, 'Depoda'),
(2, 'Onay bekliyor'),
(3, 'Reddedildi!'),
(4, 'Onaylandı'),
(5, 'Onarımda'),
(6, 'Gönderildi');

-- --------------------------------------------------------

--
-- Table structure for table `tblUsers`
--

CREATE TABLE IF NOT EXISTS `tblUsers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `usertype` tinyint(4) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin5 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `tblUsers`
--

INSERT INTO `tblUsers` (`id`, `username`, `password`, `usertype`) VALUES
(4, 'omero', 'Im45ter', 0),
(1, 'kadir', 'q1w2e3', 1),
(2, 'arif', 'q1w2e3', 2),
(3, 'gokhan', 'q1w2e3', 3),
(5, 'burhan', 'q1w2e3', 3);

-- --------------------------------------------------------

--
-- Table structure for table `tblUsertype`
--

CREATE TABLE IF NOT EXISTS `tblUsertype` (
  `id` tinyint(4) DEFAULT NULL,
  `type` varchar(13) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin5;

--
-- Dumping data for table `tblUsertype`
--

INSERT INTO `tblUsertype` (`id`, `type`) VALUES
(0, 'administrator'),
(1, 'manager'),
(2, 'staff'),
(3, 'customer');
