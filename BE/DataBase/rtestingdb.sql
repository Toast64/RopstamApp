-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2022 at 10:09 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rtestingdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `model` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `make` varchar(255) NOT NULL,
  `regno` varchar(255) NOT NULL,
  `id` int(11) NOT NULL,
  `color` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`model`, `category`, `make`, `regno`, `id`, `color`) VALUES
('Suzuki Mehran', 'Hatchback', '1989', 'LOP-8753', 1, 'Maroon'),
('Toyota Corolla', 'Sedan', '1995', 'PAK-5423', 2, 'Green'),
('Honda Civic', 'Sedan', '2005', 'JPL-4215', 5, 'Red'),
('Toyota Prado', 'SUV', '1997', 'JUL-2415', 7, 'Blue'),
('Mercedes Benz Bus', 'Bus', '1990', 'TUV-2415', 8, 'Gray'),
('RangeRover Sports', 'SUV', '2006', 'IP-421', 12, 'Black'),
('Toyota Aqua', 'Hatchback', '2016', 'PES-8523', 14, 'Yellow'),
('Honda Fit', 'Hatchback', '2018', 'FST-4215', 15, 'Purple'),
('Toyota Haice', 'Coach', '2012', 'GVN-5632', 16, 'White');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `active` int(11) NOT NULL DEFAULT 0,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `active`, `token`) VALUES
(1, 'test@email.com', '$2b$10$skdpCGKrJbEl9WU.R3hY/ONZTAkVJ7WFVPgJKTmnNw.RBjZ9Z84ey', 'test', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN5ZWRhYmRhbC5hc0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IjM3MDIiLCJpYXQiOjE2NTQ1NDU2OTh9.YTA8hnAWr_KGSSZh3CrmgmC6V5u9kh2ibFf14kqcfpA'),
(46, 'syedabdal.as@gmail.com', '$2b$10$7g9lr/Xuo3eebF2H29K3bO/uignK3e0ZCkFWFIOojVggvm8m7.l22', 'abdal', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN5ZWRhYmRhbC5hc0BnbWFpbC5jb20iLCJwYXNzd29yZCI6Ijk3MTkiLCJpYXQiOjE2NTQ1NDU4NTN9.N8HyTNMin-_Jy6EMJZe08ZDpLnGzeKvGIS_Lx6-T8lg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
