-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 25 Agu 2020 pada 18.20
-- Versi server: 10.1.30-MariaDB
-- Versi PHP: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `career_pos_fantasy`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `categorys`
--

CREATE TABLE `categorys` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `categorys`
--

INSERT INTO `categorys` (`id`, `name`) VALUES
(1, 'Food'),
(2, 'Drink'),
(3, 'Ice'),
(4, ''),
(5, 'a'),
(6, ''),
(7, '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `historys`
--

CREATE TABLE `historys` (
  `id` int(11) NOT NULL,
  `invoice` int(10) NOT NULL,
  `subtotal` decimal(18,2) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_history` int(11) NOT NULL,
  `price` decimal(18,2) NOT NULL,
  `ppn` decimal(18,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` varchar(300) NOT NULL,
  `price` decimal(18,2) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `id_category`, `name`, `image`, `price`, `created`, `updated`, `status`) VALUES
(1, 1, 'Red Velvet Latte', 'red_velvet_latte.jpg', '20000.00', '2020-08-23 22:01:57', '0000-00-00 00:00:00', 1),
(2, 1, 'Cappucino', 'cappucino.jpg', '13000.00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(3, 2, 'Choco Rhum', 'choco_rum.jpg', '160000.00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(4, 1, 'Black Forest', 'black_forest.jpg', '21000.00', '2020-08-25 00:00:00', '0000-00-00 00:00:00', 1),
(5, 1, 'Coffee Latte', 'cofee_latte.jpg', '17500.00', '2020-08-25 00:00:00', '0000-00-00 00:00:00', 0),
(6, 1, 'Espresso', 'espresso.jpg', '23500.00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(7, 0, 'Wiener Schnitzel', 'wienner_schnitzel.jpg', '25500.00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(8, 1, 'Salmon Truffle Teriyaki', 'salmon_trufle.jpg', '90000.00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(9, 1, 'Chicken Katsu Dabu-dabu', 'chicken_katsu_dabu-dabu.jpg', '60000.00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `categorys`
--
ALTER TABLE `categorys`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `historys`
--
ALTER TABLE `historys`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `categorys`
--
ALTER TABLE `categorys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `historys`
--
ALTER TABLE `historys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
