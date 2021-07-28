-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2021 at 11:14 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `revisi_jualkarcis`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `premiere_id` int(11) DEFAULT NULL,
  `show_time_id` int(11) DEFAULT NULL,
  `booking_ticket` int(11) DEFAULT NULL,
  `booking_total_price` int(11) DEFAULT NULL,
  `booking_payment_method` varchar(250) DEFAULT NULL,
  `booking_status` enum('0','1') DEFAULT NULL,
  `booking_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `booking_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `user_id`, `premiere_id`, `show_time_id`, `booking_ticket`, `booking_total_price`, `booking_payment_method`, `booking_status`, `booking_created_at`, `booking_updated_at`) VALUES
(1, 1, 18, 0, 4, 40, NULL, NULL, '2021-07-28 07:37:37', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `booking_seat`
--

CREATE TABLE `booking_seat` (
  `booking_seat_id` int(11) NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `booking_seat_location` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking_seat`
--

INSERT INTO `booking_seat` (`booking_seat_id`, `booking_id`, `booking_seat_location`) VALUES
(1, 22, 'F8,F7,G6,G5'),
(2, 23, 'G10,E12,F11'),
(3, 1, 'F7,G7,G5,G6');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` int(11) NOT NULL,
  `location_city` varchar(250) DEFAULT NULL,
  `location_address` text DEFAULT NULL,
  `location_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `location_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `location_city`, `location_address`, `location_created_at`, `location_updated_at`) VALUES
(1, 'Jakarta', 'Jakarta Theater', '2021-07-25 23:59:24', NULL),
(2, 'Bandung', 'Bandung Theater', '2021-07-25 23:59:25', NULL),
(3, 'Jogjakarta', 'Jogjakarta Theater', '2021-07-25 23:59:25', NULL),
(4, 'Surabaya', 'Surabaya Theater', '2021-07-25 23:59:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `movie_id` int(11) NOT NULL,
  `movie_name` varchar(150) DEFAULT NULL,
  `movie_genre` varchar(150) DEFAULT NULL,
  `movie_duration` varchar(250) DEFAULT NULL,
  `movie_image` varchar(250) DEFAULT NULL,
  `movie_casts` varchar(250) DEFAULT NULL,
  `movie_release_date` date DEFAULT NULL,
  `movie_synopsis` varchar(250) DEFAULT NULL,
  `movie_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `movie_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`movie_id`, `movie_name`, `movie_genre`, `movie_duration`, `movie_image`, `movie_casts`, `movie_release_date`, `movie_synopsis`, `movie_created_at`, `movie_updated_at`) VALUES
(1, 'Sebuah Film Lawak', 'Action, Comedy', '02:50:00', '2021-07-28T02-19-22.138Z81916-poster-film-warkop-dki-reborn-falcon-pictures.jpg', NULL, '2021-01-21', NULL, '2021-07-25 23:42:57', '2021-07-28 02:19:22'),
(2, 'Indonesia: Independence Documentary', 'Action, Comedy', '02:50:00', '2021-07-28T02-20-17.019Z2027.jpg', NULL, '2021-01-21', NULL, '2021-07-25 23:51:40', '2021-07-28 02:20:17'),
(3, 'Ctrl Alt Del', 'Sci Fi, Comedy', '03:00:00', '2021-07-28T03-43-28.204Ze69cb52941af06a751025eebb704be6b.jpg', 'ActorOne, ActorTwo', NULL, 'Lorem ipsum dolor sit amet. Again and again and again and again', '2021-07-25 23:51:41', '2021-07-28 03:43:28'),
(4, 'Ctrl Alt Del Two', 'Sci Fi, Comedy', '02:50:00', '', NULL, '2021-01-21', NULL, '2021-07-25 23:51:41', NULL),
(5, 'Ctrl Alt Del Three', 'Sci Fi, Comedy', '02:50:00', '', NULL, '2021-02-21', NULL, '2021-07-25 23:51:41', NULL),
(6, 'The Computer', 'Action, Comedy', '03:00:00', NULL, NULL, '2021-02-21', NULL, '2021-07-25 23:55:17', NULL),
(7, 'Electronic', 'Documentary', '03:00:00', NULL, NULL, '2021-02-21', NULL, '2021-07-25 23:56:53', NULL),
(8, 'Monitorized', 'Action', '03:00:00', NULL, NULL, '2021-02-21', NULL, '2021-07-25 23:56:53', NULL),
(9, 'String and Numbers', 'Documentary', '03:00:00', '', 'ActorThree, ActorFour', NULL, NULL, '2021-07-25 23:56:53', '2021-07-28 03:33:00'),
(11, 'He\'s Not Aware', 'Comedy', '02:50:00', '2021-07-28T03-04-50.476Z81916-poster-film-warkop-dki-reborn-falcon-pictures.jpg', 'ActorOne, AcotrTwo', NULL, NULL, '2021-07-28 02:55:57', '2021-07-28 03:04:50'),
(12, 'He\'s Now Aware', 'Comedy, Action', NULL, '2021-07-28T03-41-20.028Z81916-poster-film-warkop-dki-reborn-falcon-pictures.jpg', 'ActorOne, ActorTwo', NULL, NULL, '2021-07-28 02:56:18', '2021-07-28 03:41:22');

-- --------------------------------------------------------

--
-- Table structure for table `premiere`
--

CREATE TABLE `premiere` (
  `premiere_id` int(11) NOT NULL,
  `movie_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `premiere_name` varchar(250) DEFAULT NULL,
  `premiere_price` int(11) DEFAULT NULL,
  `premiere_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `premiere_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `premiere`
--

INSERT INTO `premiere` (`premiere_id`, `movie_id`, `location_id`, `premiere_name`, `premiere_price`, `premiere_created_at`, `premiere_updated_at`) VALUES
(1, 1, 1, 'ebu.id', 10, '2021-07-26 00:02:16', NULL),
(2, 1, 2, 'ebu.id', 10, '2021-07-26 00:03:27', NULL),
(3, 1, 3, 'ebu.id', 10, '2021-07-26 00:03:27', NULL),
(4, 1, 4, 'ebu.id', 10, '2021-07-26 00:03:27', NULL),
(5, 1, 1, 'CineOne21', 10, '2021-07-26 00:05:28', NULL),
(6, 1, 2, 'CineOne21', 10, '2021-07-26 00:05:28', NULL),
(7, 1, 3, 'CineOne21', 10, '2021-07-26 00:05:29', NULL),
(8, 1, 4, 'CineOne21', 10, '2021-07-26 00:05:29', NULL),
(9, 1, 1, 'hiflix Cinema', 10, '2021-07-26 00:05:29', NULL),
(10, 1, 2, 'hiflix Cinema', 10, '2021-07-26 00:05:29', NULL),
(11, 1, 3, 'hiflic Cinema', 10, '2021-07-26 00:05:29', NULL),
(12, 1, 4, 'hiflix Cinema', 10, '2021-07-26 00:05:29', NULL),
(13, 2, 1, 'ebu.id', 10, '2021-07-26 00:47:15', NULL),
(14, 2, 2, 'ebu.id', 10, '2021-07-26 00:47:15', NULL),
(15, 2, 3, 'ebu.id', 10, '2021-07-26 00:47:15', NULL),
(16, 2, 4, 'ebu.id', 10, '2021-07-26 00:47:15', NULL),
(17, 2, 1, 'CineOne21', 10, '2021-07-26 00:47:16', NULL),
(18, 2, 2, 'CineOne21', 10, '2021-07-26 00:47:16', NULL),
(19, 2, 3, 'CineOne21', 10, '2021-07-26 00:47:16', NULL),
(20, 2, 4, 'CineOne21', 10, '2021-07-26 00:47:16', NULL),
(21, 2, 1, 'hiflix Cinema', 10, '2021-07-26 00:47:16', NULL),
(22, 2, 2, 'hiflix Cinema', 10, '2021-07-26 00:47:16', NULL),
(23, 2, 3, 'hiflix Cinema', 10, '2021-07-26 00:47:16', NULL),
(24, 3, 4, 'hiflix Cinema', 10, '2021-07-26 00:47:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `show_time`
--

CREATE TABLE `show_time` (
  `show_time_id` int(11) NOT NULL,
  `premiere_id` int(11) DEFAULT NULL,
  `show_time_date` date DEFAULT NULL,
  `show_time_clock` varchar(250) DEFAULT NULL,
  `show_time_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `show_time_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(250) DEFAULT NULL,
  `user_email` varchar(250) DEFAULT NULL,
  `user_password` varchar(250) DEFAULT NULL,
  `user_image` varchar(250) DEFAULT NULL,
  `user_verified` tinyint(4) NOT NULL DEFAULT 0,
  `user_role` varchar(250) NOT NULL DEFAULT 'User',
  `user_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_password`, `user_image`, `user_verified`, `user_role`, `user_created_at`, `user_updated_at`) VALUES
(1, NULL, 'elazaribrahims@gmail.com', '$2b$10$8Mmuk2Rz4w.Wp8HB74gw7e7JJbLc7xNUowQZoMuZBf8isOhe6iHxC', '', 1, 'Admin', '2021-07-26 00:55:53', NULL),
(2, NULL, 'michael_b@gmail.com', '$2b$10$7AyzwGLQHHu9zA6dfkD4xOlFHMR6Ki/2yKzkfvuSBnrboxcCmMxai', NULL, 0, 'Customer', '2021-07-26 01:06:55', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `booking_seat`
--
ALTER TABLE `booking_seat`
  ADD PRIMARY KEY (`booking_seat_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indexes for table `premiere`
--
ALTER TABLE `premiere`
  ADD PRIMARY KEY (`premiere_id`);

--
-- Indexes for table `show_time`
--
ALTER TABLE `show_time`
  ADD PRIMARY KEY (`show_time_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `booking_seat`
--
ALTER TABLE `booking_seat`
  MODIFY `booking_seat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `premiere`
--
ALTER TABLE `premiere`
  MODIFY `premiere_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `show_time`
--
ALTER TABLE `show_time`
  MODIFY `show_time_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
