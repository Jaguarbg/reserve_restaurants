-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Време на генериране: 25 май 2025 в 15:19
-- Версия на сървъра: 10.4.32-MariaDB
-- Версия на PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данни: `reserve_restaurants`
--

-- --------------------------------------------------------

--
-- Структура на таблица `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `message`, `created_at`) VALUES
(1, 'Иван Иванов', 'ivan@example.com', 'Здравейте! Имам въпрос относно вашата услуга.', '2025-05-18 14:00:24'),
(2, 'Personal', '12622122@naval-acad.bg', 'asdasdsadasdasda', '2025-05-18 14:12:30');

-- --------------------------------------------------------

--
-- Структура на таблица `places`
--

CREATE TABLE `places` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `working_hours` varchar(100) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `places`
--

INSERT INTO `places` (`id`, `name`, `city`, `address`, `phone`, `working_hours`, `image_url`) VALUES
(1, 'Ресторант Лилия', 'София', 'ул. Лилия 1', '0888123456', '10:00 - 23:00', '/images/rest_liliq.jpg'),
(2, 'Бистро Морско Око', 'Варна', 'бул. Морски бряг 7', '0899654321', '11:00 - 22:00', '/images/rest_morsko_oko.jpeg'),
(3, 'Ресторант България', 'София', 'бул. България 1', '0888123456', '10:00 - 22:00', '/images/rest_bulgaria.jpg'),
(5, 'Щастливеца', 'Велико Търново', 'уп. Велико Търново 156', '0889994545', '11:00-2:00', '/images/rest_shtastliveca.jpg');

-- --------------------------------------------------------

--
-- Структура на таблица `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `guests` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `place_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `reservations`
--

INSERT INTO `reservations` (`id`, `name`, `phone`, `date`, `time`, `guests`, `user_id`, `place_id`) VALUES
(4, 'Fernando', '088995566', '2025-06-18', '12:11:00', 16, 5, 3),
(5, 'anton', '909090909', '2025-12-04', '01:02:00', 6, 5, 1),
(7, 'Jaguar_bg', '0882222222', '2025-05-27', '09:00:00', 12, 4, 1),
(10, 'Goshko', '0881234567', '2025-05-26', '17:30:00', 3, 5, 2),
(11, 'Milcho', '0888899999', '2025-05-27', '09:00:00', 1, 7, 3),
(12, 'Milcho', '0888899999', '2025-05-29', '21:00:00', 3, 7, 1);

-- --------------------------------------------------------

--
-- Структура на таблица `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_admin` tinyint(1) DEFAULT 0,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `is_active`, `created_at`, `updated_at`, `is_admin`, `email`) VALUES
(4, 'Jaguar_bg', '$2b$10$a/14ETrk/efcyYryEIcDgeScsNDzAvZWp1TaiVYpMvu0F48K.lx4.', 1, '2025-05-24 12:17:40', '2025-05-24 12:40:37', 1, 'jaguar@abv.bg'),
(5, 'Goshko', '$2b$10$XgjLJINjCUwmSfBnT8tHqOE2XJs9M0MarCQBoE1kq25skUbzs3jNG', 1, '2025-05-24 12:48:48', '2025-05-24 12:48:48', 0, 'gosho@abv.bg'),
(6, 'kerimitka', '$2b$10$78Ksnxpum9ZHeirkeQQTz.HAGyivsDDFrW.cO0OvY8RR1kULebV/S', 1, '2025-05-25 11:31:59', '2025-05-25 11:31:59', 0, 'kerimitka.tuhleva@gmail.com'),
(7, 'milcho', '$2b$10$LGXf1hg55JAmTkXSZBg1Uutx/cXkMYIHjmItPp1eVKFM6SpcQpJty', 1, '2025-05-25 11:34:17', '2025-05-25 11:34:17', 0, 'milcho@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Индекси за таблица `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Индекси за таблица `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`id`);

--
-- Индекси за таблица `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `place_id` (`place_id`);

--
-- Индекси за таблица `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `places`
--
ALTER TABLE `places`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ограничения за дъмпнати таблици
--

--
-- Ограничения за таблица `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
