-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 08, 2023 at 10:12 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ncit`
--

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(50) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `min_mark` int(50) NOT NULL,
  `pass_mark` int(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `min_mark`, `pass_mark`, `created_at`) VALUES
(1, 'Incididunt excepturi', 5, 95, '2023-02-19 05:00:44');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` enum('admin','user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `active`, `created_at`, `role`) VALUES
(3, 'admin', 'admin@admin', 'admin', 1, '2023-02-12 04:01:56', 'admin'),
(53, 'asma', 'asma@asma.com', 'Pa$$w0rd!', 0, '2023-02-19 03:45:18', 'user'),
(54, 'laith', 'laith@laith.com', 'Pa$$w0rd!', 0, '2023-02-19 03:45:28', 'user'),
(55, 'abood', 'abood@abood.com', 'Pa$$w0rd!', 0, '2023-02-19 03:45:44', 'user'),
(56, 'ahmad', 'ahmad@ahmad.com', 'Pa$$w0rd!', 0, '2023-02-19 03:45:58', 'user'),
(57, 'omar', 'omar@omar.com', 'Pa$$w0rd!', 1, '2023-02-19 03:46:10', 'user'),
(58, 'walaa', 'walaa@walaa.com', 'Pa$$w0rd!', 1, '2023-02-19 03:46:23', 'user'),
(110, 'Oren Alston1', 'zuna@mailinator.com', 'Pa$$w0rd!', 1, '2023-02-19 15:42:21', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `user_sub`
--

CREATE TABLE `user_sub` (
  `id` int(50) UNSIGNED NOT NULL,
  `user_id` int(50) NOT NULL,
  `subject_id` int(50) NOT NULL,
  `mark_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user_sub`
--

INSERT INTO `user_sub` (`id`, `user_id`, `subject_id`, `mark_id`) VALUES
(1, 53, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_sub`
--
ALTER TABLE `user_sub`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(50) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `user_sub`
--
ALTER TABLE `user_sub`
  MODIFY `id` int(50) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
