-- MySQL dump 10.13  Distrib 5.6.19, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: rack_jobs_dev
-- ------------------------------------------------------
-- Server version	5.6.19-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category_description`
--

DROP TABLE IF EXISTS `category_description`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_description` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_category_id` int(11) DEFAULT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `locale` varchar(5) COLLATE utf8_unicode_ci DEFAULT 'en_US',
  PRIMARY KEY (`id`),
  KEY `index_category_description_on_item_category_id` (`item_category_id`),
  KEY `index_category_description_on_locale` (`locale`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ckeditor_assets`
--

DROP TABLE IF EXISTS `ckeditor_assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ckeditor_assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_file_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `data_content_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data_file_size` int(11) DEFAULT NULL,
  `assetable_id` int(11) DEFAULT NULL,
  `assetable_type` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_ckeditor_assetable_type` (`assetable_type`,`type`,`assetable_id`),
  KEY `idx_ckeditor_assetable` (`assetable_type`,`assetable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `demo_editors`
--

DROP TABLE IF EXISTS `demo_editors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `demo_editors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `descr` text COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `field_currency`
--

DROP TABLE IF EXISTS `field_currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `field_currency` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currency_title` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `currency_symbol` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `currency_description` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `currency_code` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `default_currency` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_field_currency_on_currency_title` (`currency_title`),
  KEY `index_field_currency_on_default_currency` (`default_currency`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `field_rate`
--

DROP TABLE IF EXISTS `field_rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `field_rate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) DEFAULT NULL,
  `currency` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `currency_info` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `field_currency_id` int(11) DEFAULT NULL,
  `rate_min` int(11) DEFAULT '0',
  `rate_max` int(11) DEFAULT '0',
  `negotiable` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_field_rate_on_item_id` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_categories`
--

DROP TABLE IF EXISTS `item_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT '-1',
  `enabled` tinyint(4) DEFAULT '0',
  `items_count` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_item_categories_on_parent_id` (`parent_id`),
  KEY `index_item_categories_on_enabled` (`enabled`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_description`
--

DROP TABLE IF EXISTS `item_description`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_description` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) DEFAULT NULL,
  `item_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description_text` text COLLATE utf8_unicode_ci,
  `locale` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_item_description_on_item_id` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_location`
--

DROP TABLE IF EXISTS `item_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location_country_id` int(11) DEFAULT NULL,
  `s_country` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `location_city_id` int(11) DEFAULT NULL,
  `s_city` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `location_district_id` int(11) DEFAULT NULL,
  `s_district` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `d_coord_lat` decimal(10,6) DEFAULT NULL,
  `d_coord_long` decimal(10,6) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_tags`
--

DROP TABLE IF EXISTS `item_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) DEFAULT NULL,
  `tag_text` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tag_added` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_item_tags_on_tag_added` (`tag_added`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `item_category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_items_on_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `location_city`
--

DROP TABLE IF EXISTS `location_city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location_city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location_country_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_location_city_on_name` (`name`),
  KEY `index_location_city_on_location_country_id` (`location_country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `location_country`
--

DROP TABLE IF EXISTS `location_country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location_country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_location_country_on_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `location_district`
--

DROP TABLE IF EXISTS `location_district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location_district` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location_city_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_location_district_on_name` (`name`),
  KEY `index_location_district_on_location_city_id` (`location_city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profile_descriptions`
--

DROP TABLE IF EXISTS `profile_descriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile_descriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `profile_name` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `locale` varchar(10) COLLATE utf8_unicode_ci DEFAULT 'en_US',
  `profile_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profile_types`
--

DROP TABLE IF EXISTS `profile_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enabled` tinyint(4) DEFAULT '0',
  `default` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  UNIQUE KEY `unique_schema_migrations` (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `session_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `data` text COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_sessions_on_session_id` (`session_id`),
  KEY `index_sessions_on_updated_at` (`updated_at`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_companies`
--

DROP TABLE IF EXISTS `user_companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company_address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company_description` text COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_profiles`
--

DROP TABLE IF EXISTS `user_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `first_name` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_company_id` int(11) DEFAULT '-1',
  `profile_type_id` int(11) DEFAULT NULL,
  `profile_type_name` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_user_profiles_on_profile_type_id` (`profile_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `admin` int(11) DEFAULT '0',
  `account_status` int(11) DEFAULT '1',
  `verified` tinyint(1) DEFAULT '0',
  `registration_date` datetime DEFAULT NULL,
  `login_date` datetime DEFAULT NULL,
  `locale` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `encrypted_password` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `reset_password_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reset_password_sent_at` datetime DEFAULT NULL,
  `remember_created_at` datetime DEFAULT NULL,
  `sign_in_count` int(11) NOT NULL DEFAULT '0',
  `current_sign_in_at` datetime DEFAULT NULL,
  `last_sign_in_at` datetime DEFAULT NULL,
  `current_sign_in_ip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_sign_in_ip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `confirmation_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `confirmed_at` datetime DEFAULT NULL,
  `confirmation_sent_at` datetime DEFAULT NULL,
  `unconfirmed_email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_users_on_email` (`email`),
  UNIQUE KEY `index_users_on_reset_password_token` (`reset_password_token`),
  UNIQUE KEY `index_users_on_confirmation_token` (`confirmation_token`),
  KEY `index_users_on_created_at_and_updated_at` (`created_at`,`updated_at`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-10-06 16:22:22
INSERT INTO schema_migrations (version) VALUES ('20140819122850');

INSERT INTO schema_migrations (version) VALUES ('20140820121356');

INSERT INTO schema_migrations (version) VALUES ('20140820121619');

INSERT INTO schema_migrations (version) VALUES ('20140820121758');

INSERT INTO schema_migrations (version) VALUES ('20140821085240');

INSERT INTO schema_migrations (version) VALUES ('20140821085710');

INSERT INTO schema_migrations (version) VALUES ('20140821091910');

INSERT INTO schema_migrations (version) VALUES ('20140821092749');

INSERT INTO schema_migrations (version) VALUES ('20140821093640');

INSERT INTO schema_migrations (version) VALUES ('20140821134602');

INSERT INTO schema_migrations (version) VALUES ('20140821140514');

INSERT INTO schema_migrations (version) VALUES ('20140822071343');

INSERT INTO schema_migrations (version) VALUES ('20140823053043');

INSERT INTO schema_migrations (version) VALUES ('20140823064327');

INSERT INTO schema_migrations (version) VALUES ('20140823090821');

INSERT INTO schema_migrations (version) VALUES ('20140823092807');

INSERT INTO schema_migrations (version) VALUES ('20140823124258');

INSERT INTO schema_migrations (version) VALUES ('20140823124534');

INSERT INTO schema_migrations (version) VALUES ('20140823124856');

INSERT INTO schema_migrations (version) VALUES ('20140826051424');

INSERT INTO schema_migrations (version) VALUES ('20140901172420');

INSERT INTO schema_migrations (version) VALUES ('20140902103420');

INSERT INTO schema_migrations (version) VALUES ('20140902104007');

INSERT INTO schema_migrations (version) VALUES ('20140902114427');

INSERT INTO schema_migrations (version) VALUES ('20140903051632');

INSERT INTO schema_migrations (version) VALUES ('20140916053432');

INSERT INTO schema_migrations (version) VALUES ('20140916054734');

INSERT INTO schema_migrations (version) VALUES ('20140916115104');

INSERT INTO schema_migrations (version) VALUES ('20140916120200');

INSERT INTO schema_migrations (version) VALUES ('20140916120940');

INSERT INTO schema_migrations (version) VALUES ('20140916175215');

INSERT INTO schema_migrations (version) VALUES ('20140916175903');

INSERT INTO schema_migrations (version) VALUES ('20140917060427');

INSERT INTO schema_migrations (version) VALUES ('20140917075114');

INSERT INTO schema_migrations (version) VALUES ('20140917103212');

INSERT INTO schema_migrations (version) VALUES ('20140919143254');

INSERT INTO schema_migrations (version) VALUES ('20140919143255');

INSERT INTO schema_migrations (version) VALUES ('20140920011848');

INSERT INTO schema_migrations (version) VALUES ('20140920051513');

INSERT INTO schema_migrations (version) VALUES ('20140920051926');

INSERT INTO schema_migrations (version) VALUES ('20140920053013');

INSERT INTO schema_migrations (version) VALUES ('20141003052107');

INSERT INTO schema_migrations (version) VALUES ('20141003052550');

INSERT INTO schema_migrations (version) VALUES ('20141003054326');

INSERT INTO schema_migrations (version) VALUES ('20141003061557');

INSERT INTO schema_migrations (version) VALUES ('20141003093851');

INSERT INTO schema_migrations (version) VALUES ('20141003094404');

INSERT INTO schema_migrations (version) VALUES ('20141003113529');

INSERT INTO schema_migrations (version) VALUES ('20141004044536');

INSERT INTO schema_migrations (version) VALUES ('20141004044828');

INSERT INTO schema_migrations (version) VALUES ('20141004051817');

INSERT INTO schema_migrations (version) VALUES ('20141004052023');

INSERT INTO schema_migrations (version) VALUES ('20141004061839');

INSERT INTO schema_migrations (version) VALUES ('20141004105505');

INSERT INTO schema_migrations (version) VALUES ('20141004110936');

INSERT INTO schema_migrations (version) VALUES ('20141004111456');

INSERT INTO schema_migrations (version) VALUES ('20141004111646');

INSERT INTO schema_migrations (version) VALUES ('20141004113042');

INSERT INTO schema_migrations (version) VALUES ('20141004113736');

INSERT INTO schema_migrations (version) VALUES ('20141004155919');

INSERT INTO schema_migrations (version) VALUES ('20141006075548');

