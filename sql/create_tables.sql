CREATE TABLE IF NOT EXISTS `intents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `intent_name` varchar(255) NOT NULL,
  `question` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `utters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utter_name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `responseType` varchar(255) NOT NULL,
  `bubbles` text NOT NULL,
  `response` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;