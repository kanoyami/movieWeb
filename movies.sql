-- phpMyAdmin SQL Dump
-- version 4.4.15.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2017-07-05 21:01:14
-- 服务器版本： 5.5.48-log
-- PHP Version: 5.4.45

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movies`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `aid` int(11) NOT NULL DEFAULT '0',
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`aid`, `username`, `password`) VALUES
(0, 'admin', 'e10adc3949ba59abbe56e057f20f883e');

-- --------------------------------------------------------

--
-- 表的结构 `adv_src`
--

CREATE TABLE IF NOT EXISTS `adv_src` (
  `adv_id` int(11) NOT NULL,
  `src` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `movie_comment`
--

CREATE TABLE IF NOT EXISTS `movie_comment` (
  `mc_id` bigint(20) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `vid` bigint(20) NOT NULL,
  `uid` bigint(20) NOT NULL,
  `time` varchar(50) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `movie_point`
--

CREATE TABLE IF NOT EXISTS `movie_point` (
  `mp_id` bigint(20) NOT NULL,
  `point` int(11) NOT NULL,
  `uid` bigint(20) NOT NULL,
  `vid` bigint(20) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `movie_point`
--

INSERT INTO `movie_point` (`mp_id`, `point`, `uid`, `vid`) VALUES
(1, 2, 1, 1),
(2, 9, 1, 1),
(3, 7, 1, 1),
(4, 3, 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `uid` bigint(20) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `email` varchar(52) NOT NULL,
  `sex` int(11) NOT NULL,
  `tumb_src` varchar(255) NOT NULL,
  `sign` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`uid`, `nickname`, `email`, `sex`, `tumb_src`, `sign`, `password`) VALUES
(20, 'admin', '', 0, '', '', 'e10adc3949ba59abbe56e057f20f883e'),
(19, 'admin', 'admin', 0, '', '', 'e10adc3949ba59abbe56e057f20f883e'),
(18, '', 'abc', 0, '', '', 'e10adc3949ba59abbe56e057f20f883e');

-- --------------------------------------------------------

--
-- 表的结构 `user_token`
--

CREATE TABLE IF NOT EXISTS `user_token` (
  `uid` bigint(20) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user_token`
--

INSERT INTO `user_token` (`uid`, `token`) VALUES
(18, '882814f0-55b1-11e7-ab1b-437dae70d56c'),
(19, '806618c0-55ac-11e7-b8f0-b7e2f8e2a0eb');

-- --------------------------------------------------------

--
-- 表的结构 `video_src`
--

CREATE TABLE IF NOT EXISTS `video_src` (
  `vid` bigint(20) NOT NULL,
  `src` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `tinycontent` varchar(255) NOT NULL,
  `tumb_src` varchar(255) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `video_src`
--

INSERT INTO `video_src` (`vid`, `src`, `name`, `tinycontent`, `tumb_src`) VALUES
(12, '/video_upload/1JTmNQ57TVOOmZV_80X7ph3x.mp4', '命运是之门', 'hahahaha', '/pic_upload/1iw_Br0AVvrGAXPyeFevwIoE.jpg'),
(11, '/video_upload/ib5EVQPEjg2nevo2fpt-PEac.mp4', 'lovelive', '12321', '/pic_upload/gzaVWyrqbXfl95SOERNhO5ze.jpg'),
(10, '/video_upload/oDzhCY9W1q3tR6HkJxdB--OQ.mp4', '羁绊者', 'hahaha', '/pic_upload/BfkIWJlM2DwzaDUKrfGeJBbh.png'),
(13, '/video_upload/r_kQvGPTTkRMeamcKov2AG73.mp4', 'lovelive 07', '233333', '/pic_upload/wro8jo7dWQ0lY1I_NuaP5MSu.jpg'),
(14, '/video_upload/kaS82VUBXXvnN6RqjPck1FqE.mp4', 'hello', 'heolll', '/pic_upload/Yw0V6lrEitWUO3J-fbB1qPFX.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `adv_src`
--
ALTER TABLE `adv_src`
  ADD PRIMARY KEY (`adv_id`);

--
-- Indexes for table `movie_comment`
--
ALTER TABLE `movie_comment`
  ADD PRIMARY KEY (`mc_id`);

--
-- Indexes for table `movie_point`
--
ALTER TABLE `movie_point`
  ADD PRIMARY KEY (`mp_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `user_token`
--
ALTER TABLE `user_token`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `video_src`
--
ALTER TABLE `video_src`
  ADD PRIMARY KEY (`vid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adv_src`
--
ALTER TABLE `adv_src`
  MODIFY `adv_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `movie_comment`
--
ALTER TABLE `movie_comment`
  MODIFY `mc_id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `movie_point`
--
ALTER TABLE `movie_point`
  MODIFY `mp_id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `video_src`
--
ALTER TABLE `video_src`
  MODIFY `vid` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
