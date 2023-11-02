-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: 172.21.0.2    Database: rec
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback_statuses`
--

DROP TABLE IF EXISTS `feedback_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback_statuses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback_statuses`
--

LOCK TABLES `feedback_statuses` WRITE;
/*!40000 ALTER TABLE `feedback_statuses` DISABLE KEYS */;
INSERT INTO `feedback_statuses` VALUES (1,'Received','2023-09-16 19:59:45','2023-09-16 19:59:45'),(2,'In Progress','2023-09-16 19:59:45','2023-09-16 19:59:45'),(3,'Pending','2023-09-16 19:59:45','2023-09-16 19:59:45'),(4,'Resolved','2023-09-16 19:59:45','2023-09-16 19:59:45'),(5,'Rejected','2023-09-16 19:59:46','2023-09-16 19:59:46'),(6,'Closed','2023-09-16 19:59:46','2023-09-16 19:59:46');
/*!40000 ALTER TABLE `feedback_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `feedback_status_id` bigint unsigned NOT NULL,
  `report_type_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `feedbacks_feedback_status_id_index` (`feedback_status_id`),
  KEY `feedbacks_report_type_id_index` (`report_type_id`),
  KEY `feedbacks_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genders`
--

DROP TABLE IF EXISTS `genders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `genders_deleted_at_index` (`deleted_at`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genders`
--

LOCK TABLES `genders` WRITE;
/*!40000 ALTER TABLE `genders` DISABLE KEYS */;
INSERT INTO `genders` VALUES (1,'Male','2023-09-16 19:59:46','2023-09-16 19:59:46',NULL),(2,'Female','2023-09-16 19:59:46','2023-09-16 19:59:46',NULL),(3,'Other','2023-09-16 19:59:46','2023-09-16 19:59:46',NULL);
/*!40000 ALTER TABLE `genders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `global_statuses`
--

DROP TABLE IF EXISTS `global_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `global_statuses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `global_statuses`
--

LOCK TABLES `global_statuses` WRITE;
/*!40000 ALTER TABLE `global_statuses` DISABLE KEYS */;
INSERT INTO `global_statuses` VALUES (1,'Active','2023-09-16 19:59:46','2023-09-16 19:59:46'),(2,'Inactive','2023-09-16 19:59:46','2023-09-16 19:59:46');
/*!40000 ALTER TABLE `global_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2023_09_11_070423_create_roles_table',1),(6,'2023_09_11_074236_create_permissions_table',1),(7,'2023_09_11_074245_create_permission_role_table',1),(8,'2023_09_11_080656_create_real_estates_table',1),(9,'2023_09_11_125748_create_user_role_table',1),(10,'2023_09_12_100957_add_action_to_permissions_table',2),(11,'2023_09_12_130032_add_module_name_permissions_table',3),(12,'2023_09_12_144227_add_real_estates_permission',3),(13,'2023_09_13_034147_update_column_to_real_estates_table',3),(14,'2023_09_13_070113_add_roles_permission',3),(15,'2023_09_13_125816_add_column_deleted_at_to_real_estates_table',3),(16,'2023_09_13_141251_create_user_statuses_table',3),(17,'2023_09_13_143908_rename_column_name_to_users_table',3),(18,'2023_09_13_144019_add_columns_to_users_table',3),(19,'2023_09_13_144311_create_genders_table',3),(20,'2023_09_14_134009_create_task_statuses_table',4),(21,'2023_09_14_140818_add_users_permission',4),(22,'2023_09_14_150851_add_user_statuses_permissions',4),(23,'2023_09_15_103043_create_feedback_statuses_table',4),(24,'2023_09_15_103113_create_report_types_table',4),(25,'2023_09_15_104953_create_tasks_table',4),(26,'2023_09_15_105008_add_tasks_permission_table',4),(27,'2023_09_15_131128_create_feedbacks_table',4),(28,'2023_09_15_133034_create_global_statuses_table',4);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_role`
--

DROP TABLE IF EXISTS `permission_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission_role` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `permission_role_permission_id_index` (`permission_id`),
  KEY `permission_role_role_id_index` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_role`
--

LOCK TABLES `permission_role` WRITE;
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
INSERT INTO `permission_role` VALUES (1,3,2,NULL,NULL),(2,4,3,NULL,NULL),(3,5,2,NULL,NULL),(4,6,3,NULL,NULL),(5,9,2,NULL,NULL),(6,10,3,NULL,NULL),(7,1,2,NULL,NULL),(8,2,3,NULL,NULL);
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `module_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'real-estate-saler-manage',NULL,'','2023-09-12 10:41:28','2023-09-12 10:41:28'),(2,'real-estate-user-manage',NULL,'','2023-09-12 10:41:28','2023-09-12 10:41:28'),(3,'List Real Estates','admin.real_estates.index','Real Estates',NULL,NULL),(4,'Create Real Estate','admin.real_estates.create','Real Estates',NULL,NULL),(5,'Create Real Estate','admin.real_estates.edit','Real Estates',NULL,NULL),(6,'Create Real Estate','admin.real_estates.destroy','Real Estates',NULL,NULL),(7,'List Roles','admin.roles.index','Roles',NULL,NULL),(8,'Create Role','admin.roles.create','Roles',NULL,NULL),(9,'Update Role','admin.roles.edit','Roles',NULL,NULL),(10,'Delete Role','admin.roles.destroy','Roles',NULL,NULL),(11,'List Users','admin.users.index','Users',NULL,NULL),(12,'Create User','admin.users.create','Users',NULL,NULL),(13,'Create User','admin.users.edit','Users',NULL,NULL),(14,'Create User','admin.users.destroy','Users',NULL,NULL),(15,'List User Statuses','admin.user_statuses.index','User Statuses',NULL,NULL),(16,'Create User Statuses','admin.user_statuses.create','User Statuses',NULL,NULL),(17,'Update User Statuses','admin.user_statuses.edit','User Statuses',NULL,NULL),(18,'Delete User Statuses','admin.user_statuses.destroy','User Statuses',NULL,NULL),(19,'List Tasks','admin.tasks.index','Tasks',NULL,NULL),(20,'Create Task','admin.tasks.create','Tasks',NULL,NULL),(21,'Update Task','admin.tasks.edit','Tasks',NULL,NULL),(22,'Delete Task','admin.tasks.destroy','Tasks',NULL,NULL);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'Modules\\User\\Entities\\User',2,'authToken','08c6a38657c70b99c9834b06553353b7a46622c07d22a758eb1a4a2b2059801c','[\"*\"]',NULL,NULL,'2023-09-12 02:50:09','2023-09-12 02:50:09'),(2,'Modules\\User\\Entities\\User',2,'authToken','7fffc089fc085e9aace2aaf8fc61c4767ff89d00e03a2df598e215cc6fdf67fb','[\"*\"]',NULL,NULL,'2023-09-12 02:50:41','2023-09-12 02:50:41'),(3,'Modules\\User\\Entities\\User',2,'authToken','6a4c473c7081730753cb1040b48cc2e47ddd0ce1c443a2a99c33f2132494933f','[\"*\"]',NULL,NULL,'2023-09-12 02:55:12','2023-09-12 02:55:12'),(4,'Modules\\User\\Entities\\User',2,'authToken','422d80982ef68eb4c60a8b4db94499f1df3fd41128cafa5e966c90a3c6b24232','[\"*\"]',NULL,NULL,'2023-09-12 02:57:31','2023-09-12 02:57:31'),(5,'Modules\\User\\Entities\\User',2,'authToken','250b41a155e3b8add271e934c6431f96a535482c96580991d6068bc630c798da','[\"*\"]',NULL,NULL,'2023-09-12 02:57:33','2023-09-12 02:57:33'),(6,'Modules\\User\\Entities\\User',2,'authToken','e8d82f87e8f50e1fefdd524bfbed90e54aaaec7aa4ea618ef69d5d3845887c7d','[\"*\"]',NULL,NULL,'2023-09-12 02:57:35','2023-09-12 02:57:35'),(7,'Modules\\User\\Entities\\User',2,'authToken','c73937b8d77c287ad690fd5435160f9cdba3862597d792bdbbe58d0c1e6d878c','[\"*\"]',NULL,NULL,'2023-09-12 02:57:36','2023-09-12 02:57:36'),(8,'Modules\\User\\Entities\\User',2,'authToken','859e2bae8b4d65d7c8b9d8f29c0977ad430bab443d8d8ea8132c59cfe5eeabe0','[\"*\"]','2023-09-12 02:59:26',NULL,'2023-09-12 02:57:58','2023-09-12 02:59:26'),(9,'Modules\\User\\Entities\\User',2,'authToken','2bb82de9e197d2b99ee436812681179c443d6b8115b216de0c67f9f7b4a0c5c3','[\"*\"]',NULL,NULL,'2023-09-12 02:59:49','2023-09-12 02:59:49'),(10,'Modules\\User\\Entities\\User',2,'authToken','2f4bda69413a57ce4a8e6dec439e1ddad68198ac8670d35e6c4b5b68c328b937','[\"*\"]','2023-09-12 03:00:07',NULL,'2023-09-12 03:00:03','2023-09-12 03:00:07'),(11,'Modules\\User\\Entities\\User',2,'authToken','bbc911eb2161f3a9c52e114563c7868e983aba4564cb3d774db54290110d57d9','[\"*\"]',NULL,NULL,'2023-09-12 03:00:30','2023-09-12 03:00:30'),(13,'Modules\\User\\Entities\\User',2,'authToken','465aba09c4a040b92c99d737125a88d983766ff99ae2cd702d8a0ea90a7772e8','[\"*\"]',NULL,NULL,'2023-09-12 03:01:18','2023-09-12 03:01:18'),(15,'Modules\\User\\Entities\\User',2,'authToken','363f83cf78fd808e3ee51fd31875d0e6fb769276ff2b5fc3a40459eee6b2f3dc','[\"*\"]','2023-09-12 03:01:37',NULL,'2023-09-12 03:01:32','2023-09-12 03:01:37'),(16,'Modules\\User\\Entities\\User',2,'authToken','98c8708bf24f43abc78dc6eece3d102da249ca849b918eb29654e84e0f3c6273','[\"*\"]','2023-09-12 05:28:38',NULL,'2023-09-12 05:27:36','2023-09-12 05:28:38'),(56,'Modules\\User\\Entities\\User',1,'authToken','32d190e26bcc0d1488f1c65fdaf974bea1cafb09313b100461761e1a91ae39c4','[\"*\"]',NULL,NULL,'2023-09-16 22:05:56','2023-09-16 22:05:56'),(64,'Modules\\User\\Entities\\User',22,'authToken','8cc169d395bdf1c14f87b51f9ea1cd5f44a7188008106f5152244cd70e55e711','[\"*\"]',NULL,NULL,'2023-09-16 22:13:07','2023-09-16 22:13:07'),(65,'Modules\\User\\Entities\\User',23,'authToken','c4d4d5db13c017e00212eb67e8895ab40ef605ae24bdff5373bc9cc9677d030e','[\"*\"]',NULL,NULL,'2023-09-16 22:13:18','2023-09-16 22:13:18'),(73,'Modules\\User\\Entities\\User',1,'authToken','f681e3bda815f623aa80a6fdb90d9ab937958783314dadf65c2e6284bc1deb47','[\"*\"]','2023-09-17 13:28:35',NULL,'2023-09-17 12:21:41','2023-09-17 13:28:35'),(74,'Modules\\User\\Entities\\User',1,'authToken','1e49a795710e10e95362eb0d90d462fb27e0ddc48374287ad00ab4566e260fcf','[\"*\"]','2023-09-17 13:31:42',NULL,'2023-09-17 13:28:40','2023-09-17 13:31:42'),(75,'Modules\\User\\Entities\\User',1,'authToken','534f1b8fe6ac058efc43166d195ac0aaf158f7874c39bcfab173fa544ffb9148','[\"*\"]',NULL,NULL,'2023-09-17 13:31:50','2023-09-17 13:31:50');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `real_estates`
--

DROP TABLE IF EXISTS `real_estates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `real_estates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_ref` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price_display` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `domain` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publish_at` timestamp NULL DEFAULT NULL,
  `publish_display` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `real_estates_deleted_at_index` (`deleted_at`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `real_estates`
--

LOCK TABLES `real_estates` WRITE;
/*!40000 ALTER TABLE `real_estates` DISABLE KEYS */;
INSERT INTO `real_estates` VALUES (1,'New Real Estate 2023 edit',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'39-41 Che Lan Vien, TP, Buon Ma Thuot edit','2023-09-12 10:36:40','2023-09-13 03:33:17',NULL);
/*!40000 ALTER TABLE `real_estates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_types`
--

DROP TABLE IF EXISTS `report_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `report_types_status_id_index` (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_types`
--

LOCK TABLES `report_types` WRITE;
/*!40000 ALTER TABLE `report_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `report_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','2023-09-12 02:48:52','2023-09-12 02:48:52'),(2,'saler','2023-09-12 02:48:52','2023-09-12 02:48:52'),(3,'user','2023-09-12 02:48:52','2023-09-12 02:48:52');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_statuses`
--

DROP TABLE IF EXISTS `task_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_statuses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `task_statuses_deleted_at_index` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_statuses`
--

LOCK TABLES `task_statuses` WRITE;
/*!40000 ALTER TABLE `task_statuses` DISABLE KEYS */;
/*!40000 ALTER TABLE `task_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `task_status_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tasks_user_id_index` (`user_id`),
  KEY `tasks_task_status_id_index` (`task_status_id`),
  KEY `tasks_deleted_at_index` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_role_user_id_index` (`user_id`),
  KEY `user_role_role_id_index` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,1,1,NULL,NULL);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_statuses`
--

DROP TABLE IF EXISTS `user_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_statuses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_statuses_deleted_at_index` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_statuses`
--

LOCK TABLES `user_statuses` WRITE;
/*!40000 ALTER TABLE `user_statuses` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_card` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthday` date DEFAULT NULL,
  `gender_id` bigint unsigned DEFAULT NULL,
  `id_1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_status_id` bigint unsigned NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_gender_id_index` (`gender_id`),
  KEY `users_user_status_id_index` (`user_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Administrator REC','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'admin@rec.com','2023-09-12 02:48:51','$2y$10$9ttZNL9GMLUG/XTUX2HrrudQXXl.D2wQOZ1lbcZWZDgx5/Nom2P16',NULL,'2023-09-12 02:48:51','2023-09-12 02:48:51'),(2,'Saler REC','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'saler@rec.com','2023-09-12 02:48:51','$2y$10$DYMLYOUa5oKIjvyeWabbwufNl/5KXIYtVeQUiuDgXTNhu1nsdeUq.',NULL,'2023-09-12 02:48:51','2023-09-12 02:48:51'),(3,'Simple User REC','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'user@rec.com','2023-09-12 02:48:52','$2y$10$PN31kDqOuTF4A2jh.S.QEen8LEe72xkSGvnWqvDmRwYIYYGQCYFGm',NULL,'2023-09-12 02:48:52','2023-09-12 02:48:52'),(18,'Joaquin Bailey Jr.','Davonte Heathcote DDS','0288101635',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'greenfelder.brook@example.net',NULL,'$2y$04$DK06ORoEuMgYwg.zlNJ1ZeuXwUBfoNo6hAipsBEMUpBk0.AHznitG',NULL,'2023-09-16 22:10:09','2023-09-16 22:10:09'),(19,'Ressie McDermott','Leland Quigley','9912161385',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'collins.frida@example.org',NULL,'$2y$04$tnvdkweOIWweMTPWTMSODus1L.MWW2d9NdKlK3goS6cWJtA14kim.',NULL,'2023-09-16 22:10:09','2023-09-16 22:10:09'),(20,'Mr. Jalon Murphy II','Kenna Harvey','7638561742',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'trystan60@example.net',NULL,'password',NULL,'2023-09-16 22:11:58','2023-09-16 22:11:58'),(21,'Providenci Lakin','Mauricio Schoen IV','5937553041',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'ismael.hirthe@example.org',NULL,'password',NULL,'2023-09-16 22:11:59','2023-09-16 22:11:59'),(22,'Karelle Zboncak','Bettye Becker','1155946323',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'stiedemann.davion@example.net',NULL,'$2y$04$gQro7fsRWI7ZHM/AqLiRD.gShW53VwXRIL5xWcd9eujoTCBBvvghS',NULL,'2023-09-16 22:13:07','2023-09-16 22:13:07'),(23,'Virgil Bruen','Dr. Richard Pfannerstill','6717260518',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'wiegand.abdullah@example.net',NULL,'$2y$04$KYlxTerSjLwNgNr/FORPzuRC8f17uqlBfdQsL5I/R1FD4OoEZeJ2m',NULL,'2023-09-16 22:13:18','2023-09-16 22:13:18'),(24,'Nia Kovacek','Emerson Gleichner','6999607869',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'orn.meghan@example.org',NULL,'$2y$04$bv6vnT42PmBKgsh0Yz56fugZBBMeTSL6EkPwXgHVO3QtdhyeRr0yu',NULL,'2023-09-16 22:13:18','2023-09-16 22:13:18'),(25,'Mr. Ervin Becker III','Dr. Janie Keeling','2692898059',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'fwest@example.com',NULL,'$2y$04$0JvJoUmxkiegwKr2JKGi6ufNtQ38VYoiP441mA7tBnhkMm9sMQedq',NULL,'2023-09-16 22:22:32','2023-09-16 22:22:32'),(26,'Belle Crona','Drake Schmeler','3626565486',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'jovan.mohr@example.net',NULL,'$2y$04$x46hRHUNJDu/K5BLymVxZO1tzPTa6YEm8ePeBNvD.aBUDF6meUzh2',NULL,'2023-09-16 22:22:32','2023-09-16 22:22:32'),(27,'Tanya Bayer','Garett Stokes','7118482567',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'zcormier@example.com',NULL,'$2y$04$s61NOPn6o/TORqVADyboLegeLtlKWfKm./7KgraphCOJ6VYQCKn3a',NULL,'2023-09-16 22:22:32','2023-09-16 22:22:32'),(28,'Mr. Buford Witting','Ricardo Eichmann','3773916319',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'rubye.mohr@example.org',NULL,'$2y$04$Rwdeg7i9ppH81/fpJt599OMIfVWzV9dVxKatOG1Rdt0ChtG8Uis7W',NULL,'2023-09-16 22:23:07','2023-09-16 22:23:07'),(29,'Dr. Brook Turner','Arely Lubowitz','7589785617',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'tblick@example.org',NULL,'$2y$04$uc3ZGzg8.TRXS7o2qy7p0uzeVtj1P1TOWRl.jsOmuGOPb47KT/Yjq',NULL,'2023-09-16 22:23:07','2023-09-16 22:23:07'),(30,'Sheridan Smith','Brandi Borer','0725056446',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'cletus.lockman@example.net',NULL,'$2y$04$Z5YJ2jPpO8S46aRTU9MvLe29p5J3j1xRwerdRI5T3afBZiYM9FQjO',NULL,'2023-09-16 22:23:07','2023-09-16 22:23:07'),(31,'Malachi Bartoletti IV','Marcos Kemmer','5568234117',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'volkman.makayla@example.net',NULL,'$2y$04$RMqxucpLBJLgjCRjzML7sOHHR//j9J/MyVLyl0S7mz0tJ84qDau1K',NULL,'2023-09-16 22:25:17','2023-09-16 22:25:17'),(32,'Wilmer Ratke DDS','Mr. Mallory Gorczany','8737921809',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'christine.lynch@example.com',NULL,'$2y$04$RlSVNtws9ixYL.BqdeP4/evn5GSrp7dStMWAYQFVykhAdphXBhzVK',NULL,'2023-09-16 22:25:17','2023-09-16 22:25:17'),(33,'Alice O\'Keefe','Garth Koch','9977266133',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'fadel.darrion@example.org',NULL,'$2y$04$0KipNaGW5cR3Oo86OhJkoOd0NLobqkD/ZS44sNugVSICf6QytBxT6',NULL,'2023-09-16 22:25:17','2023-09-16 22:25:17'),(34,'Jose Wyman','Barrett Hermann','1461317854',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'dach.yasmine@example.org',NULL,'$2y$04$Gy0w76FoVsYsGsdZR.8DOOB//rJK1h.16QLBM1WGejrSK/usUhfaC',NULL,'2023-09-19 12:31:48','2023-09-19 12:31:48'),(35,'Dr. Roosevelt Harber','Modesta White','4511902065',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'fhammes@example.com',NULL,'$2y$04$772usCOf4xdOZjJrOA1HCueSlyDJWrVrwj1PZe/Vc68/PNKD7A5aW',NULL,'2023-09-19 12:31:48','2023-09-19 12:31:48'),(36,'Darlene Kuhn','Jane Smitham','4204187193',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'yasmin.rolfson@example.com',NULL,'$2y$04$iuQEN5Hqy3FCfQVaI4e9s.z6uIrkGiUXZw0XrMLtyYaielDajL3dq',NULL,'2023-09-19 12:31:48','2023-09-19 12:31:48'),(37,'Ms. Estell Toy','Eleonore Swaniawski','8611114981',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'eulah36@example.com',NULL,'$2y$04$O3m23HkDth81lLUVbZmf3.vTPMpqC7vxfomT6MksXNocErf3nhonq',NULL,'2023-09-19 12:32:00','2023-09-19 12:32:00'),(38,'Mr. Bobby Hammes','Javier Toy','4405269776',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'luciano28@example.org',NULL,'$2y$04$090kPiEZeBghpNZlumIatex4hoAyjdNj4GSROOBD74vFtKXHES7i6',NULL,'2023-09-19 12:32:00','2023-09-19 12:32:00'),(39,'Linwood Ritchie','Keara Windler DDS','7575255130',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'michele.turner@example.com',NULL,'$2y$04$R0Yq0DDLg0DDMcSWikBOme0D5qW8RJgLWJqr/rXTc9jRc3ZwAc0PO',NULL,'2023-09-19 12:32:00','2023-09-19 12:32:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-17 11:58:53
