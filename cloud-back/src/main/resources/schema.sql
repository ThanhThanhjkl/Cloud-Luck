-- ============================================
-- Cloud-Luck Database Schema
-- MySQL / InnoDB
-- ============================================

-- 1. Account table
CREATE TABLE IF NOT EXISTS `account` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) DEFAULT NULL,
    `password` VARCHAR(255) DEFAULT NULL,
    `email` VARCHAR(255) DEFAULT NULL,
    `role` VARCHAR(255) DEFAULT NULL,
    `avatar` LONGTEXT DEFAULT NULL,
    `url` VARCHAR(255) DEFAULT NULL,
    `about` LONGTEXT DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_account_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Address table
CREATE TABLE IF NOT EXISTS `address` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) DEFAULT NULL,
    `post_code` VARCHAR(255) DEFAULT NULL,
    `prefectures` VARCHAR(255) DEFAULT NULL,
    `district` VARCHAR(255) DEFAULT NULL,
    `street` VARCHAR(255) DEFAULT NULL,
    `phone` VARCHAR(255) DEFAULT NULL,
    `account_id` INT DEFAULT NULL,
    `default_select` VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Comments table
CREATE TABLE IF NOT EXISTS `comments` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `contents` VARCHAR(255) DEFAULT NULL,
    `account_id` INT DEFAULT NULL,
    `product_id` INT DEFAULT NULL,
    `date` VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Rating table
CREATE TABLE IF NOT EXISTS `rating` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `product_id` INT DEFAULT NULL,
    `account_id` INT DEFAULT NULL,
    `contents` VARCHAR(255) DEFAULT NULL,
    `image` LONGTEXT DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Suport table
CREATE TABLE IF NOT EXISTS `suport` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `suport_content` VARCHAR(255) DEFAULT NULL,
    `account_id` INT DEFAULT NULL,
    `product_id` INT DEFAULT NULL,
    `date` VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Products table
CREATE TABLE IF NOT EXISTS `products` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) DEFAULT NULL,
    `descriptions` LONGTEXT DEFAULT NULL,
    `date` DATE DEFAULT NULL,
    `cost` INT DEFAULT 0,
    `sale-cost` INT DEFAULT 0,
    `sold` INT DEFAULT 0,
    `title` VARCHAR(255) DEFAULT NULL,
    `images` LONGTEXT DEFAULT NULL,
    `account-id` INT DEFAULT NULL,
    `main-image` LONGTEXT DEFAULT NULL,
    `methods` VARCHAR(255) DEFAULT NULL,
    `video-url` VARCHAR(500) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Funded table
CREATE TABLE IF NOT EXISTS `funded` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `return_id` INT DEFAULT NULL,
    `account_id` INT DEFAULT NULL,
    `owner_id` INT DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Returns table
CREATE TABLE IF NOT EXISTS `returns` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) DEFAULT NULL,
    `descriptions` LONGTEXT DEFAULT NULL,
    `cost` INT DEFAULT 0,
    `title` VARCHAR(255) DEFAULT NULL,
    `product-id` INT DEFAULT NULL,
    `image` LONGTEXT DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

