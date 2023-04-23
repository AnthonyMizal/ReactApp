-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2023 at 07:16 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pcook_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `recipeImg` longtext NOT NULL,
  `recipeTitle` varchar(30) NOT NULL,
  `recipeCreator` varchar(30) NOT NULL,
  `category` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `username`, `password`) VALUES
(31, 'Raven Cruz', 'ravencruz@gmail.com', 'raven123', '$2y$10$MTAyNmI5MDk3OWNlMDBmOOzKy3U7cWazR6BLkG8oZgUBPVHANfWli'),
(32, 'Jmie Burdagul', 'jmie@gmail.com', 'jmie123', '$2y$10$ZWQzZTU3ZDc5M2Y5Y2RkYenzfYv7efXPBIhr2b102n7TDR23Pk.6K'),
(33, 'Nath Bading', 'nath', 'nath123', '$2y$10$OGU0ZGM0ZWFiZjA4MGE0YeRGZer/5Mteyvu0SHkfnv09snGQSoFS.'),
(34, 'test', 'test@gmail.com', 'test123', '$2y$10$ZWZjMzJjOTE3ODVhNTk5M.gsRPPb3pQHBKKxmr3uZbotGW.B4jzJC'),
(35, 'Jasper Mamaril', 'jasper@gmail.com', 'jasper123', '$2y$10$NGZmOWZlN2YwNzhmOTVhOOdlGlN9NRYQzREBW1NW4c2L9/lWIMnuq');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
